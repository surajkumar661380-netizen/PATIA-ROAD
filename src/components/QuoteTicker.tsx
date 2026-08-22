import React, { useState, useEffect } from 'react';
import { NOSTALGIC_QUOTES } from '../data/bbsrData';
import { Quote as QuoteType } from '../types';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight, Pause, Play, Sparkles, Copy, Check } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

export const QuoteTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentQuote: QuoteType = NOSTALGIC_QUOTES[currentIndex];

  const handleNext = () => {
    soundSynth.playTapeClick();
    setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
  };

  const handlePrev = () => {
    soundSynth.playTapeClick();
    setCurrentIndex((prev) => (prev - 1 + NOSTALGIC_QUOTES.length) % NOSTALGIC_QUOTES.length);
  };

  const handleCopy = () => {
    soundSynth.playChaiClink();
    navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-4 z-10">
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-amber-500/30 p-4 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-500">
        
        {/* Glow corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header line with badge */}
        <div className="flex items-center justify-between mb-3 text-xs text-amber-400/80 font-medium border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <QuoteIcon className="w-4 h-4 text-amber-400" />
            <span className="uppercase tracking-wider font-semibold">Bhubaneswar Memory Log</span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {currentQuote.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-xs hidden sm:inline">{currentQuote.time} • {currentQuote.location}</span>
            <button
              onClick={handleCopy}
              className="p-1 sm:px-2 sm:py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1 cursor-pointer"
              title="Copy quote"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span className="hidden sm:inline text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Main Quote Text */}
        <div className="min-h-[70px] sm:min-h-[60px] flex items-center justify-center text-center px-2">
          <p key={currentQuote.id} className="text-base sm:text-xl font-medium text-slate-100 italic font-['Outfit',sans-serif] animate-fadeIn transition-all duration-300">
            "{currentQuote.text}"
          </p>
        </div>

        {/* Footer info & Controls */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-xs text-slate-400">
          <span className="font-semibold text-amber-300/90">— {currentQuote.author}</span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer"
              title="Previous Quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-400 border border-slate-700/60 transition cursor-pointer"
              title={isPlaying ? 'Pause Auto-rotate' : 'Start Auto-rotate'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer"
              title="Next Quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Indicator Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-3">
          {NOSTALGIC_QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundSynth.playTapeClick();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
