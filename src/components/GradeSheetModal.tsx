import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

interface GradeSheetModalProps {
  onClose: () => void;
}

export const GradeSheetModal: React.FC<GradeSheetModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-amber-50 text-slate-900 border-4 border-slate-800 p-6 shadow-2xl font-mono">
        
        <button
          onClick={() => {
            soundSynth.playTapeClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-900 text-amber-300 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b-2 border-slate-900 pb-3 mb-4">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
            <span>MID-SEMESTER EXAMINATION 2019</span>
            <span>CODE: CS-501</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-['Playfair_Display',serif] mt-1">
            DIGITAL SIGNAL PROCESSING (DSP)
          </h3>
        </div>

        {/* Exam Doodles & Notes */}
        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm relative">
            <span className="absolute -top-2 right-2 px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[9px]">
              CONFIDENTIAL DOODLE
            </span>
            <p className="font-bold text-slate-800">Q1: Derive Fast Fourier Transform (FFT) Butterfly Diagram.</p>
            <p className="text-slate-600 italic font-['Caveat',cursive] text-base mt-1 text-rose-700">
              "Note: 3 AM hostel tea helped derive this... hopes and prayers for passing mark 12/30!"
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm">
            <p className="font-bold text-slate-800">Unit-3 Formula Cheat Sheet:</p>
            <div className="mt-1 space-y-1 text-[11px] text-slate-700 font-mono bg-slate-100 p-2 rounded">
              <p>• H(z) = ∑ h[n] z^(-n) [Z-Transform]</p>
              <p>• Nyquist Rate = 2 * Fmax</p>
              <p>• Mass Bunk Plan: Vote 1 for YES, 0 for NO in group chat</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900">
            <span className="font-bold">Final Mid-Sem Result:</span>
            <span className="font-extrabold text-sm text-emerald-800">PASSED (22/30) 🎉</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-300 text-[10px] text-slate-500 text-center">
          Stamped by Department of Engineering • Bhubaneswar Campus
        </div>

      </div>
    </div>
  );
};
