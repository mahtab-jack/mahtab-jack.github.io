import { useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import LockScreen from './components/LockScreen/LockScreen';
import { useWindowManager } from './hooks/useWindowManager';
import './App.css';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);

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

  const focusedWindowId = windows
    .filter(w => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;

  return (
    <>
      {isLocked ? (
        <LockScreen
          onUnlock={() => setIsLocked(false)}
          username="Mahtab Jack"
          avatarUrl="./files/lockscreen.png"
        />
      ) : (
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
          onLockScreen={() => setIsLocked(true)}
        />
      )}
    </>
  );
}
