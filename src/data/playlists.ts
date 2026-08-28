export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year?: string;
  duration: number; // in seconds
  image?: string;
  url: string;
  lyrics_snippet?: string;
}

export interface PlaylistInfo {
  id: string;
  name: string;
  filename: string;
  count?: number;
}

export const AVAILABLE_PLAYLISTS: PlaylistInfo[] = [
  { id: 'sadlofi', name: 'Chill Lo-Fi (SadLofi.m4a)', filename: '' },
  { id: '90s-dance', name: '90s Dance Dhamaaka', filename: '90s Dance Dhamaaka.json' },
  { id: '90s-romance', name: '90s Romance - Hindi', filename: '90s Romance - Hindi.json' },
  { id: 'best-90s', name: 'Best Of 90s - Hindi', filename: 'Best Of 90s - Hindi.json' },
  { id: 'decade-heroes', name: 'Decade Of Heroes - 1990s', filename: 'Decade Of Heroes - 1990s.json' },
  { id: 'decade-heroines', name: 'Decade Of Heroines - 1990s', filename: 'Decade Of Heroines - 1990s.json' },
  { id: 'delhi-hot-50', name: 'Delhi Hot 50', filename: 'Delhi Hot 50.json' },
  { id: 'hindi-1970s', name: 'Hindi 1970s', filename: 'Hindi 1970s.json' },
  { id: 'hindi-1980s', name: 'Hindi 1980s', filename: 'Hindi 1980s.json' },
  { id: 'hindi-1990s', name: 'Hindi 1990s', filename: 'Hindi 1990s.json' },
  { id: 'hindi-2000s', name: 'Hindi 2000s', filename: 'Hindi 2000s.json' },
];

export const SAD_LOFI_SONG: Song = {
  id: 'sadlofi-track',
  title: 'SadLofi.m4a',
  artist: 'Chill Lo-Fi Vibes',
  album: 'Home Desktop Audio',
  year: '2026',
  duration: 225,
  image: './files/lockscreen.png',
  url: './audio/SadLofi.m4a',
};

// Cache for loaded playlists
const playlistCache = new Map<string, Song[]>();
playlistCache.set('sadlofi', [SAD_LOFI_SONG]);

export async function fetchPlaylistSongs(playlist: PlaylistInfo): Promise<Song[]> {
  if (playlist.id === 'sadlofi') {
    return [SAD_LOFI_SONG];
  }

  if (playlistCache.has(playlist.id)) {
    return playlistCache.get(playlist.id)!;
  }

  try {
    const encodedFilename = encodeURIComponent(playlist.filename);
    const res = await fetch(`./playlist/${encodedFilename}`);
    if (!res.ok) {
      // Fallback try root relative
      const resFallback = await fetch(`playlist/${encodedFilename}`);
      if (!resFallback.ok) throw new Error('Failed to load playlist');
      const data = await resFallback.json();
      return parseSongs(data, playlist.id);
    }
    const data = await res.json();
    return parseSongs(data, playlist.id);
  } catch (err) {
    console.error('Error fetching playlist:', err);
    return [SAD_LOFI_SONG];
  }
}

function parseSongs(data: Record<string, any>, playlistId: string): Song[] {
  const songs: Song[] = [];
  for (const key of Object.keys(data)) {
    const item = data[key];
    if (item && item.title && item.url) {
      const durationNum = parseInt(item.duration, 10) || 240;
      songs.push({
        id: item.id || key,
        title: decodeHtml(item.title),
        artist: decodeHtml(item.artist || item.album_artist || 'Various Artists'),
        album: decodeHtml(item.album || 'Unknown Album'),
        year: item.year || '',
        duration: durationNum,
        image: item.image || '',
        url: item.url,
        lyrics_snippet: item.lyrics_snippet || '',
      });
    }
  }
  playlistCache.set(playlistId, songs);
  return songs;
}

function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
