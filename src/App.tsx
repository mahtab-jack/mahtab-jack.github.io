import { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import LockScreen from './components/LockScreen/LockScreen';
import { useWindowManager } from './hooks/useWindowManager';
import './App.css';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);

  // Preload wallpaper and user avatar early to prevent any black screen flash
  useEffect(() => {
    const preloadWallpaper = new Image();
    preloadWallpaper.src = './files/wallpaper.jpg';

    const preloadAvatar = new Image();
    preloadAvatar.src = 'https://avatars.githubusercontent.com/u/111902189?v=4';
  }, []);

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
    startLoginSequence,
  } = useWindowManager();

  const handleUnlock = () => {
    setIsLocked(false);
    startLoginSequence();
  };

  const focusedWindowId = windows
    .filter(w => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;

  return (
    <>
      {isLocked ? (
        <LockScreen
          onUnlock={handleUnlock}
          username="Mahtab Jack"
          avatarUrl="https://avatars.githubusercontent.com/u/111902189?v=4"
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
