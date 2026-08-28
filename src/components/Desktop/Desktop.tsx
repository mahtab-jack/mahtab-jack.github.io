import React, { useState, useRef } from 'react';
import { PROGRAMS, TASKBAR_HEIGHT } from '../../types';
import type { ProgramDefinition, WindowState } from '../../types';
import DesktopIcon from './DesktopIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import ContextMenu from './ContextMenu';
import type { MenuItem } from './ContextMenu';
import AboutMe from '../Programs/AboutMe';
import Projects from '../Programs/Projects';
import Skills from '../Programs/Skills';
import Stats from '../Programs/Stats';
import Contact from '../Programs/Contact';
import Guestbook from '../Programs/Guestbook';
import InternetExplorer from '../Programs/InternetExplorer';
import Notepad from '../Programs/Notepad';
import Calculator from '../Programs/Calculator';
import Terminal from '../Programs/Terminal';
import Paint from '../Programs/Paint';
import SystemProperties from '../Programs/SystemProperties';
import RecycleBin from '../Programs/RecycleBin';
import MediaPlayer from '../Programs/MediaPlayer';
import PhotosFolder from '../Programs/PhotosFolder';
import ImageViewer from '../Programs/ImageViewer';
import VideoPlayer from '../Programs/VideoPlayer';
import { ProgramIcon } from '../Icons/ProgramIcon';
import './Desktop.css';

interface DesktopProps {
  windows: WindowState[];
  focusedWindowId: string | null;
  onOpenProgram: (program: ProgramDefinition, initialData?: any) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onMoveWindow: (id: string, x: number, y: number) => void;
  onResizeWindow: (id: string, w: number, h: number, x?: number, y?: number) => void;
  onToggleMinimize: (id: string) => void;
  onLockScreen?: () => void;
}

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
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
  onLockScreen,
}: DesktopProps) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  // Default to user's custom wallpaper: public/files/wallpaper.jpg
  const [wallpaper, setWallpaper] = useState<'custom' | 'teal' | 'navy' | 'matrix'>('custom');
  const desktopAreaRef = useRef<HTMLDivElement>(null);

  function getProgramContent(win: WindowState) {
    switch (win.programId) {
      case 'terminal': return <Terminal />;
      case 'music': return <MediaPlayer />;
      case 'photos':
        return (
          <PhotosFolder
            onOpenPhoto={(photo) => {
              const viewerProg = PROGRAMS.find(p => p.id === 'image-viewer');
              if (viewerProg) {
                onOpenProgram(viewerProg, {
                  initialPhotoId: photo.id,
                  title: photo.name,
                  src: photo.src,
                });
              }
            }}
          />
        );
      case 'image-viewer':
        return (
          <ImageViewer
            initialPhotoId={win.initialData?.initialPhotoId}
            initialSrc={win.initialData?.src}
            initialTitle={win.initialData?.title}
          />
        );
      case 'video': return <VideoPlayer />;
      case 'about': return <AboutMe />;
      case 'projects': return <Projects />;
      case 'skills': return <Skills />;
      case 'stats': return <Stats />;
      case 'contact': return <Contact />;
      case 'guestbook': return <Guestbook />;
      case 'ie': return <InternetExplorer initialUrl={win.initialData?.url} />;
      case 'notepad': return <Notepad initialText={win.initialData?.text} documentTitle={win.initialData?.title} />;
      case 'calculator': return <Calculator />;
      case 'paint': return <Paint />;
      case 'properties': return <SystemProperties />;
      case 'recycle': return <RecycleBin />;
      default: return <div style={{ padding: 16 }}>Unknown program</div>;
    }
  }

  // Handle right-click on desktop wallpaper
  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((e.target as HTMLElement).closest('.win95-window') || (e.target as HTMLElement).closest('.taskbar')) {
      return;
    }

    const items: MenuItem[] = [
      {
        label: 'View',
        submenu: [
          { label: 'Large Icons', onClick: () => {} },
          { label: 'Small Icons', onClick: () => {} },
          { label: 'Auto Arrange', onClick: () => {} },
        ],
      },
      {
        label: 'Change Wallpaper',
        submenu: [
          { label: 'Custom Wallpaper (Default)', onClick: () => setWallpaper('custom') },
          { label: 'Classic Teal', onClick: () => setWallpaper('teal') },
          { label: 'Windows Navy', onClick: () => setWallpaper('navy') },
          { label: 'Retro Matrix', onClick: () => setWallpaper('matrix') },
        ],
      },
      {
        label: 'Refresh',
        onClick: () => {
          if (desktopAreaRef.current) {
            desktopAreaRef.current.style.opacity = '0.7';
            setTimeout(() => {
              if (desktopAreaRef.current) desktopAreaRef.current.style.opacity = '1';
            }, 80);
          }
        },
      },
      { separator: true, label: '' },
      {
        label: 'New',
        submenu: [
          {
            label: 'Text Document',
            icon: <ProgramIcon iconId="notepad" size={16} />,
            onClick: () => {
              const np = PROGRAMS.find(p => p.id === 'notepad');
              if (np) onOpenProgram(np, { title: 'New Document.txt', text: '' });
            },
          },
          {
            label: 'Bitmap Image',
            icon: <ProgramIcon iconId="paint" size={16} />,
            onClick: () => {
              const paintProg = PROGRAMS.find(p => p.id === 'paint');
              if (paintProg) onOpenProgram(paintProg);
            },
          },
        ],
      },
      { separator: true, label: '' },
      {
        label: 'Lock Computer (Welcome Screen)',
        onClick: onLockScreen,
      },
      {
        label: 'Properties',
        icon: <ProgramIcon iconId="properties" size={16} />,
        onClick: () => {
          const sysProp = PROGRAMS.find(p => p.id === 'properties');
          if (sysProp) onOpenProgram(sysProp);
        },
      },
    ];

    setContextMenu({ x: e.clientX, y: e.clientY, items });
  };

  // Marquee Selection Box
  const handlePointerDown = (e: React.PointerEvent) => {
    if (contextMenu) setContextMenu(null);
    if ((e.target as HTMLElement).closest('.win95-window') || (e.target as HTMLElement).closest('.desktop-icon')) {
      return;
    }
    if (e.button !== 0) return;

    setSelectionBox({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!selectionBox) return;
    setSelectionBox(prev => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);
  };

  const handlePointerUp = () => {
    setSelectionBox(null);
  };

  const boxStyle = selectionBox ? {
    left: Math.min(selectionBox.startX, selectionBox.currentX),
    top: Math.min(selectionBox.startY, selectionBox.currentY),
    width: Math.abs(selectionBox.currentX - selectionBox.startX),
    height: Math.abs(selectionBox.currentY - selectionBox.startY),
  } : null;

  return (
    <div
      className="desktop-root"
      onContextMenu={handleDesktopContextMenu}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Desktop area */}
      <div
        ref={desktopAreaRef}
        className={`desktop-area wallpaper-${wallpaper}`}
        style={{ bottom: TASKBAR_HEIGHT }}
      >
        {/* Selection Rectangle */}
        {selectionBox && boxStyle && boxStyle.width > 2 && (
          <div className="desktop-selection-box" style={boxStyle} />
        )}

        {/* Desktop Icon Grid */}
        <div className="desktop-icons">
          {PROGRAMS.filter(p => p.id !== 'image-viewer').map(prog => (
            <DesktopIcon
              key={prog.id}
              iconId={prog.iconId}
              label={prog.title}
              onClick={() => onOpenProgram(prog)}
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
            {getProgramContent(win)}
          </Window>
        ))}
      </div>

      {/* Right Click Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        focusedWindowId={focusedWindowId}
        onToggleMinimize={onToggleMinimize}
        onFocusWindow={onFocusWindow}
        onOpenProgram={onOpenProgram}
        onLockScreen={onLockScreen}
      />
    </div>
  );
}
