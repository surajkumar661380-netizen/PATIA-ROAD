import React, { useState, useMemo } from 'react';
import { 
  Music2, 
  Search, 
  Play, 
  Pause, 
  Heart, 
  Clock, 
  Shuffle, 
  CheckCircle2, 
  ExternalLink,
  SlidersHorizontal,
  Radio
} from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { soundSynth } from '../utils/soundSynth';

export const CampusPlaylistSection: React.FC = () => {
  const { 
    tracks, 
    currentTrackIdx, 
    isPlaying, 
    playTrack, 
    togglePlay, 
    favorites, 
    toggleFavorite,
    toggleShuffle,
    isLiveFromApi,
    playlistId,
    playlistUrl
  } = usePlaylist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterTabs = [
    { id: 'All', label: 'All Tracks' },
    { id: 'BusDriver', label: 'Commute & Roadtrip' },
    { id: 'Romantic', label: 'Romantic Melodies' },
    { id: '90sClassics', label: '90s Evergreen' },
    { id: 'Favorites', label: 'Favorites' }
  ];

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        track.title.toLowerCase().includes(q) ||
        (track.rawTitle && track.rawTitle.toLowerCase().includes(q)) ||
        track.artist.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Favorites') return favorites.includes(track.id);
      
      const fullText = `${track.title} ${track.rawTitle || ''}`.toLowerCase();
      if (selectedFilter === 'BusDriver') {
        return /bus driver|rickshaw|traffic|saloon|horn/i.test(fullText);
      }
      if (selectedFilter === 'Romantic') {
        return /pyar|pyaar|mohabbat|dil|aashiqui|kasam|chunnariya|chand|dhadkan|zindagi|chupke/i.test(fullText);
      }
      if (selectedFilter === '90sClassics') {
        return /90|kumar sanu|alka yagnik|udit narayan|anuradha|divya bharti|saajan|deewana|aashiqui|rang/i.test(fullText);
      }

      return true;
    });
  }, [tracks, searchQuery, selectedFilter, favorites]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayAll = () => {
    soundSynth.playTapeClick();
    if (filteredTracks.length > 0) {
      const originalIdx = tracks.findIndex(t => t.id === filteredTracks[0].id);
      playTrack(originalIdx !== -1 ? originalIdx : 0);
    }
  };

  const handleShuffleAll = () => {
    soundSynth.playTapeClick();
    toggleShuffle();
    if (filteredTracks.length > 0) {
      const randomIdx = Math.floor(Math.random() * filteredTracks.length);
      const originalIdx = tracks.findIndex(t => t.id === filteredTracks[randomIdx].id);
      playTrack(originalIdx !== -1 ? originalIdx : 0);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 my-10 z-10" id="playlist-view">
      
      {/* Main Colorful Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-950/90 border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.08)] backdrop-blur-xl overflow-hidden">
        
        {/* Playlist Hero Header */}
        <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-800 bg-gradient-to-r from-amber-950/30 via-slate-900/50 to-violet-950/30">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 lg:gap-8">
            
            {/* Playlist Artwork Card */}
            <div className="relative group shrink-0">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <img
                  src={tracks[0]?.coverImage || 'https://i.ytimg.com/vi/YnYHfIRjhGE/hqdefault.jpg'}
                  alt="YouTube Playlist Artwork"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-slate-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold shadow-sm">
                    YouTube
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                    <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span className="font-bold text-[10px]">PLKj-_RSPUgrw</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  YouTube Synced
                </span>
                <span className="text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40">
                  ID: {playlistId}
                </span>
                {isLiveFromApi && (
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40 animate-pulse">
                    ● Live Feed
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-['Playfair_Display',serif] bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300 bg-clip-text text-transparent">
                90s Bollywood & Campus Hits
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Campus evening soundtrack and late-night tape audio. Sourced directly from YouTube Playlist <strong className="text-amber-400 font-mono">PLKj-_RSPUgrw</strong> with exact original track sequence.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-xs text-slate-400 font-normal">
                <span className="text-amber-400 font-bold">{tracks.length} Tracks</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Continuous Playback</span>
                <span>•</span>
                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 underline font-medium transition"
                  title="Open source playlist on YouTube"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open on YouTube
                </a>
              </div>

              {/* Colorful Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={handlePlayAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-bold text-xs sm:text-sm transition-transform active:scale-95 cursor-pointer shadow-lg shadow-amber-500/25"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Play All (1 to {tracks.length})
                </button>
                <button
                  onClick={handleShuffleAll}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm border border-violet-400/40 shadow-md shadow-violet-500/20 transition-transform active:scale-95 cursor-pointer"
                >
                  <Shuffle className="w-4 h-4 text-violet-200" />
                  Shuffle Play
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Toolbar: Search & Colorful Filter Tabs */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/40 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, movies, artists..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Track count */}
            <div className="text-xs text-slate-400 font-mono">
              Showing <strong className="text-amber-400 font-bold">{filteredTracks.length}</strong> of {tracks.length} tracks
            </div>

          </div>

          {/* Vibrant Segmented Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400 shrink-0 mr-1" />
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              
              // Color schemes per tab
              let activeColor = 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold shadow-md shadow-amber-500/20';
              if (tab.id === 'BusDriver') activeColor = 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20';
              if (tab.id === 'Romantic') activeColor = 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-md shadow-rose-500/20';
              if (tab.id === '90sClassics') activeColor = 'bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-md shadow-violet-500/20';
              if (tab.id === 'Favorites') activeColor = 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-md shadow-pink-500/20';

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundSynth.playTapeClick();
                    setSelectedFilter(tab.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer whitespace-nowrap font-medium ${
                    isActive
                      ? activeColor
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/80'
                  }`}
                >
                  {tab.id === 'Favorites' ? `Favorites (${favorites.length})` : tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Track List */}
        <div className="p-2 sm:p-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[580px]">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-12 text-center">#</th>
                  <th className="py-2.5 px-3">Title & Artist</th>
                  <th className="py-2.5 px-3 hidden md:table-cell">Source Tag</th>
                  <th className="py-2.5 px-3 text-center w-20">
                    <Clock className="w-3.5 h-3.5 inline-block text-slate-400" />
                  </th>
                  <th className="py-2.5 px-2 text-center w-12">Fav</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-850 text-sm">
                {filteredTracks.map((track) => {
                  const originalIdx = tracks.findIndex((t) => t.id === track.id);
                  const isCurrent = currentTrackIdx === originalIdx;
                  const isCurrentPlaying = isCurrent && isPlaying;
                  const isFav = favorites.includes(track.id);

                  return (
                    <tr
                      key={track.id}
                      onClick={() => playTrack(originalIdx)}
                      className={`group transition cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-500/20 via-rose-500/10 to-transparent text-amber-200 border-l-4 border-l-amber-400'
                          : 'text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {/* Track # / Equalizer */}
                      <td className="py-3 px-3 text-center font-mono text-xs">
                        {isCurrentPlaying ? (
                          <div className="flex items-end justify-center gap-0.5 h-4 w-4 mx-auto">
                            <span className="w-1 bg-gradient-to-t from-amber-400 to-rose-400 rounded-full h-full animate-bounce"></span>
                            <span className="w-1 bg-gradient-to-t from-rose-400 to-pink-400 rounded-full h-2/3 animate-pulse"></span>
                            <span className="w-1 bg-gradient-to-t from-pink-400 to-amber-400 rounded-full h-4/5 animate-bounce"></span>
                          </div>
                        ) : (
                          <div className="relative flex items-center justify-center">
                            <span className="group-hover:hidden text-slate-400 font-medium">{track.trackNumber || originalIdx + 1}</span>
                            <Play className="w-3.5 h-3.5 text-amber-400 hidden group-hover:block fill-current" />
                          </div>
                        )}
                      </td>

                      {/* Cover & Title */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-8 sm:w-12 sm:h-9 rounded-md overflow-hidden shrink-0 border border-slate-700 bg-slate-900 shadow-sm">
                            <img
                              src={track.coverImage}
                              alt={track.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className={`text-xs sm:text-sm line-clamp-1 ${isCurrent ? 'text-amber-300 font-bold' : 'text-slate-100 group-hover:text-amber-300'}`}>
                              {track.title}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate mt-0.5">
                              {track.artist !== 'PLKj-_RSPUgrw Playlist' ? track.artist : 'Track #' + (track.trackNumber || originalIdx + 1)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Source Tag */}
                      <td className="py-3 px-3 hidden md:table-cell text-xs text-slate-400 truncate max-w-[180px]">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-cyan-300 border border-cyan-500/30 font-semibold">
                          #{track.trackNumber || originalIdx + 1}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="py-3 px-3 text-center font-mono text-xs text-slate-300">
                        {track.durationFormatted || formatDuration(track.duration)}
                      </td>

                      {/* Favorite Button */}
                      <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            soundSynth.playTapeClick();
                            toggleFavorite(track.id);
                          }}
                          className={`p-1.5 rounded-lg transition cursor-pointer hover:bg-slate-800 ${
                            isFav ? 'text-rose-400 scale-110' : 'text-slate-500 hover:text-rose-400'
                          }`}
                          title={isFav ? 'Remove favorite' : 'Add favorite'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredTracks.length === 0 && (
              <div className="text-center py-12 text-zinc-500 space-y-2">
                <Music2 className="w-8 h-8 mx-auto text-zinc-600" />
                <p className="text-sm">No songs match your filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('All');
                  }}
                  className="text-xs text-zinc-300 underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </section>
  );
};
