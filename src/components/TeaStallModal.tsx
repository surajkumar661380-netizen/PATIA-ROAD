import React, { useState } from 'react';
import { X, Coffee, Sparkles, Flame, Check } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

interface TeaStallModalProps {
  onClose: () => void;
}

export const TeaStallModal: React.FC<TeaStallModalProps> = ({ onClose }) => {
  const [cups, setCups] = useState(2);
  const [ginger, setGinger] = useState(true);

  const handleSlurp = () => {
    soundSynth.playChaiClink();
    setCups((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-orange-500/40 p-6 shadow-2xl">
        
        <button
          onClick={() => {
            soundSynth.playTapeClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
              24x7 CAMPUS BACKGATE STALL
            </span>
            <h3 className="text-xl font-extrabold text-orange-200 font-['Playfair_Display',serif]">
              Khoka Kulhad Tea Stall
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Where semester stress was dissolved over ₹10 ginger tea served in earthen clay pots (Kulhad). The unofficial birthplace of startup ideas, college romance, and mass bunk conspiracies.
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/30 space-y-3 mb-4 text-xs font-mono">
          <div className="flex justify-between text-orange-300 font-bold border-b border-slate-800 pb-2">
            <span>KULHAD CHAI TAPRI ORDER</span>
            <span>₹10 / Clay Cup</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Cardamom & Fresh Ginger:</span>
            <span className="text-emerald-400 font-bold">EXTRA SPECIAL</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-900 pt-2">
            <span className="text-slate-400">Cups Served Today:</span>
            <span className="text-amber-400 font-bold">{cups} Clay Cups ☕</span>
          </div>
        </div>

        <button
          onClick={handleSlurp}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <Flame className="w-4 h-4" />
          <span>Order Another Boiling Kulhad Chai (Clink!)</span>
        </button>

      </div>
    </div>
  );
};
