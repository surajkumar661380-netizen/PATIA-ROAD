import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuoteTicker } from './components/QuoteTicker';
import { NostalgicDesk } from './components/NostalgicDesk';
import { KeyboardSoundboard } from './components/KeyboardSoundboard';
import { PolaroidGallery } from './components/PolaroidGallery';
import { MusicPlayer } from './components/MusicPlayer';
import { StudentCardModal } from './components/StudentCardModal';
import { DahibaraModal } from './components/DahibaraModal';
import { GradeSheetModal } from './components/GradeSheetModal';
import { TeaStallModal } from './components/TeaStallModal';
import { InteractiveItem } from './types';
import { soundSynth } from './utils/soundSynth';
import { Heart, Sparkles, Volume2 } from 'lucide-react';

export default function App() {
  const [isRainActive, setIsRainActive] = useState(false);
  const [activeItem, setActiveItem] = useState<InteractiveItem | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSelectItem = (item: InteractiveItem) => {
    setActiveItem(item);
    if (item.detailModal) {
      setActiveModal(item.detailModal);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 pb-32 overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* Background Animated Gradient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]"></div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <Header onRainToggle={setIsRainActive} isRainActive={isRainActive} />

        {/* Quote Ticker */}
        <QuoteTicker />

        {/* Central Illustrated Nostalgic Desk */}
        <NostalgicDesk onSelectItem={handleSelectItem} activeItem={activeItem} />

        {/* Interactive Keyboard Soundboard */}
        <KeyboardSoundboard />

        {/* Pinned Polaroid Memory Gallery */}
        <PolaroidGallery />

        {/* Footer Note */}
        <footer className="w-full max-w-4xl mx-auto text-center px-4 py-8 mt-10 border-t border-slate-900 text-xs text-slate-500 font-mono space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-300/80">
            <span>Made with nostalgic love for Bhubaneswar College Alumni</span>
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
          <p>Dahibara at Patia • Khoka Kulhad Chai • Auto Dada's 20 Taka • Hostel 3 AM Maggi</p>
          <p className="text-[10px] text-slate-600">
            Music Source: College Student BBSR YouTube Playlist (PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q)
          </p>
        </footer>

      </div>

      {/* Glassmorphism Bottom Music Player */}
      <MusicPlayer />

      {/* Detail Modals */}
      {activeModal === 'id_card' && (
        <StudentCardModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'dahibara' && (
        <DahibaraModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'grade_sheet' && (
        <GradeSheetModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'tea_stall' && (
        <TeaStallModal onClose={() => setActiveModal(null)} />
      )}

    </div>
  );
}
