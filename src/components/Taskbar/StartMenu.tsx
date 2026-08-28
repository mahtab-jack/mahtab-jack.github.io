import { useEffect, useRef, useState } from 'react';
import { PROGRAMS } from '../../types';
import type { ProgramDefinition } from '../../types';
import { ProgramIcon } from '../Icons/ProgramIcon';
import './StartMenu.css';

interface StartMenuProps {
  onOpenProgram: (program: ProgramDefinition, initialData?: any) => void;
  onClose: () => void;
}

export default function StartMenu({ onOpenProgram, onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const startBtn = document.querySelector('.taskbar-start-btn');
        if (startBtn && startBtn.contains(e.target as Node)) return;
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleItemClick = (progId: string, initialData?: any) => {
    const prog = PROGRAMS.find(p => p.id === progId);
    if (prog) {
      onOpenProgram(prog, initialData);
      onClose();
    }
  };

  const handleRun = () => {
    const cmd = window.prompt('Type the name of a program, folder, or document, and Windows will open it for you.\n\nOpen:', 'about');
    if (cmd) {
      const normalized = cmd.trim().toLowerCase().replace('.exe', '');
      const prog = PROGRAMS.find(p => p.id.toLowerCase().includes(normalized) || p.title.toLowerCase().includes(normalized));
      if (prog) {
        onOpenProgram(prog);
      } else {
        alert(`Cannot find '${cmd}'. Make sure you typed the name correctly, or choose from the Start menu.`);
      }
      onClose();
    }
  };

  const handleShutDown = () => {
    if (window.confirm('Are you sure you want to restart Windows 95?')) {
      window.location.reload();
    }
    onClose();
  };

  return (
    <div className="start-menu" ref={menuRef}>
      {/* Side banner */}
      <div className="start-menu-banner">
        <span className="banner-text">Windows<strong>95</strong></span>
      </div>

      {/* Program list */}
      <div className="start-menu-items">
        {/* Programs Submenu */}
        <div
          className="start-menu-item has-sub"
          onMouseEnter={() => setActiveSubmenu('programs')}
        >
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="projects" size={24} />
          </span>
          <span className="start-menu-item-label"><u>P</u>rograms</span>
          <span className="start-menu-item-arrow">&#x25B8;</span>

          {activeSubmenu === 'programs' && (
            <div className="start-submenu" onMouseLeave={() => setActiveSubmenu(null)}>
              {/* Accessories Nested */}
              <div className="start-menu-item" onClick={() => handleItemClick('notepad')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="notepad" size={20} /></span>
                <span className="start-menu-item-label">Notepad</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('paint')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="paint" size={20} /></span>
                <span className="start-menu-item-label">Paint</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('calculator')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="calculator" size={20} /></span>
                <span className="start-menu-item-label">Calculator</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('terminal')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="terminal" size={20} /></span>
                <span className="start-menu-item-label">MS-DOS Prompt</span>
              </div>
              <div className="start-menu-separator" />
              <div className="start-menu-item" onClick={() => handleItemClick('about')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="mycomputer" size={20} /></span>
                <span className="start-menu-item-label">About Me.exe</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('projects')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="projects" size={20} /></span>
                <span className="start-menu-item-label">Projects Explorer.exe</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('skills')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="skills" size={20} /></span>
                <span className="start-menu-item-label">Skills & Tools.exe</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('stats')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="stats" size={20} /></span>
                <span className="start-menu-item-label">System Monitor.exe</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('contact')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="contact" size={20} /></span>
                <span className="start-menu-item-label">Contact Mail.exe</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('guestbook')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="guestbook" size={20} /></span>
                <span className="start-menu-item-label">Guestbook.exe</span>
              </div>
            </div>
          )}
        </div>

        {/* Internet Explorer */}
        <div className="start-menu-item" onClick={() => handleItemClick('ie', { url: 'https://blogthread.in/' })}>
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="ie" size={24} />
          </span>
          <span className="start-menu-item-label">Internet Explorer</span>
        </div>

        {/* Documents */}
        <div
          className="start-menu-item has-sub"
          onMouseEnter={() => setActiveSubmenu('documents')}
        >
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="notepad" size={24} />
          </span>
          <span className="start-menu-item-label"><u>D</u>ocuments</span>
          <span className="start-menu-item-arrow">&#x25B8;</span>

          {activeSubmenu === 'documents' && (
            <div className="start-submenu" onMouseLeave={() => setActiveSubmenu(null)}>
              <div className="start-menu-item" onClick={() => handleItemClick('notepad', { title: 'README.txt', text: 'Hey there! I\'m Mahtab Jack (Mahtab Alam), a developer from Bihar, India.\n\nPrimary Stack: Flutter, Dart, React, TypeScript.\nBlog: https://blogthread.in/' })}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="notepad" size={18} /></span>
                <span className="start-menu-item-label">README.txt</span>
              </div>
              <div className="start-menu-item" onClick={() => handleItemClick('notepad')}>
                <span className="start-menu-item-icon"><ProgramIcon iconId="notepad" size={18} /></span>
                <span className="start-menu-item-label">Saved Notes...</span>
              </div>
            </div>
          )}
        </div>

        {/* Settings / System Properties */}
        <div className="start-menu-item" onClick={() => handleItemClick('properties')}>
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="properties" size={24} />
          </span>
          <span className="start-menu-item-label"><u>S</u>ettings (Properties)</span>
        </div>

        {/* Help */}
        <div className="start-menu-item" onClick={() => handleItemClick('about')}>
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="mycomputer" size={24} />
          </span>
          <span className="start-menu-item-label"><u>H</u>elp & About</span>
        </div>

        {/* Run */}
        <div className="start-menu-item" onClick={handleRun}>
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="terminal" size={24} />
          </span>
          <span className="start-menu-item-label"><u>R</u>un...</span>
        </div>

        <div className="start-menu-separator" />

        {/* Shut Down */}
        <div className="start-menu-item" onClick={handleShutDown}>
          <span className="start-menu-item-icon">
            <ProgramIcon iconId="win95" size={20} />
          </span>
          <span className="start-menu-item-label"><u>S</u>hut Down...</span>
        </div>
      </div>
    </div>
  );
}
