import { useState, useRef, useEffect } from 'react';
import './Programs.css';

interface Track {
  title: string;
  artist: string;
  src: string;
  duration: string;
}

const PLAYLIST: Track[] = [
  {
    title: 'SadLofi.m4a',
    artist: 'Chill Lo-Fi Vibes',
    src: './audio/SadLofi.m4a',
    duration: '3:45',
  },
];

export default function MediaPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Auto-play on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser autoplay policy might need explicit user interaction
      setIsPlaying(false);
    });
  }, [currentTrackIndex]);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="program-content media-player-container">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item"><u>P</u>lay</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      <div className="media-player-body">
        {/* Visualizer Display Screen */}
        <div className="media-screen">
          <div className="media-screen-header">
            <span className="media-track-title">{currentTrack.title}</span>
            <span className="media-track-artist">{currentTrack.artist}</span>
          </div>

          {/* Animated Visualizer Bars */}
          <div className="media-visualizer">
            {[40, 75, 55, 90, 65, 30, 85, 95, 60, 45, 80, 50, 70, 90, 35, 60].map((h, i) => (
              <div
                key={i}
                className={`viz-bar ${isPlaying ? 'playing' : ''}`}
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (0.6 + Math.sin(i + currentTime * 3) * 0.4)))}%` : '8%',
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>

          {/* Time Display */}
          <div className="media-time-readout">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration || 225)}</span>
          </div>
        </div>

        {/* Seek Bar */}
        <div className="media-seek-bar-container">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="media-range-slider"
          />
        </div>

        {/* Player Controls Bar */}
        <div className="media-controls-row">
          <button className="btn-retro media-ctrl-btn" onClick={togglePlay}>
            {isPlaying ? '❚❚ Pause' : '▶ Play'}
          </button>
          <button className="btn-retro media-ctrl-btn" onClick={handleStop}>
            ■ Stop
          </button>

          {/* Volume Slider */}
          <div className="media-volume-group">
            <span className="volume-icon">&#x1F50A;</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolumeChange}
              className="media-volume-slider"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>

        {/* Playlist Grid */}
        <div className="media-playlist-frame">
          <div className="playlist-header">Current Playlist (1 item)</div>
          <div className="playlist-list">
            {PLAYLIST.map((item, idx) => (
              <div
                key={idx}
                className={`playlist-row ${idx === currentTrackIndex ? 'active' : ''}`}
                onClick={() => setCurrentTrackIndex(idx)}
              >
                <span className="playlist-row-num">1.</span>
                <span className="playlist-row-name">{item.title}</span>
                <span className="playlist-row-dur">{item.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">
          {isPlaying ? 'Playing: SadLofi.m4a' : 'Stopped'}
        </span>
        <span className="status-cell">Stereo 44.1kHz</span>
      </div>
    </div>
  );
}
