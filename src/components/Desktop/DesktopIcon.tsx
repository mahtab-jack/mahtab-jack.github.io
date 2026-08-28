import React, { memo } from 'react';
import { ProgramIcon } from '../Icons/ProgramIcon';
import './DesktopIcon.css';

interface DesktopIconProps {
  iconId: string;
  label: string;
  onClick: () => void;
  isSelected?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = memo(({
  iconId,
  label,
  onClick,
  isSelected = false,
}) => {
  return (
    <button
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      aria-label={`Open ${label}`}
    >
      <div className="desktop-icon-img">
        <ProgramIcon iconId={iconId} size={48} />
      </div>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
});

export default DesktopIcon;
