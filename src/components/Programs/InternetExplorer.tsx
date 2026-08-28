import React, { useState } from 'react';
import { GITHUB_USERNAME } from '../../types';
import './Programs.css';

interface InternetExplorerProps {
  initialUrl?: string;
}

const BOOKMARKS = [
  { name: 'My Blog', url: 'https://blogthread.in/' },
  { name: 'GitHub Profile', url: `https://github.com/${GITHUB_USERNAME}` },
  { name: 'ClipDock Repo', url: `https://github.com/${GITHUB_USERNAME}/ClipDock` },
  { name: 'News-TV Repo', url: `https://github.com/${GITHUB_USERNAME}/News-TV` },
  { name: 'Twitter / X', url: 'https://twitter.com/mahtab_jack' },
];

export default function InternetExplorer({ initialUrl = 'https://blogthread.in/' }: InternetExplorerProps) {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (targetUrl: string) => {
    let formatted = targetUrl.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }
    setUrl(formatted);
    setInputUrl(formatted);
    const newHistory = [...history.slice(0, historyIndex + 1), formatted];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevUrl = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setUrl(prevUrl);
      setInputUrl(prevUrl);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setUrl(nextUrl);
      setInputUrl(nextUrl);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigateTo(inputUrl);
    }
  };

  // Determine if URL is likely blocked by X-Frame-Options
  const isProtectedSite = url.includes('github.com') || url.includes('twitter.com') || url.includes('x.com');

  return (
    <div className="program-content ie-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item"><u>E</u>dit</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>G</u>o</span>
        <span className="toolbar-item"><u>F</u>avorites</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      {/* Navigation Buttons Bar */}
      <div className="ie-nav-bar">
        <button
          className="ie-nav-btn"
          disabled={historyIndex === 0}
          onClick={handleBack}
          title="Back"
        >
          &larr; Back
        </button>
        <button
          className="ie-nav-btn"
          disabled={historyIndex >= history.length - 1}
          onClick={handleForward}
          title="Forward"
        >
          Forward &rarr;
        </button>
        <button className="ie-nav-btn" onClick={handleRefresh} title="Refresh">
          &#x21bb; Refresh
        </button>
        <button className="ie-nav-btn" onClick={() => navigateTo('https://blogthread.in/')} title="Home">
          &#x2302; Home
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ie-nav-btn ie-external-btn"
          title="Open in real browser tab"
        >
          &#x2197; Open Tab
        </a>
      </div>

      {/* Address Bar & Quick Links */}
      <div className="program-address-bar">
        <span className="address-label"><u>A</u>ddress:</span>
        <input
          type="text"
          className="ie-address-input"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn-retro" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => navigateTo(inputUrl)}>
          Go
        </button>
      </div>

      {/* Bookmarks bar */}
      <div className="ie-bookmarks-bar">
        <span className="bookmarks-label">Links:</span>
        {BOOKMARKS.map((b) => (
          <button
            key={b.name}
            className="ie-bookmark-btn"
            onClick={() => navigateTo(b.url)}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Browser Viewport */}
      <div className="ie-viewport">
        {isLoading ? (
          <div className="ie-loading">
            <div className="ie-loading-globe">&#x1F30E;</div>
            <div className="blink-text">Loading {url}...</div>
          </div>
        ) : isProtectedSite ? (
          <div className="ie-embedded-site-card">
            <div className="ie-site-header">
              <h3>{url.includes('github.com') ? 'GitHub Profile / Repository' : 'Social Profile'}</h3>
              <p>URL: <code>{url}</code></p>
            </div>
            <div className="ie-site-content">
              <p>
                <strong>Security Notice:</strong> Major platforms (GitHub, X) restrict iframe embedding via <code>X-Frame-Options: SAMEORIGIN</code>.
              </p>
              <div style={{ margin: '16px 0' }}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro accent"
                  style={{ display: 'inline-block', padding: '8px 16px', fontSize: '13px' }}
                >
                  Launch {url} in Browser Tab &rarr;
                </a>
              </div>
              <div className="ie-quick-preview">
                <h4>Quick Preview Links:</h4>
                <ul>
                  <li><a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">Mahtab Jack (@{GITHUB_USERNAME}) on GitHub</a></li>
                  <li><a href={`https://github.com/${GITHUB_USERNAME}/ClipDock`} target="_blank" rel="noopener noreferrer">ClipDock - Windows Clipboard Manager (Flutter)</a></li>
                  <li><a href={`https://github.com/${GITHUB_USERNAME}/News-TV`} target="_blank" rel="noopener noreferrer">News-TV - Live Desktop Streaming App (Flutter)</a></li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            title="Internet Explorer Browser View"
            className="ie-iframe"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">{isLoading ? 'Finding site...' : 'Done'}</span>
        <span className="status-cell">Internet Zone</span>
      </div>
    </div>
  );
}
