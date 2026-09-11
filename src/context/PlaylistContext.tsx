import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Track } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { 
  YOUTUBE_PLAYLIST_ID, 
  YOUTUBE_PLAYLIST_URL, 
  YOUTUBE_PLAYLIST_TRACKS, 
  loadPlaylistTracks, 
  purgeOldStorage 
} from '../services/youtubePlaylistService';
import { youtubePlayerService } from '../services/youtubePlayerService';

interface PlaylistContextType {
  tracks: Track[];
  currentTrackIdx: number;
  currentTrack: Track;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  favorites: string[];
  showMiniVideo: boolean;
  isQueueOpen: boolean;
  isLiveFromApi: boolean;
  playlistId: string;
  playlistUrl: string;
  initPlayer: (containerId: string) => void;
  playTrack: (idx: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (seconds: number) => void;
  setSeeking: (seeking: boolean) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleFavorite: (trackId: string) => void;
  setShowMiniVideo: (show: boolean | ((prev: boolean) => boolean)) => void;
  setIsQueueOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge any stale legacy data on boot
  useEffect(() => {
    purgeOldStorage();
  }, []);

  const [tracks, setTracks] = useState<Track[]>(YOUTUBE_PLAYLIST_TRACKS);
  const [isLiveFromApi, setIsLiveFromApi] = useState<boolean>(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [actualDuration, setActualDuration] = useState<number | null>(null);
  const [volume, setVolumeState] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [showMiniVideo, setShowMiniVideo] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);

  // State refs to prevent stale closures in event listeners
  const tracksRef = useRef(tracks);
  useEffect(() => { tracksRef.current = tracks; }, [tracks]);

  const currentTrackIdxRef = useRef(currentTrackIdx);
  useEffect(() => { currentTrackIdxRef.current = currentTrackIdx; }, [currentTrackIdx]);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const isShuffleRef = useRef(isShuffle);
  useEffect(() => { isShuffleRef.current = isShuffle; }, [isShuffle]);

  const isRepeatRef = useRef(isRepeat);
  useEffect(() => { isRepeatRef.current = isRepeat; }, [isRepeat]);

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('playlist_favs_v2');
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        const validIds = new Set(YOUTUBE_PLAYLIST_TRACKS.map(t => t.id));
        return parsed.filter(id => validIds.has(id));
      }
      return [YOUTUBE_PLAYLIST_TRACKS[0]?.id, YOUTUBE_PLAYLIST_TRACKS[5]?.id].filter(Boolean);
    } catch {
      return [YOUTUBE_PLAYLIST_TRACKS[0]?.id].filter(Boolean);
    }
  });

  // Attempt live API query if key configured
  useEffect(() => {
    let isMounted = true;
    loadPlaylistTracks().then((res) => {
      if (isMounted && res.tracks && res.tracks.length > 0) {
        setTracks(res.tracks);
        setIsLiveFromApi(res.isLiveFromApi);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentTrack: Track = tracks[currentTrackIdx] || tracks[0] || YOUTUBE_PLAYLIST_TRACKS[0];
  
  // Use real YouTube player duration when reported, fallback to track metadata duration
  const duration = actualDuration && actualDuration > 0 ? actualDuration : (currentTrack?.duration || 300);

  // When active track index changes, reset actualDuration and progress
  useEffect(() => {
    setActualDuration(null);
  }, [currentTrackIdx]);

  // Core Play/Next/Prev functions defined with useCallback
  const nextTrack = useCallback(() => {
    soundSynth.playTapeClick();
    const allTracks = tracksRef.current;
    if (allTracks.length === 0) return;

    let nextIdx = 0;
    if (isShuffleRef.current && allTracks.length > 1) {
      let rand = Math.floor(Math.random() * allTracks.length);
      while (rand === currentTrackIdxRef.current) {
        rand = Math.floor(Math.random() * allTracks.length);
      }
      nextIdx = rand;
    } else {
      nextIdx = (currentTrackIdxRef.current + 1) % allTracks.length;
    }

    setCurrentTrackIdx(nextIdx);
    setProgress(0);
    setIsPlaying(true);

    const nextTrackItem = allTracks[nextIdx];
    if (nextTrackItem) {
      youtubePlayerService.loadVideo(nextTrackItem.videoId, true, 0);
    }
  }, []);

  const prevTrack = useCallback(() => {
    soundSynth.playTapeClick();
    const allTracks = tracksRef.current;
    if (allTracks.length === 0) return;

    // If more than 3 seconds into the song, restart current track
    const curTime = youtubePlayerService.getCurrentTime();
    if (curTime > 3) {
      youtubePlayerService.seekTo(0, true);
      setProgress(0);
      return;
    }

    const prevIdx = (currentTrackIdxRef.current - 1 + allTracks.length) % allTracks.length;
    setCurrentTrackIdx(prevIdx);
    setProgress(0);
    setIsPlaying(true);

    const prevTrackItem = allTracks[prevIdx];
    if (prevTrackItem) {
      youtubePlayerService.loadVideo(prevTrackItem.videoId, true, 0);
    }
  }, []);

  const playTrack = useCallback((idx: number) => {
    soundSynth.playTapeClick();
    const allTracks = tracksRef.current;
    if (idx >= 0 && idx < allTracks.length) {
      setCurrentTrackIdx(idx);
      setProgress(0);
      setIsPlaying(true);
      const targetTrack = allTracks[idx];
      if (targetTrack) {
        youtubePlayerService.loadVideo(targetTrack.videoId, true, 0);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    soundSynth.playTapeClick();
    if (isPlayingRef.current) {
      setIsPlaying(false);
      youtubePlayerService.pause();
    } else {
      setIsPlaying(true);
      youtubePlayerService.play();
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setProgress(clamped);
    youtubePlayerService.seekTo(clamped, isPlayingRef.current);
  }, [duration]);

  const setSeeking = useCallback((seeking: boolean) => {
    youtubePlayerService.setSeeking(seeking);
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
    youtubePlayerService.setVolume(vol);
    if (vol > 0 && isMuted) {
      setIsMuted(false);
      youtubePlayerService.setMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      youtubePlayerService.setMuted(nextMuted);
      return nextMuted;
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const toggleFavorite = useCallback((trackId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId];
      try {
        localStorage.setItem('playlist_favs_v2', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Initialize the real YouTube Player on mount
  const initPlayer = useCallback((containerId: string) => {
    const initialTrack = tracksRef.current[currentTrackIdxRef.current] || YOUTUBE_PLAYLIST_TRACKS[0];
    youtubePlayerService.init(containerId, initialTrack.videoId, {
      onStateChange: (playing) => {
        setIsPlaying(playing);
      },
      onTimeUpdate: (currentTime, realDuration) => {
        setProgress(currentTime);
        if (realDuration && realDuration > 5) {
          setActualDuration(Math.round(realDuration));
        }
      },
      onEnded: () => {
        if (isRepeatRef.current) {
          youtubePlayerService.seekTo(0, true);
          youtubePlayerService.play();
        } else {
          nextTrack();
        }
      },
      onError: (errCode) => {
        console.warn(`[PlaylistContext] Playback error (${errCode}) on track ${currentTrackIdxRef.current}, moving to next track.`);
        nextTrack();
      }
    });
  }, [nextTrack]);

  return (
    <PlaylistContext.Provider
      value={{
        tracks,
        currentTrackIdx,
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        isMuted,
        isShuffle,
        isRepeat,
        favorites,
        showMiniVideo,
        isQueueOpen,
        isLiveFromApi,
        playlistId: YOUTUBE_PLAYLIST_ID,
        playlistUrl: YOUTUBE_PLAYLIST_URL,
        initPlayer,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        setSeeking,
        setVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        toggleFavorite,
        setShowMiniVideo,
        setIsQueueOpen,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
