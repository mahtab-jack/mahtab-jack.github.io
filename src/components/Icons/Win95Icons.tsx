import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Authentic 4-Color Windows 95 / 98 Flying Logo
export const Win95LogoIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Red top-left flag tile */}
    <path d="M1 2H6V7H1V2Z" fill="#FF0000" />
    <rect x="2" y="1" width="4" height="1" fill="#FF5555" />
    {/* Green top-right flag tile */}
    <path d="M7 3H13V8H7V3Z" fill="#00AA00" />
    <rect x="8" y="2" width="5" height="1" fill="#55FF55" />
    {/* Blue bottom-left flag tile */}
    <path d="M2 8H7V13H2V8Z" fill="#0000AA" />
    <rect x="3" y="7" width="4" height="1" fill="#5555FF" />
    {/* Yellow bottom-right flag tile */}
    <path d="M8 9H14V14H8V9Z" fill="#FFCC00" />
    <rect x="9" y="8" width="5" height="1" fill="#FFFF55" />
    {/* Trailing dots */}
    <rect x="14" y="4" width="1" height="1" fill="#000000" />
    <rect x="15" y="6" width="1" height="1" fill="#000000" />
    <rect x="15" y="10" width="1" height="1" fill="#000000" />
  </svg>
);

// My Computer (Beige CRT Monitor + PC Tower)
export const MyComputerIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Monitor Frame */}
    <rect x="4" y="3" width="20" height="17" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="5" y="4" width="18" height="1" fill="#FFFFFF" />
    <rect x="5" y="4" width="1" height="15" fill="#FFFFFF" />
    <rect x="22" y="5" width="1" height="14" fill="#808080" />
    <rect x="5" y="19" width="18" height="1" fill="#808080" />
    {/* Screen Inset */}
    <rect x="7" y="6" width="14" height="11" fill="#008080" stroke="#000000" strokeWidth="1" />
    <rect x="9" y="8" width="3" height="3" fill="#FFFFFF" />
    {/* Monitor Base / Stand */}
    <rect x="11" y="20" width="6" height="3" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="8" y="23" width="12" height="2" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    {/* PC Tower */}
    <rect x="23" y="8" width="7" height="17" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="24" y="9" width="5" height="1" fill="#FFFFFF" />
    <rect x="25" y="11" width="3" height="1" fill="#000000" />
    <rect x="25" y="13" width="3" height="1" fill="#000000" />
    <rect x="25" y="16" width="1" height="1" fill="#00FF00" />
    <rect x="27" y="16" width="1" height="1" fill="#FF0000" />
  </svg>
);

// Internet Explorer (Classic Blue 'e' with golden orbital ring)
export const InternetExplorerIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    {/* Golden orbital halo */}
    <ellipse cx="16" cy="16" rx="14" ry="6" stroke="#D4AF37" strokeWidth="2.5" transform="rotate(-30 16 16)" fill="none" />
    <ellipse cx="16" cy="16" rx="14" ry="6" stroke="#FFFF88" strokeWidth="1" transform="rotate(-30 16 16)" fill="none" />
    {/* Lower 'e' curve */}
    <path
      d="M26 15C26 21 21 26 15 26C8.5 26 5 21 5 15C5 9 9 5 16 5C22 5 25 8.5 25 12H11C11 17 14 20 18 20C21 20 23 18 24 16"
      stroke="#000080"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M26 15C26 21 21 26 15 26C8.5 26 5 21 5 15C5 9 9 5 16 5C22 5 25 8.5 25 12H11C11 17 14 20 18 20C21 20 23 18 24 16"
      stroke="#1084D0"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Notepad (Spiral Notepad with Pencil)
export const NotepadIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Pad backing */}
    <rect x="5" y="4" width="20" height="24" fill="#000080" stroke="#000000" strokeWidth="1" />
    {/* Paper */}
    <rect x="7" y="6" width="18" height="21" fill="#FFFFCC" stroke="#808080" strokeWidth="1" />
    {/* Spiral rings at top */}
    <rect x="8" y="2" width="2" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="13" y="2" width="2" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="18" y="2" width="2" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="23" y="2" width="2" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    {/* Text lines */}
    <rect x="9" y="10" width="14" height="1" fill="#1084D0" />
    <rect x="9" y="13" width="14" height="1" fill="#1084D0" />
    <rect x="9" y="16" width="11" height="1" fill="#1084D0" />
    <rect x="9" y="19" width="13" height="1" fill="#1084D0" />
    <rect x="9" y="22" width="8" height="1" fill="#1084D0" />
    {/* Pencil */}
    <path d="M21 28L28 14L30 16L23 30Z" fill="#FFCC00" stroke="#000000" strokeWidth="1" />
    <path d="M20 29L21 28L23 30Z" fill="#FF9999" />
    <path d="M28 14L30 16L31 15L29 13Z" fill="#333333" />
  </svg>
);

// Calculator
export const CalculatorIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Calc body */}
    <rect x="6" y="3" width="20" height="26" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="7" y="4" width="18" height="1" fill="#FFFFFF" />
    <rect x="7" y="4" width="1" height="24" fill="#FFFFFF" />
    {/* LCD Screen */}
    <rect x="9" y="6" width="14" height="6" fill="#A0C8A0" stroke="#808080" strokeWidth="1" />
    <rect x="11" y="8" width="10" height="2" fill="#000000" />
    {/* Buttons Grid */}
    <rect x="9" y="14" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="13" y="14" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="17" y="14" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="21" y="14" width="3" height="3" fill="#FF5555" stroke="#000000" strokeWidth="1" />

    <rect x="9" y="18" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="13" y="18" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="17" y="18" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="21" y="18" width="3" height="3" fill="#5555FF" stroke="#000000" strokeWidth="1" />

    <rect x="9" y="22" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="13" y="22" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="17" y="22" width="3" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="21" y="22" width="3" height="5" fill="#55FF55" stroke="#000000" strokeWidth="1" />
  </svg>
);

// MS-DOS Command Prompt Terminal
export const TerminalIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    <rect x="3" y="4" width="26" height="23" fill="#000000" stroke="#808080" strokeWidth="1" />
    <rect x="3" y="4" width="26" height="4" fill="#000080" />
    <rect x="5" y="5" width="8" height="2" fill="#FFFFFF" />
    {/* Prompt C:\> */}
    <rect x="6" y="11" width="3" height="4" fill="#FFFF00" />
    <rect x="10" y="12" width="2" height="1" fill="#FFFF00" />
    <rect x="13" y="11" width="2" height="4" fill="#FFFF00" />
    <rect x="16" y="11" width="1" height="4" fill="#00FF00" />
    <rect x="18" y="12" width="2" height="2" fill="#00FF00" />
    {/* Blinking cursor */}
    <rect x="21" y="14" width="3" height="1" fill="#00FF00" />
    <rect x="6" y="18" width="16" height="1" fill="#00FF00" />
    <rect x="6" y="21" width="12" height="1" fill="#00FF00" />
  </svg>
);

// MS Paint (Palette with Brushes)
export const PaintIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Palette */}
    <path
      d="M6 14C6 8 10 4 17 4C24 4 28 8 28 15C28 22 23 27 16 27C12 27 6 24 6 18C6 16 9 17 10 16C11 15 10 13 8 13C6.5 13 6 15 6 14Z"
      fill="#EFE8D8"
      stroke="#000000"
      strokeWidth="1"
    />
    {/* Paint Wells */}
    <circle cx="11" cy="9" r="2" fill="#FF0000" />
    <circle cx="16" cy="7" r="2" fill="#FFFF00" />
    <circle cx="21" cy="9" r="2" fill="#00AA00" />
    <circle cx="24" cy="14" r="2" fill="#0000FF" />
    <circle cx="21" cy="20" r="2" fill="#800080" />
    {/* Thumb hole */}
    <ellipse cx="14" cy="21" rx="2.5" ry="3.5" fill="#808080" stroke="#000000" strokeWidth="1" />
    {/* Brush */}
    <rect x="3" y="26" width="16" height="3" fill="#996633" transform="rotate(-45 3 26)" stroke="#000000" strokeWidth="1" />
    <rect x="14" y="15" width="4" height="4" fill="#C0C0C0" transform="rotate(-45 14 15)" />
    <rect x="17" y="12" width="3" height="4" fill="#000000" transform="rotate(-45 17 12)" />
  </svg>
);

// Projects Folder (Manila Folder with Code Sheets)
export const ProjectsFolderIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Back folder flap */}
    <path d="M4 6H13L16 9H28V24H4V6Z" fill="#D4AF37" stroke="#000000" strokeWidth="1" />
    {/* Inserted sheet */}
    <rect x="7" y="8" width="17" height="15" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="9" y="11" width="10" height="1" fill="#000080" />
    <rect x="9" y="13" width="13" height="1" fill="#808080" />
    <rect x="9" y="15" width="8" height="1" fill="#808080" />
    {/* Front folder body */}
    <path d="M3 12H29L26 26H3V12Z" fill="#FFE066" stroke="#000000" strokeWidth="1" />
    <path d="M3 13H28L25 25H4V13Z" fill="#FFF080" />
  </svg>
);

// Skills Toolbox
export const SkillsIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Toolbox Case */}
    <rect x="4" y="11" width="24" height="16" fill="#CC0000" stroke="#000000" strokeWidth="1" />
    <rect x="5" y="12" width="22" height="1" fill="#FF6666" />
    {/* Handle */}
    <rect x="11" y="6" width="10" height="5" fill="none" stroke="#000000" strokeWidth="1.5" />
    <rect x="12" y="7" width="8" height="2" fill="#C0C0C0" />
    {/* Metal Latches */}
    <rect x="8" y="14" width="3" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="21" y="14" width="3" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    {/* Center Plate with Wrench */}
    <rect x="13" y="15" width="6" height="6" fill="#808080" stroke="#000000" strokeWidth="1" />
    <path d="M14 17L17 20" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

// Stats Monitor / Graph
export const StatsIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    <rect x="4" y="4" width="24" height="23" fill="#000000" stroke="#808080" strokeWidth="1" />
    <rect x="5" y="5" width="22" height="21" fill="#001800" />
    {/* Grid lines */}
    <line x1="5" y1="10" x2="27" y2="10" stroke="#003300" strokeWidth="1" />
    <line x1="5" y1="16" x2="27" y2="16" stroke="#003300" strokeWidth="1" />
    <line x1="5" y1="21" x2="27" y2="21" stroke="#003300" strokeWidth="1" />
    {/* Bar chart bars */}
    <rect x="7" y="18" width="3" height="7" fill="#00FF00" />
    <rect x="12" y="13" width="3" height="12" fill="#00FF00" />
    <rect x="17" y="8" width="3" height="17" fill="#00FF00" />
    <rect x="22" y="11" width="3" height="14" fill="#00FF00" />
    {/* Trending line */}
    <path d="M8 18L13 13L18 8L23 11" stroke="#FFFF00" strokeWidth="1.5" fill="none" />
  </svg>
);

// Contact / Mail Icon
export const ContactMailIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Envelope Body */}
    <rect x="3" y="7" width="26" height="18" fill="#FFFFCC" stroke="#000000" strokeWidth="1" />
    {/* Stamp */}
    <rect x="22" y="9" width="5" height="6" fill="#CC0000" stroke="#000000" strokeWidth="0.5" />
    {/* Flap lines */}
    <path d="M3 8L16 17L29 8" stroke="#808080" strokeWidth="1" />
    <path d="M3 24L12 16" stroke="#808080" strokeWidth="1" />
    <path d="M29 24L20 16" stroke="#808080" strokeWidth="1" />
  </svg>
);

// Guestbook Icon (Ledger Book with Quill)
export const GuestbookIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    <rect x="4" y="5" width="22" height="22" fill="#800000" stroke="#000000" strokeWidth="1" />
    <rect x="7" y="6" width="18" height="20" fill="#FFFFEE" stroke="#808080" strokeWidth="1" />
    <rect x="9" y="9" width="13" height="2" fill="#000080" />
    <rect x="9" y="13" width="14" height="1" fill="#808080" />
    <rect x="9" y="16" width="14" height="1" fill="#808080" />
    <rect x="9" y="19" width="10" height="1" fill="#808080" />
    {/* Ribbon bookmark */}
    <path d="M14 6V24L17 21L20 24V6H14Z" fill="#0000AA" />
  </svg>
);

// System Properties Icon
export const SystemPropertiesIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    <rect x="4" y="4" width="22" height="24" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="5" y="5" width="20" height="4" fill="#000080" />
    {/* Gear icon overlay */}
    <circle cx="18" cy="18" r="7" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <circle cx="18" cy="18" r="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <rect x="17" y="9" width="2" height="4" fill="#000000" />
    <rect x="17" y="23" width="2" height="4" fill="#000000" />
    <rect x="9" y="17" width="4" height="2" fill="#000000" />
    <rect x="23" y="17" width="4" height="2" fill="#000000" />
  </svg>
);

// Recycle Bin
export const RecycleBinIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    {/* Bin lid */}
    <rect x="8" y="5" width="16" height="3" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    <rect x="13" y="3" width="6" height="2" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
    {/* Wire basket */}
    <path d="M9 8L11 27H21L23 8H9Z" fill="#E8E8E8" stroke="#000000" strokeWidth="1" />
    {/* Mesh pattern */}
    <line x1="12" y1="9" x2="13" y2="26" stroke="#808080" strokeWidth="1" />
    <line x1="16" y1="9" x2="16" y2="26" stroke="#808080" strokeWidth="1" />
    <line x1="20" y1="9" x2="19" y2="26" stroke="#808080" strokeWidth="1" />
    <line x1="10" y1="14" x2="22" y2="14" stroke="#808080" strokeWidth="1" />
    <line x1="11" y1="20" x2="21" y2="20" stroke="#808080" strokeWidth="1" />
  </svg>
);

// Sound / Volume Icon
export const SoundIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ shapeRendering: 'crispEdges' }}>
    <path d="M2 5H5L9 2V14L5 11H2V5Z" fill="#000000" stroke="#000000" strokeWidth="0.5" />
    <path d="M11 5C12 6 12 10 11 11" stroke="#000000" strokeWidth="1" fill="none" />
    <path d="M13 3C15 5 15 11 13 13" stroke="#000000" strokeWidth="1" fill="none" />
  </svg>
);
