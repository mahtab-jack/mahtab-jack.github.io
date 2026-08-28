import React, { useRef, useState, useEffect } from 'react';
import './Programs.css';

interface VideoPlayerProps {
  videoSrc?: string;
  videoTitle?: string;
}

export default function VideoPlayer({
  videoSrc = './sample-video/Wildlife Windows 7 Sample Video.mp4',
  videoTitle = 'Wildlife Windows 7 Sample Video.mp4',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // When video player mounts or plays, pause music player automatically
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('pause-music-player'));

    const handlePauseVideo = () => {
      const v = videoRef.current;
      if (v) {
        v.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('pause-video-player', handlePauseVideo);
    return () => {
      window.removeEventListener('pause-video-player', handlePauseVideo);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(new CustomEvent('pause-music-player'));
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handlePlay = () => {
    window.dispatchEvent(new CustomEvent('pause-music-player'));
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return '00:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="program-content video-player-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>P</u>lay</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      <div className="video-viewport-frame">
        <video
          ref={videoRef}
          src={videoSrc}
          className="win-video-element"
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          controls={false}
          autoPlay
          loop
          playsInline
        />
      </div>

      {/* Video Control Bar */}
      <div className="video-controls-bar">
        <button className="btn-retro" style={{ padding: '2px 8px' }} onClick={togglePlay}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="media-range-slider flex-1"
        />
        <span className="video-time-text">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button className="btn-retro" style={{ padding: '2px 6px' }} onClick={handleFullscreen} title="Fullscreen">
          &#x26F6;
        </button>
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">{videoTitle} (Looping)</span>
        <span className="status-cell">{isPlaying ? 'Playing' : 'Paused'}</span>
      </div>
    </div>
  );
}
