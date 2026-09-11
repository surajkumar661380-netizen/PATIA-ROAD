export interface Track {
  id: string;
  videoId: string;
  trackNumber: number;
  title: string;
  songName?: string;
  rawTitle?: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  durationFormatted?: string;
  youtubeUrl: string;
  coverImage: string;
  category?: 'Evergreen' | 'Romantic' | 'Nostalgic' | 'Melodic' | 'Acoustic' | 'Retro' | string;
  vibe?: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  location: string;
  time: string;
  tag: string;
}

export interface MemoryPolaroid {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  image: string;
  category: 'Food' | 'Hostel' | 'Fest' | 'Commute' | 'Exam';
  likes: number;
}

export interface InteractiveItem {
  id: string;
  name: string;
  label: string;
  soundKey: string;
  description: string;
  iconName: string;
  detailModal?: 'id_card' | 'grade_sheet' | 'bus_ticket' | 'tea_stall' | 'dahibara';
}

export interface StudentInfo {
  name: string;
  rollNo: string;
  college: string;
  branch: string;
  batch: string;
  favoriteSpot: string;
  favoriteFood: string;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}
