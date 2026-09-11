import { Track } from '../types';
import { YOUTUBE_PLAYLIST_ID, YOUTUBE_PLAYLIST_URL, YOUTUBE_PLAYLIST_TRACKS } from '../data/playlistTracks';

export { YOUTUBE_PLAYLIST_ID, YOUTUBE_PLAYLIST_URL, YOUTUBE_PLAYLIST_TRACKS };

/**
 * YouTube Data API v3 response item interface
 */
interface YouTubePlaylistItem {
  snippet?: {
    title?: string;
    description?: string;
    resourceId?: {
      videoId?: string;
    };
    thumbnails?: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
    position?: number;
  };
  contentDetails?: {
    videoId?: string;
  };
}

/**
 * Clear old legacy tracks or stale cached data from previous versions
 */
export function purgeOldStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const legacyKeys = [
      'demo_tracks',
      'sample_tracks',
      'bbsr_custom_songs',
      'old_playlist_cache',
      'music_player_v1',
      'demo_songs'
    ];
    legacyKeys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

/**
 * Fetch tracks from YouTube Data API v3 if API key is provided,
 * otherwise safely returns the exact verified 51 tracks from playlist PLKj-_RSPUgrw.
 */
export async function loadPlaylistTracks(): Promise<{ tracks: Track[]; isLiveFromApi: boolean; error?: string }> {
  // Purge any stale legacy data
  purgeOldStorage();

  const meta = import.meta as unknown as { env?: Record<string, string> };
  const apiKey = meta.env?.VITE_YOUTUBE_API_KEY?.trim();

  // If user provided a YouTube API key in their environment
  if (apiKey) {
    try {
      const endpoint = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${YOUTUBE_PLAYLIST_ID}&key=${apiKey}`;
      const response = await fetch(endpoint);
      
      if (response.ok) {
        const data = await response.json();
        const items: YouTubePlaylistItem[] = data.items || [];
        
        if (items.length > 0) {
          const liveTracks: Track[] = items
            .map((item, idx): Track | null => {
              const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
              const title = item.snippet?.title || '';
              if (!videoId || title === 'Private video' || title === 'Deleted video') {
                return null;
              }

              const thumb = item.snippet?.thumbnails?.high?.url ||
                            item.snippet?.thumbnails?.medium?.url ||
                            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

              return {
                id: videoId,
                videoId: videoId,
                trackNumber: idx + 1,
                title: title.replace(/#\w+/g, '').trim(),
                rawTitle: title,
                artist: 'PLKj-_RSPUgrw Playlist',
                album: 'YouTube Playlist',
                duration: 315,
                durationFormatted: '5:15',
                coverImage: thumb,
                youtubeUrl: `https://www.youtube.com/watch?v=${videoId}&list=${YOUTUBE_PLAYLIST_ID}&index=${idx + 1}`
              };
            })
            .filter((t): t is Track => t !== null);

          if (liveTracks.length > 0) {
            return { tracks: liveTracks, isLiveFromApi: true };
          }
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        console.warn('YouTube API returned non-200, falling back to verified playlist:', errData);
      }
    } catch (err) {
      console.warn('Network error while querying YouTube API, using verified playlist:', err);
    }
  }

  // Exact 51 tracks from PLKj-_RSPUgrw
  return {
    tracks: YOUTUBE_PLAYLIST_TRACKS,
    isLiveFromApi: false
  };
}
