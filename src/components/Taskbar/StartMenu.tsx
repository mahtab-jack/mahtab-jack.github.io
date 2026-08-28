import { useEffect, useRef } from 'react';
import { PROGRAMS } from '../../types';
import type { ProgramDefinition } from '../../types';
import './StartMenu.css';

interface StartMenuProps {
  onOpenProgram: (program: ProgramDefinition) => void;
  onClose: () => void;
}

export default function StartMenu({ onOpenProgram, onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const startBtn = document.querySelector('.taskbar-start-btn');
        if (startBtn && startBtn.contains(e.target as Node)) return;
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="start-menu" ref={menuRef}>
      {/* Side banner */}
      <div className="start-menu-banner">
        <span className="banner-text">Mahtab<strong>95</strong></span>
      </div>

      {/* Program list */}
      <div className="start-menu-items">
        {PROGRAMS.map(prog => (
          <button
            key={prog.id}
            className="start-menu-item"
            onClick={() => onOpenProgram(prog)}
          >
            <span className="start-menu-item-icon">{prog.icon}</span>
            <span className="start-menu-item-label">{prog.title}</span>
            {prog.isExternal && <span className="start-menu-item-arrow">&rsaquo;</span>}
          </button>
        ))}

        <div className="start-menu-separator" />

        <button
          className="start-menu-item"
          onClick={() => {
            onClose();
            window.location.reload();
          }}
        >
          <span className="start-menu-item-icon">&#9211;</span>
          <span className="start-menu-item-label">Shut Down...</span>
        </button>
      </div>
    </div>
  );
}
