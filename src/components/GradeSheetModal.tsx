import React from 'react';
import { X } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

interface GradeSheetModalProps {
  onClose: () => void;
}

export const GradeSheetModal: React.FC<GradeSheetModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] font-mono text-slate-100">
        
        <button
          onClick={() => {
            soundSynth.playTapeClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
            <span>MID-SEMESTER EXAMINATION</span>
            <span className="bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">CODE: CS-501</span>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300 bg-clip-text text-transparent font-['Playfair_Display',serif] mt-1">
            Digital Signal Processing (DSP)
          </h3>
        </div>

        {/* Exam Doodles & Notes */}
        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/30 relative">
            <span className="absolute -top-2 right-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[9px] border border-amber-500/40">
              EXAM DOODLE
            </span>
            <p className="font-bold text-amber-200">Q1: Derive Fast Fourier Transform (FFT) Butterfly Diagram.</p>
            <p className="text-slate-300 italic text-xs mt-1">
              "Note: 3 AM hostel tea helped derive this... hopes and prayers for passing mark 12/30!"
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-cyan-500/30">
            <p className="font-bold text-cyan-300">Unit Formula Reference:</p>
            <div className="mt-1 space-y-1 text-[11px] text-slate-300 font-mono bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <p className="text-cyan-200">• H(z) = ∑ h[n] z^(-n) [Z-Transform]</p>
              <p className="text-teal-200">• Nyquist Rate = 2 * Fmax</p>
              <p className="text-rose-300">• Mass Bunk Plan: Vote 1 for YES, 0 for NO in group chat</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-950/50 to-teal-950/40 border border-emerald-500/40 text-slate-100">
            <span className="font-semibold text-xs text-emerald-300">Final Mid-Sem Result:</span>
            <span className="font-bold text-xs text-emerald-300 font-mono bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/40">PASSED (22/30) 🎉</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
          Department of Computer Science • Bhubaneswar Campus
        </div>

      </div>
    </div>
  );
};
