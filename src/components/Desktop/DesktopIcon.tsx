import { useState, useRef } from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const lastClickTimeRef = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // On touch screens or fast double-tap (< 400ms) or clicking already selected icon
    if (isTouch || (selected && now - lastClickTimeRef.current < 500)) {
      onDoubleClick();
      setSelected(false);
      return;
    }

    lastClickTimeRef.current = now;
    setSelected(true);
  };

  return (
    <button
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      onDoubleClick={onDoubleClick}
      onClick={handleClick}
      onBlur={() => setSelected(false)}
      aria-label={`Open ${label}`}
    >
      <div className="desktop-icon-img">{icon}</div>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}
