import React, { useState, useRef, useEffect } from 'react';
import type { Song, PlaylistInfo } from '../../data/playlists';
import { AVAILABLE_PLAYLISTS, fetchPlaylistSongs, SAD_LOFI_SONG } from '../../data/playlists';
import './Programs.css';

/* --- Clean SVG Audio Control Icons (No Emojis) --- */
const PrevTrackIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="1" y="2" width="2" height="8" />
    <polygon points="10,2 4,6 10,10" />
  </svg>
);

const NextTrackIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <polygon points="2,2 8,6 2,10" />
    <rect x="9" y="2" width="2" height="8" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <polygon points="3,2 10,6 3,10" />
  </svg>
);

const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="2" y="2" width="3" height="8" />
    <rect x="7" y="2" width="3" height="8" />
  </svg>
);

const StopIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <rect x="1" y="1" width="8" height="8" />
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
    <path d="M1 2H5L6.5 4H13V11H1V2Z" fill="#E8B000" stroke="#000000" strokeWidth="0.8" />
  </svg>
);

const LoopIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M2 4h6a2 2 0 0 1 2 2v1" />
    <polyline points="1 2 2 4 4 3" fill="currentColor" />
    <path d="M10 8H4a2 2 0 0 1-2-2V5" />
    <polyline points="11 10 10 8 8 9" fill="currentColor" />
  </svg>
);

const VolumeIcon = ({ muted }: { muted: boolean }) => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
    <polygon points="1,4 4,4 7,1 7,11 4,8 1,8" />
    {!muted ? (
      <>
        <path d="M9 3.5a4 4 0 0 1 0 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M11 2a6.5 6.5 0 0 1 0 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ) : (
      <line x1="9" y1="3" x2="13" y2="9" stroke="#FF0000" strokeWidth="1.5" />
    )}
  </svg>
);

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

  // Pause music player when video player starts playing
  useEffect(() => {
    const handlePauseMusic = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('pause-music-player', handlePauseMusic);
    return () => {
      window.removeEventListener('pause-music-player', handlePauseMusic);
    };
  }, []);

  // Load songs when playlist changes and play first song instantly
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingSongs(true);

    fetchPlaylistSongs(selectedPlaylist).then((songs) => {
      if (!isCancelled) {
        const loaded = songs.length > 0 ? songs : [SAD_LOFI_SONG];
        setPlaylistSongs(loaded);
        setCurrentSongIndex(0);
        setIsLoadingSongs(false);

        // Instantly play first song in newly selected playlist
        const audio = audioRef.current;
        if (audio && loaded[0]) {
          window.dispatchEvent(new CustomEvent('pause-video-player'));
          audio.src = loaded[0].url;
          audio.load();
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [selectedPlaylist]);

  const currentSong: Song = playlistSongs[currentSongIndex] || SAD_LOFI_SONG;

  // Play immediately when currentSongIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.volume = isMuted ? 0 : volume;

    if (audio.src !== currentSong.url) {
      window.dispatchEvent(new CustomEvent('pause-video-player'));
      audio.src = currentSong.url;
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentSongIndex, isMuted, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(new CustomEvent('pause-video-player'));
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

        {/* Media Control Row (SVG Icons Only - No Emojis) */}
        <div className="media-controls-row">
          <button className="btn-retro media-ctrl-btn" onClick={handlePrev} title="Previous Track">
            <PrevTrackIcon />
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={handleStop} title="Stop">
            <StopIcon />
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={handleNext} title="Next Track">
            <NextTrackIcon />
          </button>

          {/* Playlist Selector Dropdown */}
          <div className="media-playlist-select-wrapper">
            <span className="playlist-icon-label"><FolderIcon /></span>
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
            <LoopIcon />
          </button>

          {/* Volume Group */}
          <div className="media-volume-group">
            <button
              className="volume-icon-btn"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              <VolumeIcon muted={isMuted || volume === 0} />
            </button>
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

          {/* Playlist Table (Fills 100% height - No bottom dead space) */}
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
                    onClick={() => {
                      setCurrentSongIndex(actualIndex);
                      const audio = audioRef.current;
                      if (audio) {
                        window.dispatchEvent(new CustomEvent('pause-video-player'));
                        audio.src = song.url;
                        audio.load();
                        audio.play().then(() => setIsPlaying(true)).catch(() => {});
                      }
                    }}
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
