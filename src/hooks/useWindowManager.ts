import { useState, useCallback, useRef } from 'react';
import type { WindowState, ProgramDefinition } from '../types';
import { TASKBAR_HEIGHT, PROGRAMS } from '../types';

let nextZIndex = 10;

function computeInitialPositionAndSize(
  program: ProgramDefinition,
  index: number
): { position: { x: number; y: number }; size: { width: number; height: number }; minSize: { width: number; height: number } } {
  const isMobile = window.innerWidth < 640;
  const minW = isMobile ? 280 : program.minSize.width;
  const minH = isMobile ? 240 : program.minSize.height;

  if (isMobile) {
    const width = Math.max(minW, Math.min(window.innerWidth - 16, program.defaultSize.width));
    const height = Math.max(minH, Math.min(window.innerHeight - TASKBAR_HEIGHT - 24, program.defaultSize.height));
    const x = Math.max(8, Math.floor((window.innerWidth - width) / 2));
    const y = Math.max(8, Math.floor((window.innerHeight - TASKBAR_HEIGHT - height) / 2));
    return {
      position: { x, y },
      size: { width, height },
      minSize: { width: minW, height: minH },
    };
  }

  // Generous left margin (330px - 180px + 150px extra) so ALL desktop shortcut columns are completely visible!
  const leftBase = 330;
  const topBase = 25;
  const offset = 25;

  const maxAvailableWidth = window.innerWidth - leftBase - 20;
  const width = Math.min(program.defaultSize.width, maxAvailableWidth);
  const height = Math.min(program.defaultSize.height, window.innerHeight - TASKBAR_HEIGHT - 40);

  const maxX = Math.max(leftBase, window.innerWidth - width - 20);
  const maxY = Math.max(20, window.innerHeight - TASKBAR_HEIGHT - height - 20);

  const x = Math.min(leftBase + (index * offset) % 180, maxX);
  const y = Math.min(topBase + (index * offset) % 150, maxY);

  return {
    position: { x, y },
    size: { width, height },
    minSize: { width: minW, height: minH },
  };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const windowIdCounter = useRef(0);
  const hasInitializedBootSequence = useRef(false);

  // Triggered when user unlocks the lock screen
  const startLoginSequence = useCallback(() => {
    if (hasInitializedBootSequence.current) return;
    hasInitializedBootSequence.current = true;

    // 1. After 2 seconds: Open MS-DOS Terminal
    setTimeout(() => {
      const terminalProg = PROGRAMS.find(p => p.id === 'terminal');
      if (terminalProg) {
        setWindows(prev => {
          if (prev.some(w => w.programId === 'terminal')) return prev;
          windowIdCounter.current++;
          const { position, size, minSize } = computeInitialPositionAndSize(terminalProg, 0);
          return [
            ...prev,
            {
              id: `win-${windowIdCounter.current}`,
              programId: terminalProg.id,
              title: terminalProg.title,
              iconId: terminalProg.iconId,
              position,
              size,
              minSize,
              zIndex: ++nextZIndex,
              isMinimized: false,
              isMaximized: false,
            },
          ];
        });
      }
    }, 2000);

    // 2. After 3 seconds: Open Media Player (SadLofi & Playlists)
    setTimeout(() => {
      const musicProg = PROGRAMS.find(p => p.id === 'music');
      if (musicProg) {
        setWindows(prev => {
          if (prev.some(w => w.programId === 'music')) return prev;
          windowIdCounter.current++;
          const { size, minSize } = computeInitialPositionAndSize(musicProg, 1);
          const x = window.innerWidth >= 1050
            ? Math.max(340, window.innerWidth - size.width - 30)
            : 330;
          return [
            ...prev,
            {
              id: `win-${windowIdCounter.current}`,
              programId: musicProg.id,
              title: musicProg.title,
              iconId: musicProg.iconId,
              position: { x, y: 30 },
              size,
              minSize,
              zIndex: ++nextZIndex,
              isMinimized: false,
              isMaximized: false,
            },
          ];
        });
      }
    }, 3000);

    // 3. After 15 seconds: Open Wildlife Video Player
    setTimeout(() => {
      const videoProg = PROGRAMS.find(p => p.id === 'video');
      if (videoProg) {
        setWindows(prev => {
          if (prev.some(w => w.programId === 'video')) return prev;
          windowIdCounter.current++;
          const { position, size, minSize } = computeInitialPositionAndSize(videoProg, 2);
          return [
            ...prev,
            {
              id: `win-${windowIdCounter.current}`,
              programId: videoProg.id,
              title: videoProg.title,
              iconId: videoProg.iconId,
              position: { x: Math.max(330, position.x + 40), y: Math.max(30, position.y + 40) },
              size,
              minSize,
              zIndex: ++nextZIndex,
              isMinimized: false,
              isMaximized: false,
            },
          ];
        });
      }
    }, 15000);
  }, []);

  const openWindow = useCallback((program: ProgramDefinition, initialData?: any) => {
    setWindows(prev => {
      const existing = prev.find(w => w.programId === program.id && !['notepad', 'image-viewer'].includes(program.id));
      if (existing) {
        nextZIndex++;
        return prev.map(w =>
          w.id === existing.id
            ? { ...w, zIndex: nextZIndex, isMinimized: false, initialData: initialData || w.initialData }
            : w
        );
      }

      windowIdCounter.current++;
      const { position, size, minSize } = computeInitialPositionAndSize(program, prev.length);
      const newWindow: WindowState = {
        id: `win-${windowIdCounter.current}`,
        programId: program.id,
        title: initialData?.title || program.title,
        iconId: program.iconId,
        position,
        size,
        minSize,
        zIndex: ++nextZIndex,
        isMinimized: false,
        isMaximized: false,
        initialData,
      };
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w;
        if (w.isMinimized) {
          nextZIndex++;
          return { ...w, isMinimized: false, zIndex: nextZIndex };
        }
        return { ...w, isMinimized: true };
      })
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            position: w.preMaxPosition || w.position,
            size: w.preMaxSize || w.size,
            preMaxPosition: undefined,
            preMaxSize: undefined,
          };
        }
        return {
          ...w,
          isMaximized: true,
          preMaxPosition: { ...w.position },
          preMaxSize: { ...w.size },
          position: { x: 0, y: 0 },
          size: {
            width: window.innerWidth,
            height: window.innerHeight - TASKBAR_HEIGHT,
          },
        };
      })
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  }, []);

  const resizeWindow = useCallback(
    (id: string, width: number, height: number, x?: number, y?: number) => {
      setWindows(prev =>
        prev.map(w => {
          if (w.id !== id) return w;
          const newW = Math.max(width, w.minSize.width);
          const newH = Math.max(height, w.minSize.height);
          const updated: WindowState = { ...w, size: { width: newW, height: newH } };
          if (x !== undefined && y !== undefined) {
            updated.position = { x, y };
          }
          return updated;
        })
      );
    },
    []
  );

  return {
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
  };
}
