import React, { useState } from 'react';
import { StudentInfo } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { X, IdCard, Sparkles, Check, Edit3 } from 'lucide-react';

interface StudentCardModalProps {
  onClose: () => void;
}

export const StudentCardModal: React.FC<StudentCardModalProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem('bbsr_student');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Suraj Kumar',
      rollNo: '1801042109',
      college: 'BBSR Institute of Technology (KIIT / ITER / OUTR)',
      branch: 'Computer Science & Engineering',
      batch: '2018–2022',
      favoriteSpot: 'Patia Square Dahibara Stall',
      favoriteFood: 'Dahibara Aloo Dum with Piyaji'
    };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundSynth.playTapeClick();
    localStorage.setItem('bbsr_student', JSON.stringify(student));
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-6 shadow-2xl">
        
        {/* Lanyard Ring Clip Visual */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-8 rounded-t-full bg-slate-800 border-2 border-amber-500/40 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-300 shadow-md"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            STUDENT IDENTIFICATION CARD
          </span>
          <h3 className="text-xl font-extrabold text-white mt-1 font-['Playfair_Display',serif]">
            {student.college}
          </h3>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            {/* ID Card Front Visual */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-950 border border-amber-500/30 shadow-inner flex items-center gap-4">
              <div className="w-20 h-24 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl">🎓</span>
                <span className="text-[9px] font-mono text-amber-400 mt-1">VERIFIED</span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-amber-200 font-bold text-base">{student.name}</p>
                <p className="text-slate-300 font-mono">Roll: <span className="text-amber-400 font-bold">{student.rollNo}</span></p>
                <p className="text-slate-400">{student.branch}</p>
                <p className="text-slate-400 text-[10px]">Batch: {student.batch}</p>
              </div>
            </div>

            {/* Nostalgic Extra Details */}
            <div className="space-y-2 text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Favorite BBSR Spot:</span>
                <span className="text-amber-300 font-medium">{student.favoriteSpot}</span>
              </div>
              <div className="flex justify-between border-t border-slate-900 pt-1.5">
                <span className="text-slate-500">Favorite Snack:</span>
                <span className="text-amber-300 font-medium">{student.favoriteFood}</span>
              </div>
              <div className="flex justify-between border-t border-slate-900 pt-1.5">
                <span className="text-slate-500">Gate Pass Status:</span>
                <span className="text-emerald-400 font-bold">APPROVED (Valid 2018–2022)</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Customize Student Details</span>
            </button>
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Student Name</label>
              <input
                type="text"
                required
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">College Name</label>
              <input
                type="text"
                required
                value={student.college}
                onChange={(e) => setStudent({ ...student, college: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 mb-1">Roll Number</label>
                <input
                  type="text"
                  required
                  value={student.rollNo}
                  onChange={(e) => setStudent({ ...student, rollNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Branch</label>
                <input
                  type="text"
                  required
                  value={student.branch}
                  onChange={(e) => setStudent({ ...student, branch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Favorite BBSR Spot</label>
              <input
                type="text"
                value={student.favoriteSpot}
                onChange={(e) => setStudent({ ...student, favoriteSpot: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-1/2 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition cursor-pointer"
              >
                Save ID Card
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
