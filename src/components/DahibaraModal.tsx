import React, { useState } from 'react';
import { soundSynth } from '../utils/soundSynth';
import { X, UtensilsCrossed, Check } from 'lucide-react';

interface DahibaraModalProps {
  onClose: () => void;
}

export const DahibaraModal: React.FC<DahibaraModalProps> = ({ onClose }) => {
  const [extraSev, setExtraSev] = useState(true);
  const [extraPiyaji, setExtraPiyaji] = useState(true);
  const [spicyBroth, setSpicyBroth] = useState(true);
  const [coriander, setCoriander] = useState(true);
  const [plateCount, setPlateCount] = useState(1);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
    soundSynth.playDahibaraCrunch();
    setter(!current);
  };

  const handleOrderMore = () => {
    soundSynth.playDahibaraCrunch();
    setPlateCount((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/40 p-6 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 text-amber-400 border border-amber-500/40 shadow-sm">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              Campus Street Food Tradition
            </span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent font-['Playfair_Display',serif]">
              Dahibara Aloo Dum
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Standing near Patia Square or KIIT Road at 5:30 PM, holding a leaf bowl filled with soft dahi baras, hot spicy aloo dum, and crunchy sev.
        </p>

        {/* Interactive Custom Plate Builder */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 mb-4 space-y-3 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-amber-300">
            <span>Custom Plate Configuration (Plate #{plateCount})</span>
            <span className="font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">₹30 / Plate</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleToggle(setExtraSev, extraSev)}
              className={`p-2 rounded-lg border flex items-center justify-between transition cursor-pointer font-medium ${
                extraSev ? 'bg-amber-950/40 border-amber-500/50 text-amber-200 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Extra Sev Crunch</span>
              {extraSev && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            <button
              onClick={() => handleToggle(setExtraPiyaji, extraPiyaji)}
              className={`p-2 rounded-lg border flex items-center justify-between transition cursor-pointer font-medium ${
                extraPiyaji ? 'bg-orange-950/40 border-orange-500/50 text-orange-200 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Extra Crispy Piyaji</span>
              {extraPiyaji && <Check className="w-3.5 h-3.5 text-orange-400" />}
            </button>

            <button
              onClick={() => handleToggle(setSpicyBroth, spicyBroth)}
              className={`p-2 rounded-lg border flex items-center justify-between transition cursor-pointer font-medium ${
                spicyBroth ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Spicy Aloo Dum Broth</span>
              {spicyBroth && <Check className="w-3.5 h-3.5 text-rose-400" />}
            </button>

            <button
              onClick={() => handleToggle(setCoriander, coriander)}
              className={`p-2 rounded-lg border flex items-center justify-between transition cursor-pointer font-medium ${
                coriander ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Fresh Coriander Mix</span>
              {coriander && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer text-xs font-semibold"
          >
            Close
          </button>
          <button
            onClick={handleOrderMore}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-amber-500/20 transition cursor-pointer text-xs"
          >
            Order Another Plate (₹{30 * (plateCount + 1)})
          </button>
        </div>

      </div>
    </div>
  );
};
