import React, { useState, useEffect } from 'react';
import { MapPin, CloudRain, Thermometer, Clock, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
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
    <header className="relative w-full pt-6 pb-4 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-20">
      {/* Top Location & Live Ticker Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 shadow-lg shadow-amber-950/20 backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Patia Square • Bhubaneswar, Odisha</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-950/20 backdrop-blur-md">
          <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
          <span>28°C • Monsoon Drizzle</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-950/20 backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono">{timeStr || '17:30 IST'}</span>
        </div>

        <button
          onClick={handleRainClick}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-lg cursor-pointer ${
            isRainActive
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-cyan-500/20 animate-pulse'
              : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-500'
          }`}
          title="Click to toggle relaxing Bhubaneswar Monsoon Rain sound effect"
        >
          {isRainActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-300" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isRainActive ? 'Rain Sound: ON' : 'Rain Sound: OFF'}</span>
        </button>
      </div>

      {/* Main Nostalgic Heading */}
      <div className="relative inline-block my-2">
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
        <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-['Playfair_Display',serif] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100 drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
          PATIA ROAD '19
        </h1>
      </div>

      {/* Subtitle / Topic Tagline */}
      <p className="mt-2 text-base sm:text-xl text-amber-200/80 max-w-2xl font-light leading-relaxed">
        Memories of Bhubaneswar College Days • Dahibara at 5 PM, Khoka Kulhad Tea, Auto Dada's <span className="text-amber-400 font-semibold">"20 Taka"</span>, and late night engineering jams.
      </p>

      {/* Nostalgic Quick Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-amber-300/70">
        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">KIIT • ITER • OUTR • UTKAL</span>
        <span className="px-2.5 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20">Batch 2018–2022</span>
        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-400" /> Raghu Dahibara Certified
        </span>
      </div>
    </header>
  );
};
