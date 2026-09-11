import React, { useState } from 'react';
import { INTERACTIVE_DESK_ITEMS } from '../data/bbsrData';
import { InteractiveItem } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { 
  UtensilsCrossed, 
  Coffee, 
  CreditCard as IdCard, 
  Car, 
  FileText, 
  Music, 
  Sparkles,
  Zap
} from 'lucide-react';

const BBSR_MESSENGER_CHATS = [
  "Bhai, Patia re Dahibara khaaibaaku jiba ki? Extra Piyaji ready!",
  "CR texted: tomorrow 2nd period lab class is cancelled, mass bunk confirmed!",
  "Room 304 jam session starting at 1:30 AM. Bring acoustic guitar!",
  "Mo Bus card recharge karide, semester exams next week start hauchi.",
  "Auto Dada said ₹20 till Patia Square, chala jaldi basiba!"
];

interface NostalgicDeskProps {
  onSelectItem: (item: InteractiveItem) => void;
  activeItem: InteractiveItem | null;
}

export const NostalgicDesk: React.FC<NostalgicDeskProps> = ({ onSelectItem, activeItem }) => {
  const [chatMessageIdx, setChatMessageIdx] = useState(0);
  const chatMessages = BBSR_MESSENGER_CHATS;
  const [teaSteam, setTeaSteam] = useState(false);
  const [sevAdded, setSevAdded] = useState(false);

  const handleNextChat = () => {
    soundSynth.playTapeClick();
    setChatMessageIdx((prev) => (prev + 1) % chatMessages.length);
  };

  const handleItemClick = (item: InteractiveItem) => {
    onSelectItem(item);

    // Trigger associated sound synth effects
    switch (item.soundKey) {
      case 'dahibara':
        soundSynth.playDahibaraCrunch();
        setSevAdded(true);
        setTimeout(() => setSevAdded(false), 2000);
        break;
      case 'chai':
        soundSynth.playChaiClink();
        setTeaSteam(true);
        setTimeout(() => setTeaSteam(false), 2000);
        break;
      case 'auto':
        soundSynth.playAutoHorn();
        break;
      case 'guitar':
        soundSynth.playGuitarStrum();
        break;
      case 'radio':
        soundSynth.playRadioStatic();
        break;
      case 'tape':
      default:
        soundSynth.playTapeClick();
        break;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-8 z-10">
      {/* Container Frame with Colorful Glow and Accents */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-amber-500/30 p-4 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.08)] overflow-hidden backdrop-blur-xl">
        
        {/* Header Label for Visual Stage */}
        <div className="flex items-center justify-between mb-6 pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-300 font-mono uppercase">
              Interactive Desk • Hostel Room 304 & Tapri
            </span>
          </div>

          <div className="text-xs text-cyan-400 font-mono hidden sm:block bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
            [Click items to trigger audio effects]
          </div>
        </div>

        {/* Central Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Left Visual: Interactive CRT Monitor & Chat Log */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <div className="relative rounded-xl bg-slate-950 border border-emerald-500/30 p-3.5 shadow-md overflow-hidden group">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-950 text-xs text-emerald-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  BBSR Messenger v2.0
                </span>
                <span className="text-emerald-400 font-bold text-[11px] animate-pulse">● ONLINE</span>
              </div>

              {/* Chat Monitor Content */}
              <div className="p-3 bg-slate-900/90 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-200 min-h-[110px] flex flex-col justify-between shadow-inner">
                <div>
                  <p className="text-emerald-400/80 mb-1 text-[11px] font-semibold">[17:30:12] Group: Hostel Guys & Bunkers</p>
                  <p className="text-slate-100 font-normal leading-relaxed">
                    "{chatMessages[chatMessageIdx]}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-emerald-950 text-[10px] text-emerald-400">
                  <span>Press to read next chat</span>
                  <button
                    onClick={handleNextChat}
                    className="px-2.5 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold transition cursor-pointer"
                  >
                    Next Message ➔
                  </button>
                </div>
              </div>

              <div className="mt-2 text-[10px] text-slate-400 text-center font-mono">
                Late-night syllabus discussion log
              </div>
            </div>

            {/* Auto Rickshaw Badge Banner */}
            <button
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[3])}
              className="group relative rounded-xl bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-slate-900 border border-yellow-500/40 p-3 flex items-center gap-3 shadow-md hover:border-yellow-400 transition cursor-pointer text-left"
            >
              <div className="p-2.5 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 group-hover:scale-110 transition-transform">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-yellow-300">Auto Dada Keyring</h4>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    20 Taka
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">Click for Horn sound & Patia route ticket</p>
              </div>
            </button>
          </div>

          {/* Center Visual: The Interactive Desk Artifacts */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            {/* 1. Dahibara Plate */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[0])}
              className={`relative rounded-xl border p-3.5 flex flex-col items-center justify-between text-center transition cursor-pointer group hover:-translate-y-1 shadow-md ${
                activeItem?.id === 'dahibara_plate'
                  ? 'border-amber-400 bg-amber-950/60 ring-2 ring-amber-400/50'
                  : 'border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-slate-900 hover:border-amber-400/70'
              }`}
            >
              {sevAdded && (
                <div className="absolute -top-2 px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-[10px] rounded-full animate-bounce shadow-md">
                  +Extra Sev!
                </div>
              )}
              <div className="relative my-2 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-amber-300">Dahibara Aloo Dum</h4>
                <span className="text-[10px] text-amber-400/80 font-mono block mt-0.5">5 PM Snack • Crunch</span>
              </div>
            </div>

            {/* 2. Kulhad Chai */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[1])}
              className={`relative rounded-xl border p-3.5 flex flex-col items-center justify-between text-center transition cursor-pointer group hover:-translate-y-1 shadow-md ${
                activeItem?.id === 'kulhad_chai'
                  ? 'border-orange-400 bg-orange-950/60 ring-2 ring-orange-400/50'
                  : 'border-orange-500/30 bg-gradient-to-b from-orange-950/30 to-slate-900 hover:border-orange-400/70'
              }`}
            >
              <div className="relative my-2 p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6" />
                {teaSteam && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs animate-pulse">
                    ♨️
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-orange-300">Khoka Kulhad Tea</h4>
                <span className="text-[10px] text-orange-400/80 font-mono block mt-0.5">Tapri Special • Clink</span>
              </div>
            </div>

            {/* 3. Student ID Card */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[2])}
              className={`relative rounded-xl border p-3.5 flex flex-col items-center justify-between text-center transition cursor-pointer group hover:-translate-y-1 shadow-md ${
                activeItem?.id === 'student_id'
                  ? 'border-cyan-400 bg-cyan-950/60 ring-2 ring-cyan-400/50'
                  : 'border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-slate-900 hover:border-cyan-400/70'
              }`}
            >
              <div className="relative my-2 p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 group-hover:scale-110 transition-transform">
                <IdCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-cyan-300">Student ID Card</h4>
                <span className="text-[10px] text-cyan-400/80 font-mono block mt-0.5">Campus Lanyard</span>
              </div>
            </div>

            {/* 4. Semester Exam Paper */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[4])}
              className={`relative rounded-xl border p-3.5 flex flex-col items-center justify-between text-center transition cursor-pointer group hover:-translate-y-1 shadow-md ${
                activeItem?.id === 'grade_sheet'
                  ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400/50'
                  : 'border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900 hover:border-emerald-400/70'
              }`}
            >
              <div className="relative my-2 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-emerald-300">Mid-Sem Notes</h4>
                <span className="text-[10px] text-emerald-400/80 font-mono block mt-0.5">Unit Formula Sheet</span>
              </div>
            </div>

            {/* 5. Hostel Guitar */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[5])}
              className={`relative rounded-xl border p-3.5 flex flex-col items-center justify-between text-center transition cursor-pointer group hover:-translate-y-1 shadow-md ${
                activeItem?.id === 'guitar_amp'
                  ? 'border-fuchsia-400 bg-fuchsia-950/60 ring-2 ring-fuchsia-400/50'
                  : 'border-fuchsia-500/30 bg-gradient-to-b from-fuchsia-950/30 to-slate-900 hover:border-fuchsia-400/70'
              }`}
            >
              <div className="relative my-2 p-2.5 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-fuchsia-300">Acoustic Guitar</h4>
                <span className="text-[10px] text-fuchsia-400/80 font-mono block mt-0.5">2 AM Jam • Strum</span>
              </div>
            </div>

            {/* 6. Quick Action: Random Slang Pop */}
            <div
              onClick={() => {
                soundSynth.playAutoHorn();
                handleNextChat();
              }}
              className="relative rounded-xl bg-gradient-to-b from-violet-950/40 to-slate-900 border border-violet-500/40 p-3.5 flex flex-col items-center justify-center text-center transition cursor-pointer hover:border-violet-400 shadow-md group"
            >
              <Zap className="w-6 h-6 text-violet-400 mb-1 transition-transform group-hover:scale-125" />
              <h4 className="text-xs font-semibold text-violet-300">BBSR Sound Cue</h4>
              <span className="text-[10px] text-violet-400/80 font-mono mt-0.5">Click for cue</span>
            </div>

          </div>

        </div>

        {/* Selected Item Detail Description Banner */}
        {activeItem && (
          <div className="mt-5 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-violet-500/15 p-3.5 rounded-xl border border-amber-500/30 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-300">{activeItem.name}</h4>
                <p className="text-xs text-slate-200 mt-0.5">{activeItem.description}</p>
              </div>
            </div>
            
            <span className="text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 whitespace-nowrap shadow-sm">
              ✨ Sound Effect Active
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
