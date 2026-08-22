import React, { useState, useEffect } from 'react';
import { soundSynth } from '../utils/soundSynth';
import { BBSR_SLANGS } from '../data/bbsrData';
import { Keyboard, Volume2, Sparkles } from 'lucide-react';

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
    { key: 'D', label: 'Dahibara Crunch', desc: 'Crisp Sev', sound: () => soundSynth.playDahibaraCrunch() },
    { key: 'C', label: 'Chai Clink', desc: 'Kulhad Tea', sound: () => soundSynth.playChaiClink() },
    { key: 'A', label: 'Auto Horn', desc: 'Patia 20 Taka!', sound: () => soundSynth.playAutoHorn() },
    { key: 'G', label: 'Guitar Strum', desc: '2 AM Jam', sound: () => soundSynth.playGuitarStrum() },
    { key: 'R', label: 'Radio Static', desc: 'Tuning 93.5', sound: () => soundSynth.playRadioStatic() },
    { key: 'M', label: 'Monsoon Rain', desc: 'Toggle Drizzle', sound: () => soundSynth.toggleMonsoonRain() },
    { key: 'SPACE', label: 'BBSR Slang Pop', desc: 'Floating Quote', sound: () => soundSynth.playTapeClick() }
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
    spawnBubble(`[Key ${keyObj.key}] ${keyObj.label}!`);
    setTimeout(() => setPressedKey(null), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing if typing in input/textarea
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
      
      {/* Floating Animated Slang Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        {bubbles.map((b) => (
          <div
            key={b.id}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className="absolute px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-2xl border-2 border-white/40 animate-bounce transition-all duration-500"
          >
            ✨ {b.text}
          </div>
        ))}
      </div>

      {/* Keyboard Controls Bar Container */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-300 font-bold uppercase">KEYBOARD SOUNDBOARD & EASTER EGGS</span>
          </div>
          <span className="hidden sm:inline text-slate-500">[Press keys on your keyboard]</span>
        </div>

        {/* Key Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {keyMap.map((item) => {
            const isPressed = pressedKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTrigger(item)}
                className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer shadow-md ${
                  isPressed
                    ? 'bg-amber-400 border-amber-300 text-slate-950 scale-95 shadow-amber-500/50'
                    : 'bg-slate-800/90 border-slate-700 hover:border-amber-500/60 text-slate-200 hover:bg-slate-750'
                }`}
              >
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs mb-1 ${
                  isPressed ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-amber-400 border border-amber-500/30'
                }`}>
                  {item.key}
                </span>
                <span className="text-[11px] font-semibold leading-tight">{item.label}</span>
                <span className="text-[9px] text-slate-400 mt-0.5 opacity-80">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
