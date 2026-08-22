import React, { useState, useEffect, useRef } from 'react';
import { PLAYLIST_TRACKS } from '../data/bbsrData';
import { Track } from '../types';
import { soundSynth } from '../utils/soundSynth';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Youtube,
  Radio,
  Repeat,
  Shuffle,
  ListMusic,
  ExternalLink,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isYoutubeEmbedOpen, setIsYoutubeEmbedOpen] = useState(false);

  const currentTrack: Track = PLAYLIST_TRACKS[currentTrackIdx];

  // Progress Bar timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrackIdx]);

  const handlePlayPause = () => {
    soundSynth.playTapeClick();
    if (!isPlaying) {
      soundSynth.playGuitarStrum();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    soundSynth.playTapeClick();
    setCurrentTrackIdx((prev) => (prev + 1) % PLAYLIST_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    soundSynth.playTapeClick();
    setCurrentTrackIdx((prev) => (prev - 1 + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length);
    setProgress(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <>
      {/* Fixed Bottom Glassmorphism Music Player */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 bg-slate-950/85 backdrop-blur-2xl border-t border-amber-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.9)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Track Info Section */}
          <div className="flex items-center gap-3 w-full md:w-1/4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shrink-0 group">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110 rotate-3' : ''}`}
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition"></div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-100 truncate flex items-center gap-1.5">
                <span>{currentTrack.title}</span>
                {isPlaying && (
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-amber-400 animate-pulse"></span>
                    <span className="w-0.5 h-2/3 bg-amber-400 animate-bounce"></span>
                    <span className="w-0.5 h-1/2 bg-amber-400 animate-pulse"></span>
                  </span>
                )}
              </h4>
              <p className="text-[11px] text-amber-300/80 truncate">{currentTrack.artist}</p>
              <span className="text-[9px] font-mono text-slate-400 block truncate">{currentTrack.vibe}</span>
            </div>
          </div>

          {/* Central Playback Controls & Progress Slider */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4 max-w-xl">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  soundSynth.playTapeClick();
                  setCurrentTrackIdx(Math.floor(Math.random() * PLAYLIST_TRACKS.length));
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 transition cursor-pointer"
                title="Shuffle Track"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 hover:border-amber-500/50 transition cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 hover:scale-105 transition cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 hover:border-amber-500/50 transition cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsYoutubeEmbedOpen(true)}
                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 transition cursor-pointer flex items-center gap-1 text-xs"
                title="Watch / Listen on YouTube Playlist"
              >
                <Youtube className="w-4 h-4" />
              </button>
            </div>

            {/* Time Slider */}
            <div className="w-full flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={currentTrack.duration}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            <button
              onClick={() => setIsPlaylistModalOpen(!isPlaylistModalOpen)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <ListMusic className="w-4 h-4" />
              <span>Playlist ({PLAYLIST_TRACKS.length})</span>
            </button>

            <a
              href="https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600/30 transition cursor-pointer"
              title="Open YouTube Playlist in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* Playlist Drawer Modal */}
      {isPlaylistModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-end justify-center sm:items-center p-4 z-50 animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-amber-200 font-['Playfair_Display',serif] flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                BBSR College Nostalgia Playlist
              </h3>
              <button
                onClick={() => setIsPlaylistModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              {PLAYLIST_TRACKS.map((track, idx) => (
                <div
                  key={track.id}
                  onClick={() => {
                    soundSynth.playTapeClick();
                    setCurrentTrackIdx(idx);
                    setProgress(0);
                    setIsPlaying(true);
                    setIsPlaylistModalOpen(false);
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    idx === currentTrackIdx
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-amber-400 font-bold w-4">{idx + 1}</span>
                    <div>
                      <h4 className="text-xs font-bold">{track.title}</h4>
                      <p className="text-[10px] text-slate-400">{track.artist} • {track.vibe}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {track.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <a
                href="https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 underline"
              >
                <Youtube className="w-4 h-4" /> Open Full Original YouTube Playlist
              </a>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Playlist Embed Modal */}
      {isYoutubeEmbedOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-amber-500/40 p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2 font-['Playfair_Display',serif]">
                <Youtube className="w-5 h-5 text-red-500" />
                BBSR College Nostalgia - YouTube Music Source
              </h3>
              <button
                onClick={() => setIsYoutubeEmbedOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q"
                title="College Student BBSR Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Playing directly from YouTube source playlist</span>
              <a
                href="https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                Open in YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
