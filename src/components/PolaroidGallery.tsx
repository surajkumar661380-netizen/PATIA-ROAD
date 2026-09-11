import React, { useState, useEffect } from 'react';
import { POLAROID_MEMORIES } from '../data/bbsrData';
import { MemoryPolaroid } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { Heart, Plus, MapPin, Calendar, Sparkles } from 'lucide-react';

export const PolaroidGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPolaroid[]>(() => {
    try {
      const saved = localStorage.getItem('bbsr_memories');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return POLAROID_MEMORIES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Patia Square');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<'Food' | 'Hostel' | 'Fest' | 'Commute' | 'Exam'>('Food');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('bbsr_memories', JSON.stringify(memories));
    } catch {
      // ignore
    }
  }, [memories]);

  const categories = ['All', 'Food', 'Hostel', 'Fest', 'Commute'];

  const filteredMemories = memories.filter((m) =>
    activeCategory === 'All' ? true : m.category === activeCategory
  );

  const handleLike = (id: string) => {
    soundSynth.playChaiClink();
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !caption) return;

    soundSynth.playTapeClick();
    const newMemory: MemoryPolaroid = {
      id: 'custom_' + Date.now(),
      title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      location: location || 'Bhubaneswar',
      caption,
      image: imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      category,
      likes: 1
    };

    setMemories([newMemory, ...memories]);
    setTitle('');
    setCaption('');
    setImageUrl('');
    setIsModalOpen(false);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 my-10 z-10">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300 bg-clip-text text-transparent font-['Playfair_Display',serif] flex items-center gap-2">
            <span>Campus Snapshots & Memory Wall</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Snapshots of Dahibara stops, rainy lectures, late-night hostel maggi, and campus evenings.
          </p>
        </div>

        {/* Filter Pills + Add Memory Button */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            let activeColor = 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold shadow-md shadow-amber-500/20';
            if (cat === 'Food') activeColor = 'bg-gradient-to-r from-orange-400 to-amber-400 text-slate-950 font-bold shadow-md shadow-orange-500/20';
            if (cat === 'Hostel') activeColor = 'bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-md shadow-violet-500/20';
            if (cat === 'Fest') activeColor = 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-bold shadow-md shadow-fuchsia-500/20';
            if (cat === 'Commute') activeColor = 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20';

            return (
              <button
                key={cat}
                onClick={() => {
                  soundSynth.playTapeClick();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer font-medium ${
                  isActive
                    ? activeColor
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}

          <button
            onClick={() => {
              soundSynth.playTapeClick();
              setIsModalOpen(true);
            }}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 shadow-md shadow-rose-500/20 transition flex items-center gap-1.5 cursor-pointer ml-1 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredMemories.map((item) => {
          let badgeColor = 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
          if (item.category === 'Food') badgeColor = 'bg-amber-950/80 text-amber-300 border-amber-500/40';
          if (item.category === 'Hostel') badgeColor = 'bg-purple-950/80 text-purple-300 border-purple-500/40';
          if (item.category === 'Fest') badgeColor = 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-500/40';
          if (item.category === 'Commute') badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';

          return (
            <div
              key={item.id}
              className="group relative bg-gradient-to-b from-slate-900/95 to-slate-950/95 text-slate-100 p-4 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1.5 border border-slate-800 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] rounded-xl bg-slate-950 overflow-hidden mb-3.5 border border-slate-700/80 shadow-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border backdrop-blur-md shadow-sm ${badgeColor}`}>
                  {item.category}
                </span>
              </div>

              {/* Polaroid Content */}
              <div className="px-1">
                <div className="flex items-center justify-between text-xs text-slate-400 font-sans mb-1.5 font-medium">
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-100 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed italic">
                  "{item.caption}"
                </p>

                {/* Like Button & Footer */}
                <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-cyan-400/80">
                    #{item.id.slice(-4)}
                  </span>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/70 px-3 py-1 rounded-full transition cursor-pointer border border-rose-500/40 active:scale-110 shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500 animate-pulse" />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to Add Memory */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 p-6 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300 bg-clip-text text-transparent font-['Playfair_Display',serif] mb-1">
              Add Campus Memory
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Share a memory from KIIT, ITER, OUTR, Utkal, Patia, or around campus.
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-200 mb-1 font-semibold">Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Late Night Assignment at Hostels"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-200 mb-1 font-semibold">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Patia Square"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 mb-1 font-semibold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 shadow-inner"
                  >
                    <option value="Food">Food</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Fest">Fest</option>
                    <option value="Commute">Commute</option>
                    <option value="Exam">Exam</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-200 mb-1 font-semibold">Caption / Note</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write a memory note..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                />
              </div>

              <div>
                <label className="block text-slate-200 mb-1 font-semibold">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold hover:from-amber-300 hover:to-rose-400 transition cursor-pointer shadow-md shadow-rose-500/20"
                >
                  Pin Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
