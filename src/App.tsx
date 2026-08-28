import Desktop from './components/Desktop/Desktop';
import { useWindowManager } from './hooks/useWindowManager';
import './App.css';

export default function App() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMinimize,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useWindowManager();

  // The focused window is the one with the highest z-index that is not minimized
  const focusedWindowId = windows
    .filter(w => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;

  return (
    <Desktop
      windows={windows}
      focusedWindowId={focusedWindowId}
      onOpenProgram={openWindow}
      onCloseWindow={closeWindow}
      onMinimizeWindow={minimizeWindow}
      onMaximizeWindow={maximizeWindow}
      onFocusWindow={focusWindow}
      onMoveWindow={moveWindow}
      onResizeWindow={resizeWindow}
      onToggleMinimize={toggleMinimize}
    />
  );
}
