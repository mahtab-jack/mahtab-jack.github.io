import React, { useCallback } from 'react';
import type { WindowState } from '../../types';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import { ProgramIcon } from '../Icons/ProgramIcon';
import './Window.css';

interface WindowProps {
  window: WindowState;
  isFocused: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, w: number, h: number, x?: number, y?: number) => void;
  children: React.ReactNode;
}

export default function Window({
  window: win,
  isFocused,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}: WindowProps) {
  const handleMove = useCallback(
    (x: number, y: number) => onMove(win.id, x, y),
    [win.id, onMove]
  );

  const handleResize = useCallback(
    (w: number, h: number, x?: number, y?: number) => onResize(win.id, w, h, x, y),
    [win.id, onResize]
  );

  const dragHandlers = useDraggable({
    onDrag: handleMove,
    onDragStart: () => onFocus(win.id),
    disabled: win.isMaximized,
  });

  const { getHandleProps } = useResizable({
    position: win.position,
    size: win.size,
    minSize: win.minSize,
    onResize: handleResize,
    disabled: win.isMaximized,
  });

  if (win.isMinimized) return null;

  const style: React.CSSProperties = {
    left: win.position.x,
    top: win.position.y,
    width: win.size.width,
    height: win.size.height,
    zIndex: win.zIndex,
  };

  return (
    <div
      className={`win95-window ${isFocused ? 'focused' : 'unfocused'} ${win.isMaximized ? 'maximized' : ''}`}
      style={style}
      onPointerDown={() => onFocus(win.id)}
    >
      {/* Resize handles */}
      {!win.isMaximized && (
        <>
          <div className="resize-handle resize-n" {...getHandleProps('n')} />
          <div className="resize-handle resize-s" {...getHandleProps('s')} />
          <div className="resize-handle resize-e" {...getHandleProps('e')} />
          <div className="resize-handle resize-w" {...getHandleProps('w')} />
          <div className="resize-handle resize-ne" {...getHandleProps('ne')} />
          <div className="resize-handle resize-nw" {...getHandleProps('nw')} />
          <div className="resize-handle resize-se" {...getHandleProps('se')} />
          <div className="resize-handle resize-sw" {...getHandleProps('sw')} />
        </>
      )}

      {/* Title bar */}
      <div
        className={`win-title-bar ${isFocused ? 'active' : 'inactive'}`}
        {...dragHandlers}
        onDoubleClick={() => onMaximize(win.id)}
      >
        <div className="win-title-left">
          <span className="win-title-icon">
            <ProgramIcon iconId={win.iconId} size={16} />
          </span>
          <span className="win-title-text">{win.title}</span>
        </div>
        <div className="win-title-buttons">
          <button
            className="win-btn win-btn-minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
            aria-label="Minimize"
          >
            <span className="win-btn-glyph">_</span>
          </button>
          <button
            className="win-btn win-btn-maximize"
            onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
            aria-label={win.isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="win-btn-glyph">{win.isMaximized ? '\u{29C9}' : '\u25A1'}</span>
          </button>
          <button
            className="win-btn win-btn-close"
            onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
            aria-label="Close"
          >
            <span className="win-btn-glyph">X</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="win-content">
        {children}
      </div>
    </div>
  );
}
