import { useState, useCallback, useRef, useEffect } from 'react';
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

  const base = 50;
  const offset = 30;
  const width = Math.min(program.defaultSize.width, window.innerWidth - 40);
  const height = Math.min(program.defaultSize.height, window.innerHeight - TASKBAR_HEIGHT - 40);
  const maxX = Math.max(20, window.innerWidth - width - 20);
  const maxY = Math.max(20, window.innerHeight - TASKBAR_HEIGHT - height - 20);

  const x = Math.min(base + (index * offset) % 240, maxX);
  const y = Math.min(base + (index * offset) % 180, maxY);

  return {
    position: { x, y },
    size: { width, height },
    minSize: { width: minW, height: minH },
  };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const windowIdCounter = useRef(0);

  // Auto-open About Me on initial load
  useEffect(() => {
    const aboutProg = PROGRAMS.find(p => p.id === 'about');
    if (aboutProg && windows.length === 0 && windowIdCounter.current === 0) {
      windowIdCounter.current++;
      const { position, size, minSize } = computeInitialPositionAndSize(aboutProg, 0);
      setWindows([
        {
          id: `win-${windowIdCounter.current}`,
          programId: aboutProg.id,
          title: aboutProg.title,
          icon: aboutProg.icon,
          position,
          size,
          minSize,
          zIndex: ++nextZIndex,
          isMinimized: false,
          isMaximized: false,
        },
      ]);
    }
  }, []);

  const openWindow = useCallback((program: ProgramDefinition) => {
    if (program.isExternal && program.externalUrl) {
      window.open(program.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setWindows(prev => {
      // If already open, focus it and unminimize
      const existing = prev.find(w => w.programId === program.id);
      if (existing) {
        nextZIndex++;
        return prev.map(w =>
          w.id === existing.id
            ? { ...w, zIndex: nextZIndex, isMinimized: false }
            : w
        );
      }

      windowIdCounter.current++;
      const { position, size, minSize } = computeInitialPositionAndSize(program, prev.length);
      const newWindow: WindowState = {
        id: `win-${windowIdCounter.current}`,
        programId: program.id,
        title: program.title,
        icon: program.icon,
        position,
        size,
        minSize,
        zIndex: ++nextZIndex,
        isMinimized: false,
        isMaximized: false,
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
  };
}
