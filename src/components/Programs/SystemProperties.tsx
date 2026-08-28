import { useState } from 'react';
import { Win95LogoIcon } from '../Icons/Win95Icons';
import { GITHUB_USERNAME } from '../../types';
import './Programs.css';

export default function SystemProperties() {
  const [activeTab, setActiveTab] = useState<'general' | 'developer' | 'performance'>('general');

  return (
    <div className="program-content sys-properties-container">
      {/* Tabs */}
      <div className="sys-tabs-bar">
        <button
          className={`sys-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`sys-tab-btn ${activeTab === 'developer' ? 'active' : ''}`}
          onClick={() => setActiveTab('developer')}
        >
          Developer
        </button>
        <button
          className={`sys-tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
      </div>

      {/* Tab Panel */}
      <div className="sys-tab-panel">
        {activeTab === 'general' && (
          <div className="sys-panel-content">
            <div className="sys-general-header">
              <div className="sys-logo-frame">
                <Win95LogoIcon size={48} />
              </div>
              <div className="sys-general-info">
                <strong>System:</strong>
                <div>Microsoft Windows 95</div>
                <div>Mahtab Jack Edition (Build 4.00.950)</div>
                <br />
                <strong>Registered to:</strong>
                <div>Mahtab Jack (Mahtab Alam)</div>
                <div>Location: Bihar, India</div>
                <div>ID: 1337-MAHTAB-95</div>
                <br />
                <strong>Computer:</strong>
                <div>Flutter & Dart Engine</div>
                <div>React 19 + TypeScript Kernel</div>
                <div>Resolution: {window.innerWidth} x {window.innerHeight}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'developer' && (
          <div className="sys-panel-content">
            <div className="sys-device-tree">
              <div className="tree-node">
                <strong>+ Computer (Mahtab Jack)</strong>
                <div className="tree-leaf">&bull; Primary Stack: Flutter, Dart, Android, Windows</div>
                <div className="tree-leaf">&bull; Web Technologies: React, TypeScript, HTML5, CSS3</div>
                <div className="tree-leaf">&bull; Version Control: Git / GitHub ({GITHUB_USERNAME})</div>
                <div className="tree-leaf">&bull; Cloud & DB: Firebase, REST APIs, JSON</div>
                <div className="tree-leaf">&bull; Blog: <a href="https://blogthread.in/" target="_blank" rel="noopener noreferrer">blogthread.in</a></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="sys-panel-content">
            <strong>Performance Status:</strong>
            <table className="info-table" style={{ marginTop: 8 }}>
              <tbody>
                <tr>
                  <td>Memory:</td>
                  <td>64.0MB Virtual RAM / Unlimited Ideas</td>
                </tr>
                <tr>
                  <td>System Resources:</td>
                  <td>98% Free</td>
                </tr>
                <tr>
                  <td>File System:</td>
                  <td>FAT32 (Virtual Browser Storage Active)</td>
                </tr>
                <tr>
                  <td>Virtual Memory:</td>
                  <td>32-bit Paging</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: 12, padding: 8, background: '#FFFFCC', border: '1px solid #808080' }}>
              Your system is configured for optimum developer productivity.
            </div>
          </div>
        )}
      </div>

      {/* Dialog buttons */}
      <div className="sys-dialog-footer">
        <button className="btn-retro accent" onClick={() => alert('System settings are optimal!')}>OK</button>
        <button className="btn-retro" onClick={() => alert('Changes discarded.')}>Cancel</button>
      </div>
    </div>
  );
}
