import { PROGRAMS, TASKBAR_HEIGHT } from '../../types';
import type { ProgramDefinition, WindowState } from '../../types';
import DesktopIcon from './DesktopIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import AboutMe from '../Programs/AboutMe';
import Projects from '../Programs/Projects';
import Skills from '../Programs/Skills';
import Stats from '../Programs/Stats';
import Contact from '../Programs/Contact';
import Guestbook from '../Programs/Guestbook';
import './Desktop.css';

interface DesktopProps {
  windows: WindowState[];
  focusedWindowId: string | null;
  onOpenProgram: (program: ProgramDefinition) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onMoveWindow: (id: string, x: number, y: number) => void;
  onResizeWindow: (id: string, w: number, h: number, x?: number, y?: number) => void;
  onToggleMinimize: (id: string) => void;
}

function getProgramContent(programId: string) {
  switch (programId) {
    case 'about': return <AboutMe />;
    case 'projects': return <Projects />;
    case 'skills': return <Skills />;
    case 'stats': return <Stats />;
    case 'contact': return <Contact />;
    case 'guestbook': return <Guestbook />;
    default: return <div style={{ padding: 16 }}>Unknown program</div>;
  }
}

export default function Desktop({
  windows,
  focusedWindowId,
  onOpenProgram,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onFocusWindow,
  onMoveWindow,
  onResizeWindow,
  onToggleMinimize,
}: DesktopProps) {
  return (
    <div className="desktop-root">
      {/* Desktop area */}
      <div
        className="desktop-area"
        style={{ bottom: TASKBAR_HEIGHT }}
        onClick={() => {/* deselect icons could go here */}}
      >
        {/* Icon grid */}
        <div className="desktop-icons">
          {PROGRAMS.map(prog => (
            <DesktopIcon
              key={prog.id}
              icon={prog.icon}
              label={prog.title}
              onDoubleClick={() => onOpenProgram(prog)}
            />
          ))}
        </div>

        {/* Windows */}
        {windows.map(win => (
          <Window
            key={win.id}
            window={win}
            isFocused={win.id === focusedWindowId}
            onClose={onCloseWindow}
            onMinimize={onMinimizeWindow}
            onMaximize={onMaximizeWindow}
            onFocus={onFocusWindow}
            onMove={onMoveWindow}
            onResize={onResizeWindow}
          >
            {getProgramContent(win.programId)}
          </Window>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        focusedWindowId={focusedWindowId}
        onToggleMinimize={onToggleMinimize}
        onFocusWindow={onFocusWindow}
        onOpenProgram={onOpenProgram}
      />
    </div>
  );
}
