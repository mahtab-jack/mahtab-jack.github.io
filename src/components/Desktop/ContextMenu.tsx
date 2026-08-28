import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Adjust position if overflowing viewport
  const adjustedX = Math.min(x, window.innerWidth - 180);
  const adjustedY = Math.min(y, window.innerHeight - (items.length * 26 + 10));

  return (
    <div
      ref={menuRef}
      className="win95-context-menu"
      style={{ left: Math.max(0, adjustedX), top: Math.max(0, adjustedY) }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, idx) => {
        if (item.separator) {
          return <div key={`sep-${idx}`} className="context-menu-separator" />;
        }

        return (
          <div
            key={`item-${idx}`}
            className={`context-menu-item ${item.disabled ? 'disabled' : ''} ${item.submenu ? 'has-submenu' : ''}`}
            onClick={() => {
              if (item.disabled) return;
              if (item.onClick) {
                item.onClick();
                onClose();
              }
            }}
          >
            <span className="menu-item-icon">{item.icon || null}</span>
            <span className="menu-item-label">{item.label}</span>
            {item.shortcut && <span className="menu-item-shortcut">{item.shortcut}</span>}
            {item.submenu && <span className="menu-item-arrow">&#x25B8;</span>}

            {item.submenu && (
              <div className="context-submenu">
                {item.submenu.map((sub, subIdx) => (
                  <div
                    key={`sub-${subIdx}`}
                    className={`context-menu-item ${sub.disabled ? 'disabled' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (sub.disabled) return;
                      if (sub.onClick) {
                        sub.onClick();
                        onClose();
                      }
                    }}
                  >
                    <span className="menu-item-icon">{sub.icon || null}</span>
                    <span className="menu-item-label">{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
