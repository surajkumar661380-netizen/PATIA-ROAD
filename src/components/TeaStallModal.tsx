import React, { useState } from 'react';
import { X, Coffee } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

interface TeaStallModalProps {
  onClose: () => void;
}

export const TeaStallModal: React.FC<TeaStallModalProps> = ({ onClose }) => {
  const [cups, setCups] = useState(2);

  const handleSlurp = () => {
    soundSynth.playChaiClink();
    setCups((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-orange-950/40 border border-orange-500/40 p-6 shadow-[0_0_50px_rgba(249,115,22,0.2)]">
        
        <button
          onClick={() => {
            soundSynth.playTapeClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/20 text-orange-400 border border-orange-500/40 shadow-sm">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
              Campus Backgate Tapri
            </span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent font-['Playfair_Display',serif]">
              Khoka Kulhad Tea Stall
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Where semester stress was dissolved over ₹10 ginger tea served in earthen clay pots (Kulhad). The unofficial birthplace of college projects and evening chats.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-orange-500/30 space-y-3 mb-4 text-xs font-mono shadow-inner">
          <div className="flex justify-between text-orange-300 font-bold border-b border-slate-800 pb-2">
            <span>Kulhad Chai Order</span>
            <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">₹10 / Cup</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Ginger & Cardamom:</span>
            <span className="text-amber-300 font-semibold">Special Brew</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span className="text-slate-400">Cups Ordered:</span>
            <span className="text-orange-300 font-bold">{cups} Cups ☕</span>
          </div>
        </div>

        <button
          onClick={handleSlurp}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-orange-500/20 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Order Another Kulhad Chai (Clink)</span>
        </button>

      </div>
    </div>
  );
};
