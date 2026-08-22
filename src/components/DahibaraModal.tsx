import React, { useState } from 'react';
import { soundSynth } from '../utils/soundSynth';
import { X, Sparkles, UtensilsCrossed, Check } from 'lucide-react';

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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-6 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
              THE SOUL OF BHUBANESWAR
            </span>
            <h3 className="text-2xl font-extrabold text-amber-200 font-['Playfair_Display',serif]">
              Raghu Dada's Dahibara Aloo Dum
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          No Bhubaneswar college experience is complete without standing near Patia Square or KIIT Road at 5:30 PM, holding a leaf bowl (dona) filled with soft dahi-soaked baras, hot spicy aloo dum, and crunchy sev!
        </p>

        {/* Interactive Custom Plate Builder */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 mb-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-amber-300">
            <span>YOUR CUSTOM LEAF BOWL (#Plate {plateCount})</span>
            <span className="font-mono text-emerald-400">₹30 / Plate</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleToggle(setExtraSev, extraSev)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                extraSev ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Extra Crispy Sev</span>
              {extraSev && <Check className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => handleToggle(setExtraPiyaji, extraPiyaji)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                extraPiyaji ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Piyaji (Onion Fritters)</span>
              {extraPiyaji && <Check className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => handleToggle(setSpicyBroth, spicyBroth)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                spicyBroth ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Extra Spicy Dahi Pani</span>
              {spicyBroth && <Check className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => handleToggle(setCoriander, coriander)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                coriander ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>Fresh Coriander & Black Salt</span>
              {coriander && <Check className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="text-[11px] font-mono text-slate-400">
            "Bhaina, gote extra Piyaji pachar!"
          </div>

          <button
            onClick={handleOrderMore}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Serve Another Dona (Plate)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
