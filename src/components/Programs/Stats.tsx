import { useEffect, useState } from 'react';
import { GITHUB_USERNAME } from '../../types';
import './Programs.css';

export default function Stats() {
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    gists: 0,
  });

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(r => r.json())
      .then(data => {
        setStats({
          repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          gists: data.public_gists ?? 0,
        });
      })
      .catch(() => {});
  }, []);

  const pad = (n: number) => String(n).padStart(4, '0');

  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item">View</span>
        <span className="toolbar-item">Help</span>
      </div>

      <div className="program-body">
        <div className="stats-display">
          <div className="stats-terminal">
            <div className="stats-terminal-header">GitHub Statistics Monitor</div>
            <div className="stats-terminal-body">
              <div className="stat-row">
                <span className="stat-label">PUBLIC REPOS....</span>
                <span className="stat-val">{pad(stats.repos)}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">FOLLOWERS.......</span>
                <span className="stat-val">{pad(stats.followers)}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">FOLLOWING.......</span>
                <span className="stat-val">{pad(stats.following)}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">PUBLIC GISTS....</span>
                <span className="stat-val">{pad(stats.gists)}</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-row">
                <span className="stat-label">VISITOR COUNT...</span>
                <span className="stat-val">{pad(1337 + (Math.floor(Date.now() / 86400000) % 9999))}</span>
              </div>
              <div className="stat-row dim">
                <span className="stat-label">ONLINE SINCE....</span>
                <span className="stat-val">AUG 2022</span>
              </div>
              <div className="stat-row dim">
                <span className="stat-label">PAGE LOADED.....</span>
                <span className="stat-val">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
