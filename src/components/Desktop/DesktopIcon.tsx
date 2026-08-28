import { useState } from 'react';
import { ProgramIcon } from '../Icons/ProgramIcon';
import './DesktopIcon.css';

interface DesktopIconProps {
  iconId: string;
  label: string;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export default function DesktopIcon({
  iconId,
  label,
  onClick,
  onContextMenu,
}: DesktopIconProps) {
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(true);
    onClick();
    setTimeout(() => setActive(false), 200);
  };

  return (
    <button
      className={`desktop-icon ${active ? 'selected' : ''}`}
      onClick={handleClick}
      onContextMenu={onContextMenu}
      aria-label={`Open ${label}`}
    >
      <div className="desktop-icon-img">
        <ProgramIcon iconId={iconId} size={36} />
      </div>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}
