import { useState, useRef, useEffect } from 'react';
import type { Song, PlaylistInfo } from '../../data/playlists';
import { AVAILABLE_PLAYLISTS, fetchPlaylistSongs, SAD_LOFI_SONG } from '../../data/playlists';
import './Programs.css';

export default function MediaPlayer() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistInfo>(AVAILABLE_PLAYLISTS[0]);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>([SAD_LOFI_SONG]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLooping, setIsLooping] = useState(false);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load songs when playlist changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingSongs(true);
    fetchPlaylistSongs(selectedPlaylist).then((songs) => {
      if (!isCancelled) {
        setPlaylistSongs(songs.length > 0 ? songs : [SAD_LOFI_SONG]);
        setCurrentSongIndex(0);
        setIsLoadingSongs(false);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [selectedPlaylist]);

  const currentSong: Song = playlistSongs[currentSongIndex] || SAD_LOFI_SONG;

  // Auto-play when current song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [currentSongIndex, selectedPlaylist, isMuted, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleNext = () => {
    if (playlistSongs.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % playlistSongs.length);
  };

  const handlePrev = () => {
    if (playlistSongs.length === 0) return;
    setCurrentSongIndex((prev) => (prev - 1 + playlistSongs.length) % playlistSongs.length);
  };

  const handleSongEnd = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || currentSong.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
      setCurrentTime(seekTo);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter songs based on search query
  const filteredSongs = playlistSongs.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="program-content media-player-container">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item" onClick={togglePlay}><u>P</u>lay</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      <div className="media-player-body">
        {/* Visualizer Display Screen */}
        <div className="media-screen">
          <div className="media-screen-layout">
            {/* Album Cover Art Thumbnail */}
            {currentSong.image ? (
              <div className="media-art-frame">
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="media-art-img"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            ) : null}

            <div className="media-screen-header flex-1">
              <span className="media-track-title">{currentSong.title}</span>
              <span className="media-track-artist">
                {currentSong.artist} {currentSong.year ? `(${currentSong.year})` : ''}
              </span>
              <span className="media-track-album">{currentSong.album}</span>
            </div>
          </div>

          {/* Animated Visualizer Bars */}
          <div className="media-visualizer">
            {[45, 80, 60, 95, 70, 35, 90, 100, 65, 50, 85, 55, 75, 95, 40, 65, 80, 50, 70, 90].map((h, i) => (
              <div
                key={i}
                className={`viz-bar ${isPlaying ? 'playing' : ''}`}
                style={{
                  height: isPlaying ? `${Math.max(12, h * (0.5 + Math.sin(i * 1.5 + currentTime * 4) * 0.5))}%` : '8%',
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Time & Format Display */}
          <div className="media-time-readout">
            <span className="media-format-badge">MP3/AAC</span>
            <span>
              {formatTime(currentTime)} / {formatTime(duration || currentSong.duration || 225)}
            </span>
          </div>
        </div>

        {/* Seek Bar */}
        <div className="media-seek-bar-container">
          <input
            type="range"
            min={0}
            max={duration || currentSong.duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="media-range-slider"
          />
        </div>

        {/* Media Control Row (Prev, Play, Stop, Next, Playlist Dropdown, Volume) */}
        <div className="media-controls-row">
          <button className="btn-retro media-ctrl-btn" onClick={handlePrev} title="Previous Track">
            ⏮
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={handleStop} title="Stop">
            ■
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={handleNext} title="Next Track">
            ⏭
          </button>

          {/* Playlist Selector Dropdown */}
          <div className="media-playlist-select-wrapper">
            <span className="playlist-label">&#x1F4C2;</span>
            <select
              className="media-playlist-select"
              value={selectedPlaylist.id}
              onChange={(e) => {
                const found = AVAILABLE_PLAYLISTS.find((p) => p.id === e.target.value);
                if (found) setSelectedPlaylist(found);
              }}
              title="Switch Playlist"
            >
              {AVAILABLE_PLAYLISTS.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  {pl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Loop button */}
          <button
            className={`btn-retro ${isLooping ? 'accent' : ''}`}
            style={{ padding: '3px 6px' }}
            onClick={() => setIsLooping(!isLooping)}
            title="Loop Track"
          >
            &#x1F501;
          </button>

          {/* Volume Group */}
          <div className="media-volume-group">
            <span
              className="volume-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? '🔇' : '🔊'}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="media-volume-slider"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>

        {/* Playlist Header & Search Filter */}
        <div className="media-playlist-frame">
          <div className="playlist-header-row">
            <span className="playlist-header-title">
              {selectedPlaylist.name} ({playlistSongs.length} songs)
            </span>
            <input
              type="text"
              placeholder="Search song or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="playlist-search-input"
            />
          </div>

          {/* Playlist Table */}
          <div className="playlist-list">
            {isLoadingSongs ? (
              <div className="loading-box">Loading playlist...</div>
            ) : filteredSongs.length === 0 ? (
              <div className="loading-box">No songs match '{searchQuery}'</div>
            ) : (
              filteredSongs.map((song, idx) => {
                const actualIndex = playlistSongs.findIndex((s) => s.id === song.id);
                const isCurrent = actualIndex === currentSongIndex;
                return (
                  <div
                    key={song.id + idx}
                    className={`playlist-row ${isCurrent ? 'active' : ''}`}
                    onClick={() => setCurrentSongIndex(actualIndex)}
                  >
                    <span className="playlist-row-num">{actualIndex + 1}.</span>
                    <span className="playlist-row-name" title={`${song.title} - ${song.artist}`}>
                      {song.title}
                    </span>
                    <span className="playlist-row-artist">{song.artist}</span>
                    <span className="playlist-row-dur">{formatTime(song.duration)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">
          {isPlaying ? `Playing: ${currentSong.title} - ${currentSong.artist}` : `Paused: ${currentSong.title}`}
        </span>
        <span className="status-cell">{selectedPlaylist.name}</span>
        <span className="status-cell">Stereo 44.1kHz</span>
      </div>
    </div>
  );
}
