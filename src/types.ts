/* =============================================
   PROGRAM REGISTRY & WINDOW TYPES
   ============================================= */

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  programId: string;
  title: string;
  iconId: string;
  position: WindowPosition;
  size: WindowSize;
  minSize: WindowSize;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  preMaxPosition?: WindowPosition;
  preMaxSize?: WindowSize;
  initialData?: any;
}

export interface ProgramDefinition {
  id: string;
  title: string;
  iconId: string;
  defaultSize: WindowSize;
  minSize: WindowSize;
  category?: 'main' | 'accessories' | 'system';
  isExternal?: boolean;
  externalUrl?: string;
}

export const PROGRAMS: ProgramDefinition[] = [
  {
    id: 'about',
    title: 'About Me.exe',
    iconId: 'mycomputer',
    defaultSize: { width: 560, height: 480 },
    minSize: { width: 340, height: 280 },
    category: 'main',
  },
  {
    id: 'projects',
    title: 'Projects Explorer.exe',
    iconId: 'projects',
    defaultSize: { width: 640, height: 500 },
    minSize: { width: 360, height: 300 },
    category: 'main',
  },
  {
    id: 'skills',
    title: 'Skills & Tools.exe',
    iconId: 'skills',
    defaultSize: { width: 520, height: 440 },
    minSize: { width: 340, height: 280 },
    category: 'main',
  },
  {
    id: 'stats',
    title: 'System Monitor.exe',
    iconId: 'stats',
    defaultSize: { width: 480, height: 380 },
    minSize: { width: 320, height: 260 },
    category: 'main',
  },
  {
    id: 'contact',
    title: 'Contact Mail.exe',
    iconId: 'contact',
    defaultSize: { width: 520, height: 420 },
    minSize: { width: 340, height: 280 },
    category: 'main',
  },
  {
    id: 'guestbook',
    title: 'Guestbook.exe',
    iconId: 'guestbook',
    defaultSize: { width: 480, height: 460 },
    minSize: { width: 340, height: 320 },
    category: 'main',
  },
  {
    id: 'ie',
    title: 'Internet Explorer',
    iconId: 'ie',
    defaultSize: { width: 720, height: 540 },
    minSize: { width: 400, height: 300 },
    category: 'main',
  },
  {
    id: 'notepad',
    title: 'Notepad',
    iconId: 'notepad',
    defaultSize: { width: 500, height: 400 },
    minSize: { width: 320, height: 240 },
    category: 'accessories',
  },
  {
    id: 'paint',
    title: 'Paint',
    iconId: 'paint',
    defaultSize: { width: 580, height: 460 },
    minSize: { width: 380, height: 300 },
    category: 'accessories',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    iconId: 'calculator',
    defaultSize: { width: 280, height: 340 },
    minSize: { width: 260, height: 300 },
    category: 'accessories',
  },
  {
    id: 'terminal',
    title: 'MS-DOS Prompt',
    iconId: 'terminal',
    defaultSize: { width: 600, height: 400 },
    minSize: { width: 360, height: 260 },
    category: 'accessories',
  },
  {
    id: 'properties',
    title: 'System Properties',
    iconId: 'properties',
    defaultSize: { width: 460, height: 440 },
    minSize: { width: 360, height: 360 },
    category: 'system',
  },
  {
    id: 'recycle',
    title: 'Recycle Bin',
    iconId: 'recycle',
    defaultSize: { width: 440, height: 320 },
    minSize: { width: 300, height: 200 },
    category: 'system',
  },
];

export const GITHUB_USERNAME = 'mahtab-jack';

export const TASKBAR_HEIGHT = 36;
