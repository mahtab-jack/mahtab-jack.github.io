import React from 'react';
import {
  MyComputerIcon,
  InternetExplorerIcon,
  NotepadIcon,
  CalculatorIcon,
  TerminalIcon,
  PaintIcon,
  ProjectsFolderIcon,
  SkillsIcon,
  StatsIcon,
  ContactMailIcon,
  GuestbookIcon,
  SystemPropertiesIcon,
  RecycleBinIcon,
  Win95LogoIcon,
} from './Win95Icons';

interface ProgramIconProps {
  iconId: string;
  size?: number;
  className?: string;
}

// Media / Music Player Icon
const MusicPlayerIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* CD Disc */}
    <circle cx="16" cy="16" r="13" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <circle cx="16" cy="16" r="9" fill="#E8E8E8" stroke="#808080" strokeWidth="0.5" />
    <circle cx="16" cy="16" r="4" fill="#000080" />
    <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
    {/* Musical Notes */}
    <path d="M18 6V14M22 6V12M18 8H22" stroke="#FF0000" strokeWidth="1.5" />
    <ellipse cx="16" cy="14" rx="2" ry="1.5" fill="#FF0000" />
    <ellipse cx="20" cy="12" rx="2" ry="1.5" fill="#FF0000" />
  </svg>
);

// Video File Icon
const VideoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    <rect x="4" y="6" width="24" height="20" fill="#000000" stroke="#808080" strokeWidth="1" />
    <rect x="5" y="7" width="22" height="18" fill="#102040" />
    {/* Film perforations */}
    <rect x="6" y="8" width="3" height="3" fill="#FFFFFF" />
    <rect x="11" y="8" width="3" height="3" fill="#FFFFFF" />
    <rect x="16" y="8" width="3" height="3" fill="#FFFFFF" />
    <rect x="21" y="8" width="3" height="3" fill="#FFFFFF" />
    <rect x="6" y="21" width="3" height="3" fill="#FFFFFF" />
    <rect x="11" y="21" width="3" height="3" fill="#FFFFFF" />
    <rect x="16" y="21" width="3" height="3" fill="#FFFFFF" />
    <rect x="21" y="21" width="3" height="3" fill="#FFFFFF" />
    {/* Play triangle */}
    <path d="M14 12L20 15.5L14 19V12Z" fill="#00FF00" />
  </svg>
);

// Photos Folder Icon
const PhotosIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Yellow folder */}
    <path d="M4 6H13L16 9H28V24H4V6Z" fill="#D4AF37" stroke="#000000" strokeWidth="1" />
    {/* Polaroids peaking out */}
    <rect x="7" y="8" width="16" height="13" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <circle cx="11" cy="12" r="2" fill="#FFCC00" />
    <path d="M8 18L13 13L17 17L21 14" stroke="#00AA00" strokeWidth="1" fill="none" />
    {/* Front folder flap */}
    <path d="M3 12H29L26 26H3V12Z" fill="#FFE066" stroke="#000000" strokeWidth="1" />
  </svg>
);

export const ProgramIcon: React.FC<ProgramIconProps> = ({ iconId, size = 32, className = '' }) => {
  switch (iconId) {
    case 'mycomputer':
    case 'about':
      return <MyComputerIcon size={size} className={className} />;
    case 'ie':
    case 'browser':
      return <InternetExplorerIcon size={size} className={className} />;
    case 'notepad':
      return <NotepadIcon size={size} className={className} />;
    case 'calculator':
      return <CalculatorIcon size={size} className={className} />;
    case 'terminal':
    case 'dos':
      return <TerminalIcon size={size} className={className} />;
    case 'paint':
      return <PaintIcon size={size} className={className} />;
    case 'projects':
      return <ProjectsFolderIcon size={size} className={className} />;
    case 'skills':
      return <SkillsIcon size={size} className={className} />;
    case 'stats':
      return <StatsIcon size={size} className={className} />;
    case 'contact':
      return <ContactMailIcon size={size} className={className} />;
    case 'guestbook':
      return <GuestbookIcon size={size} className={className} />;
    case 'properties':
      return <SystemPropertiesIcon size={size} className={className} />;
    case 'recycle':
      return <RecycleBinIcon size={size} className={className} />;
    case 'win95':
      return <Win95LogoIcon size={size} className={className} />;
    case 'music':
      return <MusicPlayerIcon size={size} className={className} />;
    case 'video':
      return <VideoIcon size={size} className={className} />;
    case 'photos':
      return <PhotosIcon size={size} className={className} />;
    default:
      return <ProjectsFolderIcon size={size} className={className} />;
  }
};
