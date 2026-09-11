import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Shuffle,
  Repeat,
  Heart,
  ListMusic,
  Tv,
  X,
  ExternalLink
} from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { soundSynth } from '../utils/soundSynth';

export const MusicPlayer: React.FC = () => {
  const {
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
  } = usePlaylist();

  // Initialize YouTube Iframe Player on mount once
  useEffect(() => {
    initPlayer('youtube-iframe-mount');
  }, [initPlayer]);

  // Scrubbing & seeking state
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const scrubValueRef = useRef(0);

  // Format seconds into m:ss or mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const total = Math.floor(secs);
    const mins = Math.floor(total / 60);
    const remSecs = total % 60;
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const isCurrentFavorite = favorites.includes(currentTrack.id);

  // Effective progress: scrubValue while dragging, actual audio progress otherwise
  const displayProgress = isScrubbing ? scrubValue : Math.min(progress, duration);
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (displayProgress / duration) * 100)) : 0;

  // Handle starting a scrub (pointer down / touch start)
  const handleSeekStart = (val: number) => {
    setIsScrubbing(true);
    setScrubValue(val);
    scrubValueRef.current = val;
    setSeeking(true);
  };

  // Handle dragging slider (input change)
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setScrubValue(val);
    scrubValueRef.current = val;
    if (!isScrubbing) {
      setIsScrubbing(true);
      setSeeking(true);
    }
  };

  // Handle committing the seek (pointer up / touch end / keyboard release)
  const handleSeekCommit = (overrideValue?: number) => {
    const target = typeof overrideValue === 'number' ? overrideValue : scrubValueRef.current;
    setIsScrubbing(false);
    setSeeking(false);
    seekTo(target);
  };

  // Handle clicking anywhere on the progress bar track directly
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = Math.round(ratio * duration);
    setScrubValue(targetSeconds);
    scrubValueRef.current = targetSeconds;
    handleSeekCommit(targetSeconds);
  };

  return (
    <>
      {/* 
        Persistent YouTube Player Mount
        Stays in the DOM at all times so audio playback, buffering, 
        and real seek positions are never interrupted or reset.
      */}
      <div
        id="youtube-player-mount-wrapper"
        className={
          showMiniVideo
            ? 'fixed bottom-24 right-4 sm:right-8 z-50 w-80 sm:w-96 rounded-2xl bg-zinc-900 border border-zinc-800 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 animate-fadeIn'
            : 'fixed -left-[9999px] -top-[9999px] w-64 h-36 opacity-0 pointer-events-none z-[-1]'
        }
      >
        {showMiniVideo && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-1.5 font-medium truncate pr-2">
              <Tv className="w-3.5 h-3.5 text-zinc-400" />
              {currentTrack.title}
            </span>
            <button
              onClick={() => setShowMiniVideo(false)}
              className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              title="Close Video Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className={showMiniVideo ? 'relative aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-inner' : 'w-full h-full'}>
          <div id="youtube-iframe-mount" className="w-full h-full"></div>
        </div>

        {showMiniVideo && (
          <div className="flex items-center justify-between pt-2 text-[10px] text-zinc-500 font-mono">
            <span className="truncate">{currentTrack.artist}</span>
            <a
              href={`https://youtube.com/watch?v=${currentTrack.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:underline flex items-center gap-1 shrink-0"
            >
              Open on YouTube <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        )}
      </div>

      {/* Up-Next Queue Slide-up Drawer */}
      {isQueueOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-80 sm:w-96 max-h-[460px] rounded-2xl bg-slate-950/95 border border-violet-500/40 p-4 shadow-2xl backdrop-blur-2xl flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-violet-400" />
              <h4 className="text-sm font-bold bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">Play Queue</h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {tracks.length} tracks
              </span>
            </div>
            <button
              onClick={() => setIsQueueOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Playing in Queue */}
          <div className="mb-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-rose-950/30 border border-amber-500/40">
            <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1 font-bold">Now Playing</span>
            <div className="flex items-center justify-between">
              <div className="truncate pr-2">
                <div className="text-xs font-bold text-amber-200 truncate">{currentTrack.title}</div>
                <div className="text-[10px] text-slate-300 truncate">{currentTrack.artist}</div>
              </div>
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-1 h-full bg-amber-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-2/3 bg-rose-400 rounded-full animate-pulse"></span>
                <span className="w-1 h-4/5 bg-amber-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>

          {/* Up Next List */}
          <span className="text-[11px] font-semibold text-slate-300 mb-2 block">Next In Playlist</span>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {tracks.map((track, idx) => {
              const isItemCurrent = idx === currentTrackIdx;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    playTrack(idx);
                  }}
                  className={`p-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition ${
                    isItemCurrent
                      ? 'bg-violet-950/60 text-violet-200 font-bold border border-violet-500/40'
                      : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-[10px] text-violet-400 w-4 text-center font-bold">{idx + 1}</span>
                    <div className="truncate">
                      <div className="truncate text-slate-100 font-medium">{track.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{track.artist}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 ml-2">
                    {formatTime(track.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 
        THE SINGLE MASTER MUSIC PLAYER (Bottom Colorful Floating Bar)
      */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-amber-500/30 shadow-[0_-8px_35px_rgba(245,158,11,0.12)] px-3 sm:px-6 py-2.5"
        id="single-master-music-player"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">

          {/* Left: Active Track Metadata */}
          <div className="flex items-center gap-3 w-1/3 max-w-xs min-w-0">
            {/* Spinning Vinyl Cover Art */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)] group">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'rotate-[360deg] duration-[12s] ease-linear repeat-infinite' : ''}`}
              />
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-amber-400"></div>
              </div>
            </div>

            {/* Title, Artist & Favorite */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                  {currentTrack.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                <span className="text-amber-300 font-medium">{currentTrack.artist}</span> • <span className="text-slate-500">{currentTrack.album}</span>
              </p>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => {
                soundSynth.playTapeClick();
                toggleFavorite(currentTrack.id);
              }}
              className={`p-1.5 rounded-lg transition cursor-pointer hover:bg-slate-900 shrink-0 ${
                isCurrentFavorite ? 'text-rose-400 scale-110' : 'text-slate-500 hover:text-rose-400'
              }`}
              title={isCurrentFavorite ? 'Liked' : 'Like song'}
            >
              <Heart className={`w-4 h-4 ${isCurrentFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Center: Playback Controls & Real-Seek Timeline */}
          <div className="flex flex-col items-center gap-1.5 w-full max-w-xl">
            
            {/* Control Buttons Row */}
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Shuffle Toggle */}
              <button
                onClick={() => {
                  soundSynth.playTapeClick();
                  toggleShuffle();
                }}
                className={`relative p-2 rounded-lg transition cursor-pointer ${
                  isShuffle 
                    ? 'text-violet-300 bg-violet-950/60 border border-violet-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-violet-300'
                }`}
                title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
              >
                <Shuffle className="w-4 h-4" />
                {isShuffle && <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-violet-400"></span>}
              </button>

              {/* Previous Track */}
              <button
                onClick={prevTrack}
                className="p-2 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-slate-800 transition cursor-pointer active:scale-95"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Colorful Master Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={nextTrack}
                className="p-2 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-slate-800 transition cursor-pointer active:scale-95"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Repeat Toggle */}
              <button
                onClick={() => {
                  soundSynth.playTapeClick();
                  toggleRepeat();
                }}
                className={`relative p-2 rounded-lg transition cursor-pointer ${
                  isRepeat 
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
                title={isRepeat ? 'Repeat On' : 'Repeat Off'}
              >
                <Repeat className="w-4 h-4" />
                {isRepeat && <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
              </button>

            </div>

            {/* Timeline Progress Scrub Bar */}
            <div className="w-full flex items-center gap-2.5 text-[10px] font-mono text-slate-400 select-none">
              <span className="w-9 text-right text-amber-300 font-semibold">{formatTime(displayProgress)}</span>
              
              {/* Scrub Track Area */}
              <div 
                className="relative flex-1 flex items-center group h-5 cursor-pointer"
                onClick={handleProgressBarClick}
              >
                {/* Background track */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden group-hover:h-2 transition-all shadow-inner">
                  {/* Real-time gradient progress fill */}
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 rounded-full transition-[width] duration-75 relative shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-[1px]"></span>
                  </div>
                </div>

                {/* Progress thumb handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-amber-300 border-2 border-slate-950 shadow-md transition-transform group-hover:scale-125 pointer-events-none ring-2 ring-amber-400/40"
                  style={{ left: `calc(${progressPercent}% - 7px)` }}
                />

                {/* Transparent native range input */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="1"
                  value={displayProgress}
                  onPointerDown={(e) => handleSeekStart(Number((e.target as HTMLInputElement).value))}
                  onChange={handleSeekChange}
                  onPointerUp={(e) => handleSeekCommit(Number((e.target as HTMLInputElement).value))}
                  onTouchStart={(e) => handleSeekStart(Number((e.target as HTMLInputElement).value))}
                  onTouchEnd={(e) => handleSeekCommit(Number((e.target as HTMLInputElement).value))}
                  onKeyUp={(e) => handleSeekCommit(Number((e.target as HTMLInputElement).value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Seek track playback position"
                />
              </div>

              <span className="w-9 text-left text-slate-400 font-medium">{formatTime(duration)}</span>
            </div>

          </div>

          {/* Right: Volume & Auxiliary Controls */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 w-1/3 max-w-xs">
            
            {/* Watch Video Toggle */}
            <button
              onClick={() => {
                soundSynth.playTapeClick();
                setShowMiniVideo((prev) => !prev);
              }}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
                showMiniVideo
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/70'
              }`}
              title="Toggle Video Screen"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{showMiniVideo ? 'Hide Video' : 'Watch'}</span>
            </button>

            {/* Queue Toggle */}
            <button
              onClick={() => {
                soundSynth.playTapeClick();
                setIsQueueOpen((prev) => !prev);
              }}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
                isQueueOpen
                  ? 'bg-violet-500 text-white border-violet-400 font-bold'
                  : 'bg-violet-950/40 border-violet-500/40 text-violet-300 hover:border-violet-400 hover:bg-violet-950/70'
              }`}
              title="Show Play Queue"
            >
              <ListMusic className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Queue</span>
            </button>

            {/* Volume Control */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                ) : volume < 50 ? (
                  <Volume1 className="w-4 h-4 text-amber-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-300" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 lg:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                title={`Volume: ${isMuted ? 0 : volume}%`}
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};
