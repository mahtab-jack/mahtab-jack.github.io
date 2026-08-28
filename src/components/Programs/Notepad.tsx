import { useState, useEffect } from 'react';
import './Programs.css';

interface NotepadProps {
  initialText?: string;
  documentTitle?: string;
}

const STORAGE_KEY = 'win95_notepad_content';
const SAVED_DOCS_KEY = 'win95_saved_documents';

export default function Notepad({ initialText = '', documentTitle = 'Untitled.txt' }: NotepadProps) {
  const [content, setContent] = useState<string>(() => {
    return initialText || localStorage.getItem(STORAGE_KEY) || 'Welcome to Notepad!\n\nYou can type notes here and they are automatically saved to your browser storage.\n\nAuthor: Mahtab Jack\nStack: Flutter, Dart, React, TypeScript';
  });
  const [wordWrap, setWordWrap] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [currentDocName, setCurrentDocName] = useState(documentTitle);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, content);
  }, [content]);

  const handleNew = () => {
    if (window.confirm('Create new document? Unsaved changes will be cleared.')) {
      setContent('');
      setCurrentDocName('Untitled.txt');
      setStatusMessage('New document created.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, content);
    // Save to documents list
    try {
      const saved = JSON.parse(localStorage.getItem(SAVED_DOCS_KEY) || '{}');
      saved[currentDocName] = content;
      localStorage.setItem(SAVED_DOCS_KEY, JSON.stringify(saved));
    } catch {}
    setStatusMessage(`Saved to browser storage! (${new Date().toLocaleTimeString()})`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSaveAs = () => {
    const filename = window.prompt('Enter filename to save:', currentDocName);
    if (filename) {
      setCurrentDocName(filename.endsWith('.txt') ? filename : `${filename}.txt`);
      try {
        const saved = JSON.parse(localStorage.getItem(SAVED_DOCS_KEY) || '{}');
        saved[filename] = content;
        localStorage.setItem(SAVED_DOCS_KEY, JSON.stringify(saved));
      } catch {}
      setStatusMessage(`Saved as ${filename}!`);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const lineCount = content.split('\n').length;
  const charCount = content.length;

  return (
    <div className="program-content notepad-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <div className="toolbar-menu-group">
          <button className="toolbar-item" onClick={handleNew}><u>F</u>ile: New</button>
          <button className="toolbar-item" onClick={handleSave}>Save</button>
          <button className="toolbar-item" onClick={handleSaveAs}>Save As...</button>
        </div>
        <div className="toolbar-menu-group">
          <button className="toolbar-item" onClick={() => setWordWrap(!wordWrap)}>
            <u>F</u>ormat: {wordWrap ? 'Wrap ON' : 'Wrap OFF'}
          </button>
        </div>
        <div className="toolbar-menu-group">
          <button className="toolbar-item" onClick={() => alert('Notepad (Windows 95 Edition)\nCreated for Mahtab Jack Portfolio\nFeatures localStorage persistence.')}>
            <u>H</u>elp
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="notepad-editor-area">
        <textarea
          className={`notepad-textarea ${wordWrap ? 'wrap' : 'nowrap'}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your notes here..."
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">{statusMessage || currentDocName}</span>
        <span className="status-cell">Lines: {lineCount}</span>
        <span className="status-cell">Chars: {charCount}</span>
        <span className="status-cell">Auto-Saved</span>
      </div>
    </div>
  );
}
