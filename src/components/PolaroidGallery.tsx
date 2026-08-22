import React, { useState, useEffect } from 'react';
import { POLAROID_MEMORIES } from '../data/bbsrData';
import { MemoryPolaroid } from '../types';
import { soundSynth } from '../utils/soundSynth';
import { Heart, Plus, MapPin, Calendar, Sparkles, Image as ImageIcon, Check } from 'lucide-react';

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
    setIsModalOpen(false);
    setTitle('');
    setCaption('');
    setImageUrl('');
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 my-10 z-10">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-200 font-['Playfair_Display',serif] flex items-center gap-2">
            <span>MEMORIES PINNED ON THE WALL</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Snapshots of Dahibara stops, rainy lectures, late-night hostel maggi, and fest nights.
          </p>
        </div>

        {/* Filter Pills + Add Memory Button */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundSynth.playTapeClick();
                setActiveCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => {
              soundSynth.playTapeClick();
              setIsModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer ml-1"
          >
            <Plus className="w-4 h-4" />
            <span>Pin Your Memory</span>
          </button>
        </div>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMemories.map((item, idx) => (
          <div
            key={item.id}
            className={`group relative bg-amber-50/95 text-slate-900 p-4 pt-5 pb-6 rounded-sm shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:z-20 border border-amber-200/50 ${
              idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
            }`}
          >
            {/* Top Red Pin Clip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-md border-2 border-amber-100 flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
            </div>

            {/* Photo Container */}
            <div className="relative aspect-[4/3] rounded bg-slate-950 overflow-hidden mb-3 border border-slate-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-amber-300 font-mono text-[10px]">
                {item.category}
              </span>
            </div>

            {/* Polaroid Content / Handwritten Caption */}
            <div className="px-1">
              <div className="flex items-center justify-between text-xs text-slate-600 font-sans mb-1 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-700" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 font-['Playfair_Display',serif]">
                {item.title}
              </h3>

              <p className="mt-1 text-base text-slate-800 font-['Caveat',cursive] leading-snug">
                "{item.caption}"
              </p>

              {/* Like Button & Footer */}
              <div className="mt-3 pt-2 border-t border-amber-200/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  BBSR Memory #{item.id.slice(-4)}
                </span>

                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 px-2.5 py-1 rounded-full transition cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Add Memory */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-amber-200 font-['Playfair_Display',serif] mb-1">
              Pin Your BBSR College Memory
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Share a favorite memory from KIIT, ITER, OUTR, Utkal, Patia, or Master Canteen!
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Late Night Assignment at Hostels"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Patia Square / Ghatikia"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
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
                <label className="block text-slate-300 mb-1 font-medium">Caption / Note</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write a handwritten memory note..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-['Caveat',cursive] text-base"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition cursor-pointer"
                >
                  Pin to Memory Wall
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
