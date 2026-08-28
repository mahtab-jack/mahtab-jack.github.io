import { useEffect, useState } from 'react';
import { GITHUB_USERNAME } from '../../types';
import './Programs.css';

interface GitHubProfile {
  name: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

export default function AboutMe() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(r => r.json())
      .then(data => setProfile(data))
      .catch(() => {});
  }, []);

  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item">File</span>
        <span className="toolbar-item">Edit</span>
        <span className="toolbar-item">View</span>
        <span className="toolbar-item">Help</span>
      </div>

      <div className="program-body">
        {/* Profile header */}
        <div className="about-header">
          <div className="about-avatar-frame">
            <img
              src={profile?.avatar_url || `https://avatars.githubusercontent.com/u/111902189?v=4`}
              alt="Mahtab Jack"
              width="100"
              height="100"
            />
          </div>
          <div className="about-header-text">
            <h2 className="about-name rainbow-text">Mahtab Jack</h2>
            <p className="about-handle">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
                @{GITHUB_USERNAME}
              </a>
            </p>
            <p className="about-bio">{profile?.bio || ':)'}</p>
          </div>
        </div>

        <div className="hr-groove" />

        {/* Info table */}
        <table className="info-table">
          <tbody>
            <tr>
              <td className="info-key">Name</td>
              <td>{profile?.name || 'Mahtab Jack'}</td>
            </tr>
            <tr>
              <td className="info-key">Location</td>
              <td>{profile?.location || 'Bihar, India'}</td>
            </tr>
            <tr>
              <td className="info-key">Blog</td>
              <td>
                <a href="https://blogthread.in/" target="_blank" rel="noopener noreferrer">
                  blogthread.in
                </a>
              </td>
            </tr>
            <tr>
              <td className="info-key">Twitter</td>
              <td>
                <a href={`https://twitter.com/${profile?.twitter_username || 'mahtab_jack'}`} target="_blank" rel="noopener noreferrer">
                  @{profile?.twitter_username || 'mahtab_jack'}
                </a>
              </td>
            </tr>
            <tr>
              <td className="info-key">Repos</td>
              <td className="mono-text">{profile?.public_repos ?? '--'}</td>
            </tr>
            <tr>
              <td className="info-key">Followers</td>
              <td className="mono-text">{profile?.followers ?? '--'}</td>
            </tr>
            <tr>
              <td className="info-key">Following</td>
              <td className="mono-text">{profile?.following ?? '--'}</td>
            </tr>
            <tr>
              <td className="info-key">Member Since</td>
              <td className="mono-text">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  : 'August 2022'}
              </td>
            </tr>
            <tr>
              <td className="info-key">Status</td>
              <td style={{ color: '#00AA00', fontWeight: 'bold' }}>ONLINE :)</td>
            </tr>
          </tbody>
        </table>

        <div className="hr-groove" />

        <div className="about-readme">
          <div className="readme-header">README.txt</div>
          <div className="readme-body">
            <p>Hey there! I'm <strong>Mahtab Jack</strong> (Mahtab Alam), a developer from <strong>Bihar, India</strong>.</p>
            <p>I build things that work -- from clipboard managers to live TV apps. My weapon of choice is <strong>Flutter & Dart</strong>, and I love crafting desktop & mobile applications that are sleek and functional.</p>
            <p>When I'm not coding, you can find me exploring new tech, writing on my blog, or just vibing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
