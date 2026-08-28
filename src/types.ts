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
  icon: string;
  position: WindowPosition;
  size: WindowSize;
  minSize: WindowSize;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  preMaxPosition?: WindowPosition;
  preMaxSize?: WindowSize;
}

export interface ProgramDefinition {
  id: string;
  title: string;
  icon: string;
  defaultSize: WindowSize;
  minSize: WindowSize;
  isExternal?: boolean;
  externalUrl?: string;
}

export const PROGRAMS: ProgramDefinition[] = [
  {
    id: 'about',
    title: 'About Me.exe',
    icon: '\u{1F4BB}',
    defaultSize: { width: 560, height: 480 },
    minSize: { width: 360, height: 300 },
  },
  {
    id: 'projects',
    title: 'Projects.exe',
    icon: '\u{1F4C2}',
    defaultSize: { width: 640, height: 520 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: 'skills',
    title: 'Skills.exe',
    icon: '\u{1F3A8}',
    defaultSize: { width: 520, height: 440 },
    minSize: { width: 340, height: 280 },
  },
  {
    id: 'stats',
    title: 'Stats.exe',
    icon: '\u{1F4CA}',
    defaultSize: { width: 480, height: 360 },
    minSize: { width: 340, height: 260 },
  },
  {
    id: 'contact',
    title: 'Contact.exe',
    icon: '\u{2709}',
    defaultSize: { width: 520, height: 420 },
    minSize: { width: 340, height: 280 },
  },
  {
    id: 'guestbook',
    title: 'Guestbook.exe',
    icon: '\u{1F4DD}',
    defaultSize: { width: 480, height: 460 },
    minSize: { width: 340, height: 320 },
  },
  {
    id: 'blog',
    title: 'Blog.url',
    icon: '\u{1F310}',
    defaultSize: { width: 0, height: 0 },
    minSize: { width: 0, height: 0 },
    isExternal: true,
    externalUrl: 'https://blogthread.in/',
  },
  {
    id: 'github',
    title: 'GitHub.url',
    icon: '\u{1F5A5}',
    defaultSize: { width: 0, height: 0 },
    minSize: { width: 0, height: 0 },
    isExternal: true,
    externalUrl: 'https://github.com/mahtab-jack',
  },
];

export const GITHUB_USERNAME = 'mahtab-jack';

export const TASKBAR_HEIGHT = 36;
