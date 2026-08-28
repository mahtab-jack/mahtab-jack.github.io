import { useEffect, useState } from 'react';
import { GITHUB_USERNAME } from '../../types';
import './Programs.css';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  fork: boolean;
  updated_at: string;
}

const LANG_COLORS: Record<string, string> = {
  Dart: '#00B4AB',
  JavaScript: '#F1E05A',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Python: '#3572A5',
  Java: '#B07219',
  'C++': '#F34B7D',
  TypeScript: '#2B7489',
  Kotlin: '#A97BFF',
  Swift: '#FFAC45',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Ruby: '#701516',
  PHP: '#4F5D95',
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch');
        return r.json();
      })
      .then((data: Repo[]) => {
        setRepos(data.filter(r => !r.fork && r.name !== `${GITHUB_USERNAME}.github.io`));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item">File</span>
        <span className="toolbar-item">Edit</span>
        <span className="toolbar-item">View</span>
        <span className="toolbar-item">Tools</span>
        <span className="toolbar-item">Help</span>
      </div>

      <div className="program-address-bar">
        <span className="address-label">Address:</span>
        <span className="address-value">
          github.com/{GITHUB_USERNAME}
        </span>
      </div>

      <div className="program-body">
        {loading && (
          <div className="loading-box">
            <span className="blink-text">Loading repositories...</span>
          </div>
        )}

        {error && (
          <div className="error-box">Error: {error}</div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="loading-box">No repositories found.</div>
        )}

        {repos.map(repo => (
          <div key={repo.id} className="project-row">
            <div className="project-row-icon">{'\u{1F4C4}'}</div>
            <div className="project-row-info">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row-name"
              >
                {repo.name}
              </a>
              <div className="project-row-desc">
                {repo.description || 'No description provided.'}
              </div>
              <div className="project-row-meta">
                {repo.language && (
                  <span className="project-lang-badge">
                    <span
                      className="lang-dot"
                      style={{ background: LANG_COLORS[repo.language] || '#808080' }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="project-stars">
                  {'\u2605'} {repo.stargazers_count}
                </span>
                <span className="project-forks">
                  {'\u{1F500}'} {repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
