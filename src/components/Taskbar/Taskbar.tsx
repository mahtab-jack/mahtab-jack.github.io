import { useState, useEffect } from 'react';
import type { WindowState, ProgramDefinition } from '../../types';
import { TASKBAR_HEIGHT, PROGRAMS } from '../../types';
import StartMenu from './StartMenu';
import './Taskbar.css';

interface TaskbarProps {
  windows: WindowState[];
  focusedWindowId: string | null;
  onToggleMinimize: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onOpenProgram: (program: ProgramDefinition) => void;
}

export default function Taskbar({
  windows,
  focusedWindowId,
  onToggleMinimize,
  onFocusWindow,
  onOpenProgram,
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
        />
      )}

      <div className="taskbar" style={{ height: TASKBAR_HEIGHT }}>
        {/* Start button */}
        <button
          className={`taskbar-start-btn ${showStart ? 'pressed' : ''}`}
          onClick={() => setShowStart(!showStart)}
          aria-label="Start Menu"
        >
          <span className="start-logo">&#9776;</span>
          <span className="start-text">Start</span>
        </button>

        {/* Divider */}
        <div className="taskbar-divider" />

        {/* Quick launch */}
        <div className="taskbar-quick-launch">
          {PROGRAMS.filter(p => !p.isExternal).slice(0, 3).map(prog => (
            <button
              key={prog.id}
              className="quick-launch-btn"
              onClick={() => onOpenProgram(prog)}
              title={prog.title}
              aria-label={`Quick launch ${prog.title}`}
            >
              {prog.icon}
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
              <span className="taskbar-window-icon">{win.icon}</span>
              <span className="taskbar-window-text">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="taskbar-tray">
          <span className="tray-clock">{clock}</span>
        </div>
      </div>
    </>
  );
}
