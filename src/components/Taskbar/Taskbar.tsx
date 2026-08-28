import { useState, useEffect } from 'react';
import type { WindowState, ProgramDefinition } from '../../types';
import { TASKBAR_HEIGHT, PROGRAMS } from '../../types';
import { Win95LogoIcon, SoundIcon } from '../Icons/Win95Icons';
import { ProgramIcon } from '../Icons/ProgramIcon';
import StartMenu from './StartMenu';
import './Taskbar.css';

interface TaskbarProps {
  windows: WindowState[];
  focusedWindowId: string | null;
  onToggleMinimize: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onOpenProgram: (program: ProgramDefinition) => void;
  onLockScreen?: () => void;
}

export default function Taskbar({
  windows,
  focusedWindowId,
  onToggleMinimize,
  onFocusWindow,
  onOpenProgram,
  onLockScreen,
}: TaskbarProps) {
  const [showStart, setShowStart] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      setClock(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    }
    tick();
    const interval = setInterval(tick, 10000);
    return () => clearInterval(interval);
  }, []);

  function handleWindowButton(win: WindowState) {
    if (win.isMinimized) {
      onToggleMinimize(win.id);
    } else if (win.id === focusedWindowId) {
      onToggleMinimize(win.id);
    } else {
      onFocusWindow(win.id);
    }
  }

  return (
    <>
      {showStart && (
        <StartMenu
          onOpenProgram={(prog) => {
            onOpenProgram(prog);
            setShowStart(false);
          }}
          onClose={() => setShowStart(false)}
          onLockScreen={onLockScreen}
        />
      )}

      <div className="taskbar" style={{ height: TASKBAR_HEIGHT }}>
        {/* Start button with authentic Win95 4-color logo */}
        <button
          className={`taskbar-start-btn ${showStart ? 'pressed' : ''}`}
          onClick={() => setShowStart(!showStart)}
          aria-label="Start Menu"
        >
          <span className="start-logo">
            <Win95LogoIcon size={16} />
          </span>
          <span className="start-text">Start</span>
        </button>

        {/* Divider */}
        <div className="taskbar-divider" />

        {/* Quick launch icons */}
        <div className="taskbar-quick-launch">
          {PROGRAMS.filter(p => ['terminal', 'music', 'photos', 'ie', 'notepad'].includes(p.id)).map(prog => (
            <button
              key={prog.id}
              className="quick-launch-btn"
              onClick={() => onOpenProgram(prog)}
              title={`Launch ${prog.title}`}
              aria-label={`Quick launch ${prog.title}`}
            >
              <ProgramIcon iconId={prog.iconId} size={16} />
            </button>
          ))}
        </div>

        <div className="taskbar-divider" />

        {/* Window buttons */}
        <div className="taskbar-windows">
          {windows.map(win => (
            <button
              key={win.id}
              className={`taskbar-window-btn ${win.id === focusedWindowId && !win.isMinimized ? 'active' : ''}`}
              onClick={() => handleWindowButton(win)}
              title={win.title}
            >
              <span className="taskbar-window-icon">
                <ProgramIcon iconId={win.iconId} size={14} />
              </span>
              <span className="taskbar-window-text">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System tray with speaker icon & clock */}
        <div className="taskbar-tray">
          <span
            className="tray-sound-icon"
            title="Music Player (SadLofi)"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const mp = PROGRAMS.find(p => p.id === 'music');
              if (mp) onOpenProgram(mp);
            }}
          >
            <SoundIcon size={14} />
          </span>
          <span className="tray-clock">{clock}</span>
        </div>
      </div>
    </>
  );
}
