import React, { useState, useEffect } from 'react';
import { NOSTALGIC_QUOTES } from '../data/bbsrData';
import { Quote as QuoteType } from '../types';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight, Pause, Play, Copy, Check } from 'lucide-react';
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
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-amber-500/30 p-4 sm:p-6 shadow-[0_4px_30px_rgba(245,158,11,0.1)] backdrop-blur-xl transition-all duration-300">
        
        {/* Header line with vibrant badge */}
        <div className="flex items-center justify-between mb-3 text-xs text-slate-300 font-medium border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <QuoteIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider font-bold text-amber-300 text-[11px]">Bhubaneswar Log</span>
            <span className="hidden sm:inline px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-200 border border-amber-500/40 text-[10px] font-semibold">
              {currentQuote.tag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-cyan-400/80 text-xs hidden sm:inline">{currentQuote.time} • {currentQuote.location}</span>
            <button
              onClick={handleCopy}
              className="p-1 sm:px-2.5 sm:py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 transition flex items-center gap-1.5 cursor-pointer text-xs shadow-sm"
              title="Copy quote"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
              <span className="hidden sm:inline text-xs">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Main Quote Text */}
        <div className="min-h-[70px] sm:min-h-[55px] flex items-center justify-center text-center px-2">
          <p key={currentQuote.id} className="text-base sm:text-lg font-normal text-slate-100 italic leading-relaxed animate-fadeIn transition-all duration-300">
            "{currentQuote.text}"
          </p>
        </div>

        {/* Footer info & Controls */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-300">
          <span className="font-semibold text-amber-300">— {currentQuote.author}</span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
              title="Previous Quote"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition cursor-pointer"
              title={isPlaying ? 'Pause Rotation' : 'Resume Rotation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
              title="Next Quote"
            >
              <ChevronRight className="w-3.5 h-3.5" />
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
              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
