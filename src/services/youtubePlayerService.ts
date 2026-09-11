/**
 * YouTube IFrame Player Service
 * Direct bidirectional bridge between React and YouTube IFrame Player API
 * Guarantees real seeking, real time-sync, and uninterrupted playback.
 */

export type PlayerStateListener = (isPlaying: boolean) => void;
export type TimeUpdateListener = (currentTime: number, realDuration: number) => void;
export type TrackEndListener = () => void;
export type ErrorListener = (errorCode: number) => void;

interface PlayerCallbacks {
  onStateChange?: PlayerStateListener;
  onTimeUpdate?: TimeUpdateListener;
  onEnded?: TrackEndListener;
  onError?: ErrorListener;
}

class YouTubePlayerService {
  private player: any = null;
  private isReady = false;
  private isSeeking = false;
  private lastSeekTime = 0;
  private pollingInterval: NodeJS.Timeout | null = null;
  private callbacks: PlayerCallbacks = {};

  private currentVideoId: string = '';
  private pendingVideoId: string | null = null;
  private pendingStartSeconds = 0;
  private pendingPlay = false;
  private pendingVolume = 80;
  private pendingMute = false;

  /**
   * Initializes the YouTube Iframe Player in the specified container element.
   */
  public init(containerId: string, initialVideoId: string, callbacks: PlayerCallbacks = {}): void {
    this.callbacks = callbacks;
    this.currentVideoId = initialVideoId;

    const setupPlayerInstance = () => {
      // If already initialized on this element, return
      if (this.player) {
        return;
      }

      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`[YouTubePlayerService] Container element #${containerId} not found in DOM yet.`);
        return;
      }

      try {
        this.player = new window.YT.Player(containerId, {
          videoId: initialVideoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            enablejsapi: 1,
            fs: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => this.handlePlayerReady(event),
            onStateChange: (event: any) => this.handleStateChange(event),
            onError: (event: any) => this.handleError(event)
          }
        });
      } catch (err) {
        console.error('[YouTubePlayerService] Error initializing YT.Player:', err);
      }
    };

    // Check if YouTube API is already loaded in window
    if (window.YT && window.YT.Player) {
      setupPlayerInstance();
    } else {
      // Check if the script tag exists, if not inject it
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }

      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === 'function') {
          prevOnReady();
        }
        setupPlayerInstance();
      };
    }
  }

  private handlePlayerReady(event: any): void {
    this.isReady = true;
    this.startPolling();

    // Apply pending volume/mute
    try {
      this.player.setVolume(this.pendingVolume);
      if (this.pendingMute) {
        this.player.mute();
      } else {
        this.player.unMute();
      }
    } catch {
      // ignore
    }

    // Process pending actions
    if (this.pendingVideoId && this.pendingVideoId !== this.currentVideoId) {
      this.loadVideo(this.pendingVideoId, this.pendingPlay, this.pendingStartSeconds);
      this.pendingVideoId = null;
    } else if (this.pendingPlay) {
      this.play();
    }
  }

  private handleStateChange(event: any): void {
    const state = event.data;
    const YTState = window.YT?.PlayerState;

    if (!YTState) return;

    if (state === YTState.PLAYING) {
      this.callbacks.onStateChange?.(true);
      // Capture actual video duration
      const realDur = this.player.getDuration();
      if (realDur && realDur > 0) {
        this.callbacks.onTimeUpdate?.(this.player.getCurrentTime() || 0, realDur);
      }
    } else if (state === YTState.PAUSED) {
      this.callbacks.onStateChange?.(false);
    } else if (state === YTState.ENDED) {
      this.callbacks.onStateChange?.(false);
      this.callbacks.onEnded?.();
    }
  }

  private handleError(event: any): void {
    const errorCode = event.data;
    console.warn(`[YouTubePlayerService] YouTube Player returned error code: ${errorCode}`);
    this.callbacks.onError?.(errorCode);
  }

  /**
   * Continuous high-frequency polling (every 250ms) to sync currentTime
   * and realDuration without jitter or race conditions.
   */
  private startPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.pollingInterval = setInterval(() => {
      // 1. If user is currently dragging/scrubbing, do not overwrite progress
      if (this.isSeeking) {
        return;
      }

      // 2. If a seek was executed in the last 900ms, suppress time updates
      // so YouTube's internal buffering does not snap back to the pre-seek timestamp
      if (Date.now() - this.lastSeekTime < 900) {
        return;
      }

      if (!this.player || !this.isReady) {
        return;
      }

      try {
        if (typeof this.player.getCurrentTime === 'function') {
          const cur = this.player.getCurrentTime();
          const dur = this.player.getDuration();
          if (typeof cur === 'number' && !isNaN(cur)) {
            this.callbacks.onTimeUpdate?.(cur, dur && dur > 0 ? dur : 0);
          }
        }
      } catch {
        // ignore cross-frame errors during navigation
      }
    }, 250);
  }

  /**
   * Informs the service whether the user is actively dragging the slider.
   */
  public setSeeking(seeking: boolean): void {
    this.isSeeking = seeking;
  }

  /**
   * Seeks YouTube playback to the target seconds immediately.
   * Parameter allowSeekAhead=true requests non-buffered segments from YouTube servers.
   */
  public seekTo(seconds: number, resumePlay = true): void {
    this.isSeeking = false;
    this.lastSeekTime = Date.now();

    // Immediately trigger callback so UI state reflects target position synchronously
    if (this.player && this.isReady && typeof this.player.getDuration === 'function') {
      const dur = this.player.getDuration();
      this.callbacks.onTimeUpdate?.(seconds, dur || 0);
    }

    if (this.player && this.isReady && typeof this.player.seekTo === 'function') {
      try {
        this.player.seekTo(seconds, true);
        if (resumePlay) {
          const state = this.player.getPlayerState?.();
          if (state !== window.YT?.PlayerState?.PLAYING) {
            this.player.playVideo();
          }
        }
      } catch (err) {
        console.error('[YouTubePlayerService] Error calling player.seekTo:', err);
      }
    }
  }

  public play(): void {
    this.pendingPlay = true;
    if (this.player && this.isReady && typeof this.player.playVideo === 'function') {
      try {
        this.player.playVideo();
      } catch (err) {
        console.error('[YouTubePlayerService] Error calling player.playVideo:', err);
      }
    }
  }

  public pause(): void {
    this.pendingPlay = false;
    if (this.player && this.isReady && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
      } catch (err) {
        console.error('[YouTubePlayerService] Error calling player.pauseVideo:', err);
      }
    }
  }

  public loadVideo(videoId: string, autoplay = true, startSeconds = 0): void {
    this.currentVideoId = videoId;
    this.pendingPlay = autoplay;
    this.pendingStartSeconds = startSeconds;

    if (this.player && this.isReady && typeof this.player.loadVideoById === 'function') {
      try {
        if (autoplay) {
          this.player.loadVideoById({
            videoId,
            startSeconds: startSeconds || 0
          });
        } else {
          this.player.cueVideoById({
            videoId,
            startSeconds: startSeconds || 0
          });
        }
      } catch (err) {
        console.error('[YouTubePlayerService] Error loading video:', err);
      }
    } else {
      this.pendingVideoId = videoId;
    }
  }

  public setVolume(volume: number): void {
    this.pendingVolume = volume;
    if (this.player && this.isReady && typeof this.player.setVolume === 'function') {
      try {
        this.player.setVolume(volume);
      } catch {
        // ignore
      }
    }
  }

  public setMuted(muted: boolean): void {
    this.pendingMute = muted;
    if (this.player && this.isReady) {
      try {
        if (muted) {
          this.player.mute();
        } else {
          this.player.unMute();
        }
      } catch {
        // ignore
      }
    }
  }

  public getCurrentTime(): number {
    if (this.player && this.isReady && typeof this.player.getCurrentTime === 'function') {
      try {
        return this.player.getCurrentTime() || 0;
      } catch {
        return 0;
      }
    }
    return 0;
  }

  public getDuration(): number {
    if (this.player && this.isReady && typeof this.player.getDuration === 'function') {
      try {
        return this.player.getDuration() || 0;
      } catch {
        return 0;
      }
    }
    return 0;
  }

  public destroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    if (this.player && typeof this.player.destroy === 'function') {
      try {
        this.player.destroy();
      } catch {
        // ignore
      }
      this.player = null;
    }
    this.isReady = false;
  }
}

// Export singleton instance
export const youtubePlayerService = new YouTubePlayerService();
