import React, { useState } from 'react';
import './LockScreen.css';

interface LockScreenProps {
  onUnlock: () => void;
  username?: string;
  avatarUrl?: string;
}

export default function LockScreen({
  onUnlock,
  username = 'Mahtab Jack',
  avatarUrl = 'https://avatars.githubusercontent.com/u/111902189?v=4',
}: LockScreenProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      onUnlock();
    }, 450);
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
          <form
            className={`lockscreen-user-card ${isLoggingIn ? 'logging-in' : ''}`}
            onSubmit={handleLogin}
          >
            <div
              className="lockscreen-avatar-frame"
              onClick={() => handleLogin()}
              title="Click to Log In"
            >
              <img
                src={avatarUrl}
                alt={username}
                className="lockscreen-avatar-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './files/lockscreen.png';
                }}
              />
            </div>

            <div className="lockscreen-user-details">
              <span className="lockscreen-username" onClick={() => handleLogin()}>
                {username}
              </span>

              {/* Password / Login Button Row */}
              <div className="lockscreen-login-row">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type password (optional)"
                  className="lockscreen-password-input"
                  disabled={isLoggingIn}
                  autoFocus
                />
                <button
                  type="submit"
                  className="lockscreen-login-btn"
                  disabled={isLoggingIn}
                  title="Log In"
                >
                  <span className="login-arrow">&#x2794;</span>
                  <span className="login-text">Log In</span>
                </button>
              </div>

              <span className="lockscreen-user-status">
                {isLoggingIn ? 'Loading your personal settings...' : 'Developer / Portfolio'}
              </span>
            </div>
          </form>
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
