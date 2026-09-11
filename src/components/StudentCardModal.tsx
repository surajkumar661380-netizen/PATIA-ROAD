import React, { useState } from 'react';
import { StudentInfo } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { X, Edit3 } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-violet-950/40 border border-violet-500/40 p-6 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pt-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            Student Identification Card
          </span>
          <h3 className="text-lg font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent mt-1.5 font-['Playfair_Display',serif]">
            {student.college}
          </h3>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            {/* ID Card Front Visual */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/40 via-slate-950 to-indigo-950/40 border border-violet-500/40 flex items-center gap-4 shadow-md">
              <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-violet-600/30 to-indigo-600/20 border border-violet-400/40 flex flex-col items-center justify-center shrink-0 shadow-inner">
                <span className="text-2xl">🎓</span>
                <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 mt-1">VERIFIED</span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-white font-bold text-sm tracking-wide">{student.name}</p>
                <p className="text-slate-400 font-mono text-xs">Roll: <span className="text-amber-300 font-bold">{student.rollNo}</span></p>
                <p className="text-violet-300 text-xs font-medium">{student.branch}</p>
                <p className="text-slate-400 text-[10px]">Batch: <span className="text-cyan-300">{student.batch}</span></p>
              </div>
            </div>

            {/* Nostalgic Extra Details */}
            <div className="space-y-2 text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-violet-500/30 font-mono shadow-inner">
              <div className="flex justify-between">
                <span className="text-slate-400">Favorite Spot:</span>
                <span className="text-amber-300 font-semibold">{student.favoriteSpot}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5">
                <span className="text-slate-400">Favorite Snack:</span>
                <span className="text-orange-300 font-semibold">{student.favoriteFood}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5">
                <span className="text-slate-400">Gate Pass:</span>
                <span className="text-emerald-300 font-bold">Valid 2018–2022</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-violet-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Card Details</span>
            </button>
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="block text-violet-300 font-medium mb-1">Student Name</label>
              <input
                type="text"
                required
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-violet-500/40 text-slate-100 focus:outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-violet-300 font-medium mb-1">College Name</label>
              <input
                type="text"
                required
                value={student.college}
                onChange={(e) => setStudent({ ...student, college: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-violet-500/40 text-slate-100 focus:outline-none focus:border-violet-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-violet-300 font-medium mb-1">Roll Number</label>
                <input
                  type="text"
                  required
                  value={student.rollNo}
                  onChange={(e) => setStudent({ ...student, rollNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-violet-500/40 text-slate-100 focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-violet-300 font-medium mb-1">Branch</label>
                <input
                  type="text"
                  required
                  value={student.branch}
                  onChange={(e) => setStudent({ ...student, branch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-violet-500/40 text-slate-100 focus:outline-none focus:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-violet-300 font-medium mb-1">Favorite Spot</label>
              <input
                type="text"
                value={student.favoriteSpot}
                onChange={(e) => setStudent({ ...student, favoriteSpot: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-violet-500/40 text-slate-100 focus:outline-none focus:border-violet-400"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-1/2 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold hover:brightness-110 shadow-md shadow-violet-500/30 transition cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
