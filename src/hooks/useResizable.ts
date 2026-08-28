import { useCallback, useRef } from 'react';
import type { WindowSize, WindowPosition } from '../types';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface ResizableOptions {
  position: WindowPosition;
  size: WindowSize;
  minSize: WindowSize;
  onResize: (width: number, height: number, x?: number, y?: number) => void;
  disabled?: boolean;
}

export function useResizable({ position, size, minSize, onResize, disabled }: ResizableOptions) {
  const startRef = useRef<{
    mouseX: number;
    mouseY: number;
    x: number;
    y: number;
    w: number;
    h: number;
    dir: ResizeDirection;
  } | null>(null);

  const handlePointerDown = useCallback(
    (dir: ResizeDirection) => (e: React.PointerEvent) => {
      if (disabled) return;
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      startRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        x: position.x,
        y: position.y,
        w: size.width,
        h: size.height,
        dir,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [disabled, position, size]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const s = startRef.current;
      if (!s) return;

      const dx = e.clientX - s.mouseX;
      const dy = e.clientY - s.mouseY;

      let newW = s.w;
      let newH = s.h;
      let newX = s.x;
      let newY = s.y;

      if (s.dir.includes('e')) {
        newW = Math.max(s.w + dx, minSize.width);
      }
      if (s.dir.includes('w')) {
        const proposedW = s.w - dx;
        if (proposedW >= minSize.width) {
          newW = proposedW;
          newX = s.x + dx;
        }
      }
      if (s.dir.includes('s')) {
        newH = Math.max(s.h + dy, minSize.height);
      }
      if (s.dir.includes('n')) {
        const proposedH = s.h - dy;
        if (proposedH >= minSize.height) {
          newH = proposedH;
          newY = s.y + dy;
        }
      }

      onResize(newW, newH, newX, newY);
    },
    [minSize, onResize]
  );

  const handlePointerUp = useCallback((_e: React.PointerEvent) => {
    startRef.current = null;
  }, []);

  const getHandleProps = useCallback(
    (dir: ResizeDirection) => ({
      onPointerDown: handlePointerDown(dir),
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    }),
    [handlePointerDown, handlePointerMove, handlePointerUp]
  );

  return { getHandleProps };
}
