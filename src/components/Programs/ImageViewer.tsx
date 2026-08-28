import { useState } from 'react';
import { PHOTOS_LIST } from './PhotosFolder';
import './Programs.css';

interface ImageViewerProps {
  initialPhotoId?: string;
  initialSrc?: string;
  initialTitle?: string;
}

export default function ImageViewer({
  initialPhotoId,
  initialSrc,
  initialTitle,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialPhotoId) {
      const idx = PHOTOS_LIST.findIndex(p => p.id === initialPhotoId);
      if (idx !== -1) return idx;
    }
    if (initialSrc) {
      const idx = PHOTOS_LIST.findIndex(p => p.src === initialSrc);
      if (idx !== -1) return idx;
    }
    return 0;
  });

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const currentPhoto = PHOTOS_LIST[currentIndex] || {
    name: initialTitle || 'Image.jpg',
    src: initialSrc || './photos/photo_2026-08-28_19-01-13.jpg',
    size: '300 KB',
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS_LIST.length);
    setRotation(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTOS_LIST.length) % PHOTOS_LIST.length);
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="program-content image-viewer-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item"><u>E</u>dit</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      {/* Main Image Stage */}
      <div className="image-viewer-viewport">
        <img
          src={currentPhoto.src}
          alt={currentPhoto.name}
          className="image-viewer-img"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
        />
      </div>

      {/* Toolbar Controls */}
      <div className="image-viewer-toolbar">
        <button className="btn-retro" onClick={handlePrev} title="Previous Image">
          &larr; Prev
        </button>
        <button className="btn-retro" onClick={handleNext} title="Next Image">
          Next &rarr;
        </button>
        <div className="toolbar-sep" />
        <button className="btn-retro" onClick={handleZoomIn} title="Zoom In">
          &#x1F50D; +
        </button>
        <button className="btn-retro" onClick={handleZoomOut} title="Zoom Out">
          &#x1F50D; -
        </button>
        <button className="btn-retro" onClick={handleResetZoom} title="Reset Zoom">
          100%
        </button>
        <button className="btn-retro" onClick={handleRotate} title="Rotate 90°">
          &#x21BB; Rotate
        </button>
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">{currentPhoto.name}</span>
        <span className="status-cell">{currentIndex + 1} of {PHOTOS_LIST.length}</span>
        <span className="status-cell">{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
}
