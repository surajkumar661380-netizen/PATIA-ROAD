import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuoteTicker } from './components/QuoteTicker';
import { NostalgicDesk } from './components/NostalgicDesk';
import { CampusPlaylistSection } from './components/CampusPlaylistSection';
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
import { PlaylistProvider } from './context/PlaylistContext';

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
    <PlaylistProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 pb-32 overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 font-['Outfit',sans-serif]">
        
        {/* Vibrant Multi-Color Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[550px] bg-amber-500/15 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute top-1/4 right-10 w-[550px] h-[500px] bg-rose-600/15 rounded-full blur-[150px]"></div>
          <div className="absolute top-2/3 left-10 w-[600px] h-[550px] bg-cyan-600/15 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[450px] bg-violet-600/15 rounded-full blur-[150px]"></div>
        </div>

        {/* Main Content Overlay */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Header */}
          <Header onRainToggle={setIsRainActive} isRainActive={isRainActive} />

          {/* Quote Ticker */}
          <QuoteTicker />

          {/* Central Illustrated Nostalgic Desk */}
          <NostalgicDesk onSelectItem={handleSelectItem} activeItem={activeItem} />

          {/* Dedicated In-App Campus Song Playlist Section */}
          <CampusPlaylistSection />

          {/* Interactive Keyboard Soundboard */}
          <KeyboardSoundboard />

          {/* Pinned Polaroid Memory Gallery */}
          <PolaroidGallery />

          {/* Footer Note */}
          <footer className="w-full max-w-4xl mx-auto text-center px-4 py-8 mt-10 border-t border-zinc-850 text-xs text-zinc-500 font-mono space-y-2">
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <span>Bhubaneswar College Memory Archive</span>
              <Heart className="w-3.5 h-3.5 fill-zinc-400 text-zinc-400" />
            </div>
            <p className="text-zinc-500">Patia Square • Khoka Chai • 20 Taka Auto • Room 304 Jams</p>
            <p className="text-[10px] text-zinc-600">
              Campus Song Playlist (PLKj-_RSPUgrw) • Minimalist Audio Deck
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
    </PlaylistProvider>
  );
}
