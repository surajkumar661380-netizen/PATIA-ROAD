import React, { useState, useEffect } from 'react';
import { MapPin, CloudRain, Clock, Volume2, VolumeX } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

interface HeaderProps {
  onRainToggle: (active: boolean) => void;
  isRainActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRainToggle, isRainActive }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRainClick = () => {
    const active = soundSynth.toggleMonsoonRain();
    onRainToggle(active);
  };

  return (
    <header className="relative w-full pt-8 pb-4 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center text-center z-20">
      {/* Top Location & Live Status Colorful Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5 text-xs font-medium">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Patia Square • Bhubaneswar</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
          <span>28°C • Monsoon Drizzle</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-emerald-300">{timeStr || '17:30 IST'}</span>
        </div>

        <button
          onClick={handleRainClick}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-xs font-semibold shadow-md ${
            isRainActive
              ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 border-cyan-300 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
              : 'bg-slate-900/90 border-slate-750 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-950/30'
          }`}
          title="Toggle ambient monsoon sound"
        >
          {isRainActive ? <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          <span>{isRainActive ? 'Monsoon Rain Active' : 'Play Rain Ambient'}</span>
        </button>
      </div>

      {/* Main Colorful Gradient Heading */}
      <div className="my-2 relative">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-['Playfair_Display',serif] bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(245,158,11,0.25)]">
          PATIA ROAD '19
        </h1>
        <div className="absolute -top-3 -right-6 hidden sm:block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-amber-500/30 rotate-6">
          Nostalgia Deck
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
        Bhubaneswar college memories • Dahibara at 5 PM, <span className="text-amber-400 font-medium">Khoka Kulhad Chai</span>, Auto Dada's <span className="text-emerald-400 font-medium">"20 Taka"</span>, and late night hostel acoustic jams.
      </p>

      {/* Colorful Campus Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-mono">
        <span className="px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 shadow-sm">
          KIIT • ITER • OUTR • UTKAL
        </span>
        <span className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 shadow-sm">
          Batch 2018–2022
        </span>
        <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 shadow-sm">
          Raghu Dahibara Certified
        </span>
      </div>
    </header>
  );
};
