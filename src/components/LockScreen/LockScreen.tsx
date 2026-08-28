import { useState } from 'react';
import './LockScreen.css';

interface LockScreenProps {
  onUnlock: () => void;
  username?: string;
  avatarUrl?: string;
}

export default function LockScreen({
  onUnlock,
  username = 'Mahtab Jack',
  avatarUrl = './files/lockscreen.png',
}: LockScreenProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleUserClick = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      onUnlock();
    }, 400);
  };

  return (
    <div className="lockscreen-root">
      {/* Top Header Bar */}
      <div className="lockscreen-header-bar" />

      {/* Main Container */}
      <div className="lockscreen-main">
        {/* Left Section: Logo & Instructions */}
        <div className="lockscreen-left">
          <div className="lockscreen-logo-group">
            <div className="xp-logo-container">
              <span className="xp-ms-text">Microsoft<sup>&reg;</sup></span>
              <div className="xp-title-row">
                <span className="xp-windows-text">Windows</span>
                <span className="xp-badge">xp</span>
              </div>
            </div>
            <p className="lockscreen-instruction-text">To begin, click your user name</p>
          </div>
        </div>

        {/* Center Divider Line */}
        <div className="lockscreen-divider" />

        {/* Right Section: User Login Box */}
        <div className="lockscreen-right">
          <button
            className={`lockscreen-user-card ${isLoggingIn ? 'logging-in' : ''}`}
            onClick={handleUserClick}
            aria-label={`Log in as ${username}`}
          >
            <div className="lockscreen-avatar-frame">
              <img
                src={avatarUrl}
                alt={username}
                className="lockscreen-avatar-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/111902189?v=4';
                }}
              />
            </div>
            <div className="lockscreen-user-details">
              <span className="lockscreen-username">{username}</span>
              <span className="lockscreen-user-status">
                {isLoggingIn ? 'Loading your personal settings...' : 'Developer / Portfolio'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="lockscreen-footer-bar">
        <button
          className="lockscreen-shutdown-btn"
          onClick={() => {
            if (window.confirm('Restart Windows?')) {
              window.location.reload();
            }
          }}
        >
          <span className="shutdown-icon">&#x23FB;</span>
          <span>Turn off computer</span>
        </button>
      </div>
    </div>
  );
}
