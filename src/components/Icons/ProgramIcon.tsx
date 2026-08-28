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
    default:
      return <ProjectsFolderIcon size={size} className={className} />;
  }
};
