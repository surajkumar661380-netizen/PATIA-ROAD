import React, { useState } from 'react';
import { INTERACTIVE_DESK_ITEMS } from '../data/bbsrData';
import { InteractiveItem } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { Sparkles, Coffee, UtensilsCrossed, IdCard, Car, FileText, Music, Info, Heart, ExternalLink, Zap } from 'lucide-react';

interface NostalgicDeskProps {
  onSelectItem: (item: InteractiveItem) => void;
  activeItem: InteractiveItem | null;
}

export const NostalgicDesk: React.FC<NostalgicDeskProps> = ({ onSelectItem, activeItem }) => {
  const [dahibaraCount, setDahibaraCount] = useState(3);
  const [sevAdded, setSevAdded] = useState(false);
  const [teaSteam, setTeaSteam] = useState(true);
  const [chatMessageIdx, setChatMessageIdx] = useState(0);

  const chatMessages = [
    "Abe 5:00 PM asigala! Raghu Dahibara pakhare miliba?",
    "CR: Tomorrows 2nd lab is cancelled guys!",
    "Unit-3 Digital Signal Processing PDF kehi gote pathao...",
    "Auto Dada: Patia 20 taka, chalba!",
    "Puri Beach drive plan for Saturday morning confirmed!"
  ];

  const handleItemClick = (item: InteractiveItem) => {
    // Play appropriate sound
    switch (item.soundKey) {
      case 'dahibara':
        soundSynth.playDahibaraCrunch();
        setSevAdded(true);
        setTimeout(() => setSevAdded(false), 1500);
        break;
      case 'chai':
        soundSynth.playChaiClink();
        setTeaSteam(true);
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
        soundSynth.playTapeClick();
        break;
      default:
        soundSynth.playChaiClink();
    }

    onSelectItem(item);
  };

  const handleNextChat = () => {
    soundSynth.playTapeClick();
    setChatMessageIdx((prev) => (prev + 1) % chatMessages.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-8 z-10">
      {/* Container Frame with Retro Neon Border */}
      <div className="relative rounded-3xl bg-slate-950/90 border-2 border-amber-500/40 p-4 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden backdrop-blur-2xl">
        
        {/* Background Atmosphere & Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Label for Visual Stage */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-300 font-mono">
              INTERACTIVE DESK • HOSTEL ROOM 304 & TAPRI
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            [Click items to trigger sounds & secrets]
          </div>
        </div>

        {/* Central Illustrated Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Visual: Interactive CRT Monitor & Chat Log */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl bg-slate-900 border-4 border-slate-800 p-4 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-amber-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  BBSR Messenger v2.0
                </span>
                <span className="text-emerald-400 font-semibold animate-pulse">● ONLINE</span>
              </div>

              {/* Chat Monitor Content */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 min-h-[110px] flex flex-col justify-between">
                <div>
                  <p className="text-slate-500 mb-1">[17:30:12] Group: Hostel Guys & Bunkers</p>
                  <p className="text-amber-300 font-medium leading-relaxed">
                    "{chatMessages[chatMessageIdx]}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                  <span>Press button to refresh chat</span>
                  <button
                    onClick={handleNextChat}
                    className="px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 transition cursor-pointer"
                  >
                    Next Message ➔
                  </button>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 text-center font-mono">
                🖥️ Late-night syllabus discussion monitor
              </div>
            </div>

            {/* Auto Rickshaw Badge Banner */}
            <button
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[3])}
              className="group relative rounded-2xl bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/30 p-3.5 flex items-center gap-3 shadow-lg hover:border-amber-400 transition-all duration-300 cursor-pointer text-left"
            >
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-200">Auto Dada Keyring</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    20 Taka!
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Click for Horn sound & Patia route ticket!</p>
              </div>
            </button>
          </div>

          {/* Center Visual: The Interactive Desk Artifacts */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            
            {/* 1. Dahibara Plate */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[0])}
              className={`relative rounded-2xl bg-slate-900/90 border p-4 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg ${
                activeItem?.id === 'dahibara_plate' ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-950/30' : 'border-slate-800 hover:border-amber-500/50'
              }`}
            >
              {sevAdded && (
                <div className="absolute -top-2 px-2 py-0.5 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-full animate-bounce">
                  +Extra Sev Sprinkled!
                </div>
              )}
              <div className="relative my-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-8 h-8 text-amber-400" />
                <span className="absolute -bottom-1 -right-1 text-xs">🥣</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Dahibara Aloo Dum</h4>
                <span className="text-[10px] text-amber-400/80 font-mono block mt-0.5">5 PM Snack • Crunch!</span>
              </div>
            </div>

            {/* 2. Kulhad Chai */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[1])}
              className={`relative rounded-2xl bg-slate-900/90 border p-4 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg ${
                activeItem?.id === 'kulhad_chai' ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-950/30' : 'border-slate-800 hover:border-amber-500/50'
              }`}
            >
              <div className="relative my-2 p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 group-hover:scale-110 transition-transform">
                <Coffee className="w-8 h-8 text-orange-400" />
                {teaSteam && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs animate-pulse">
                    ♨️
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Khoka Kulhad Tea</h4>
                <span className="text-[10px] text-orange-400/80 font-mono block mt-0.5">Tapri Special • Clink!</span>
              </div>
            </div>

            {/* 3. Student ID Card */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[2])}
              className={`relative rounded-2xl bg-slate-900/90 border p-4 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg ${
                activeItem?.id === 'student_id' ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-950/30' : 'border-slate-800 hover:border-amber-500/50'
              }`}
            >
              <div className="relative my-2 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <IdCard className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Student ID Card</h4>
                <span className="text-[10px] text-cyan-400/80 font-mono block mt-0.5">KIIT / ITER Lanyard</span>
              </div>
            </div>

            {/* 4. Semester Exam Paper */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[4])}
              className={`relative rounded-2xl bg-slate-900/90 border p-4 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg ${
                activeItem?.id === 'grade_sheet' ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-950/30' : 'border-slate-800 hover:border-amber-500/50'
              }`}
            >
              <div className="relative my-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Mid-Sem Doodles</h4>
                <span className="text-[10px] text-emerald-400/80 font-mono block mt-0.5">Unit-3 Formula Cheat</span>
              </div>
            </div>

            {/* 5. Hostel Guitar */}
            <div
              onClick={() => handleItemClick(INTERACTIVE_DESK_ITEMS[5])}
              className={`relative rounded-2xl bg-slate-900/90 border p-4 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg ${
                activeItem?.id === 'guitar_amp' ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-950/30' : 'border-slate-800 hover:border-amber-500/50'
              }`}
            >
              <div className="relative my-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 group-hover:scale-110 transition-transform">
                <Music className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Acoustic Guitar</h4>
                <span className="text-[10px] text-rose-400/80 font-mono block mt-0.5">2 AM Jam • Strum!</span>
              </div>
            </div>

            {/* 6. Quick Action: Random Slang Pop */}
            <div
              onClick={() => {
                soundSynth.playAutoHorn();
                handleNextChat();
              }}
              className="relative rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/40 p-4 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer hover:border-amber-300 hover:scale-[1.02] shadow-lg group"
            >
              <Zap className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform mb-1" />
              <h4 className="text-xs font-bold text-amber-200">BBSR Slang Pop</h4>
              <span className="text-[10px] text-amber-300/80 font-mono mt-0.5">Click for sound!</span>
            </div>

          </div>

        </div>

        {/* Selected Item Detail Description Banner */}
        {activeItem && (
          <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-200">{activeItem.name}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{activeItem.description}</p>
              </div>
            </div>
            
            <span className="text-xs font-mono text-amber-300 bg-amber-950 px-3 py-1.5 rounded-lg border border-amber-500/40 whitespace-nowrap">
              Sound Effect Played ✨
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
