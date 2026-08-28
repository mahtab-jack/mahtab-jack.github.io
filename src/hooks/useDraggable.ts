import { useCallback, useRef } from 'react';

interface DraggableOptions {
  onDragStart?: () => void;
  onDrag: (x: number, y: number) => void;
  onDragEnd?: () => void;
  disabled?: boolean;
}

export function useDraggable({ onDrag, onDragStart, onDragEnd, disabled }: DraggableOptions) {
  const isDragging = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      // Only left mouse button
      if (e.button !== 0) return;
      // Don't drag if clicking a button
      if ((e.target as HTMLElement).closest('button')) return;

      isDragging.current = true;
      const el = e.currentTarget as HTMLElement;
      const parentRect = el.closest('.win95-window')?.getBoundingClientRect();
      if (!parentRect) return;

      offsetRef.current = {
        x: e.clientX - parentRect.left,
        y: e.clientY - parentRect.top,
      };

      el.setPointerCapture(e.pointerId);
      onDragStart?.();
    },
    [disabled, onDragStart]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;
      onDrag(newX, Math.max(0, newY));
    },
    [onDrag]
  );

  const handlePointerUp = useCallback(
    (_e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      onDragEnd?.();
    },
    [onDragEnd]
  );

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
  };
}
