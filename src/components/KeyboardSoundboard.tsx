import React, { useState, useEffect } from 'react';
import { soundSynth } from '../utils/soundSynth';
import { BBSR_SLANGS } from '../data/bbsrData';
import { Keyboard } from 'lucide-react';

interface FloatingBubble {
  id: number;
  text: string;
  x: number;
  y: number;
}

export const KeyboardSoundboard: React.FC = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);

  const keyMap = [
    { key: 'D', label: 'Dahibara Crunch', desc: 'Crisp Sev', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-300', active: 'bg-amber-400 text-slate-950', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40', sound: () => soundSynth.playDahibaraCrunch() },
    { key: 'C', label: 'Chai Clink', desc: 'Kulhad Tea', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/40 text-orange-300', active: 'bg-orange-400 text-slate-950', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40', sound: () => soundSynth.playChaiClink() },
    { key: 'A', label: 'Auto Horn', desc: 'Patia 20 Taka', color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/40 text-yellow-300', active: 'bg-yellow-400 text-slate-950', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', sound: () => soundSynth.playAutoHorn() },
    { key: 'G', label: 'Guitar Strum', desc: '2 AM Jam', color: 'from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/40 text-fuchsia-300', active: 'bg-fuchsia-400 text-slate-950', badge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40', sound: () => soundSynth.playGuitarStrum() },
    { key: 'R', label: 'Radio Static', desc: 'FM Tuning', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-300', active: 'bg-cyan-400 text-slate-950', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', sound: () => soundSynth.playRadioStatic() },
    { key: 'M', label: 'Monsoon Rain', desc: 'Rain Sound', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-300', active: 'bg-emerald-400 text-slate-950', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', sound: () => soundSynth.toggleMonsoonRain() },
    { key: 'SPACE', label: 'BBSR Slang', desc: 'Pop Quote', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/40 text-violet-300', active: 'bg-violet-400 text-slate-950', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40', sound: () => soundSynth.playTapeClick() }
  ];

  const spawnBubble = (customText?: string) => {
    const randomText = customText || BBSR_SLANGS[Math.floor(Math.random() * BBSR_SLANGS.length)];
    const newBubble: FloatingBubble = {
      id: Date.now() + Math.random(),
      text: randomText,
      x: Math.random() * 70 + 15, // percent
      y: Math.random() * 40 + 30
    };
    setBubbles((prev) => [...prev.slice(-8), newBubble]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 2500);
  };

  const handleTrigger = (keyObj: typeof keyMap[0]) => {
    setPressedKey(keyObj.key);
    keyObj.sound();
    spawnBubble(`[${keyObj.key}] ${keyObj.label}`);
    setTimeout(() => setPressedKey(null), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const upperKey = e.code === 'Space' ? 'SPACE' : e.key.toUpperCase();
      const match = keyMap.find((item) => item.key === upperKey);

      if (match) {
        if (e.code === 'Space') e.preventDefault();
        handleTrigger(match);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-6 z-10 relative">
      
      {/* Floating Animated Slang Particles in Colorful Palette */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        {bubbles.map((b) => (
          <div
            key={b.id}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className="absolute px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 text-white font-bold text-xs sm:text-sm shadow-2xl border border-white/20 animate-bounce transition-all duration-300 backdrop-blur-md"
          >
            ✨ {b.text}
          </div>
        ))}
      </div>

      {/* Keyboard Controls Bar Container */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/30 p-4 sm:p-5 shadow-[0_0_40px_rgba(245,158,11,0.06)] backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent font-bold uppercase tracking-wider text-[11px]">Keyboard Soundboard</span>
          </div>
          <span className="hidden sm:inline text-cyan-300 font-mono text-[11px] bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">[Press keys D, C, A, G, R, M, Space]</span>
        </div>

        {/* Key Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {keyMap.map((item) => {
            const isPressed = pressedKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTrigger(item)}
                className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition cursor-pointer shadow-md active:scale-95 bg-gradient-to-b ${
                  isPressed
                    ? `${item.active} font-bold scale-95 shadow-lg`
                    : `${item.color} hover:border-white/40`
                }`}
              >
                <span className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-xs mb-1.5 border ${
                  isPressed ? 'bg-slate-950 text-white border-transparent' : item.badge
                }`}>
                  {item.key}
                </span>
                <span className="text-[11px] font-bold leading-tight">{item.label}</span>
                <span className="text-[9px] opacity-75 mt-0.5 font-medium">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
