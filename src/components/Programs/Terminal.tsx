import React, { useState, useRef, useEffect } from 'react';
import { GITHUB_USERNAME } from '../../types';
import './Programs.css';

interface CommandOutput {
  command?: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      output: (
        <div>
          <div>Microsoft(R) Windows 95</div>
          <div>(C)Copyright Microsoft Corp 1981-1995.</div>
          <div style={{ margin: '8px 0', color: '#FFFF55' }}>
            Type 'help' or 'dir' to list available portfolio commands.
          </div>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const [cmd, ...args] = trimmed.toLowerCase().split(' ');
    const argString = args.join(' ');

    if (!trimmed) {
      setHistory(prev => [...prev, { command: '', output: null }]);
      return;
    }

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryPointer(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="terminal-help">
            <div>Supported MS-DOS Commands:</div>
            <div><strong>DIR</strong>        - List portfolio directory files</div>
            <div><strong>TYPE / CAT</strong> - Display text file contents (e.g. TYPE ABOUT.TXT)</div>
            <div><strong>WHOAMI</strong>      - Developer identity details</div>
            <div><strong>SKILLS</strong>      - Display programming skills & tools</div>
            <div><strong>PROJECTS</strong>    - Display featured GitHub repositories</div>
            <div><strong>CONTACT</strong>     - Display contact channels</div>
            <div><strong>BLOG</strong>        - Open Mahtab's Blog URL</div>
            <div><strong>GITHUB</strong>      - Open GitHub profile URL</div>
            <div><strong>CLS / CLEAR</strong> - Clear screen buffer</div>
            <div><strong>DATE / TIME</strong> - Display current system time</div>
            <div><strong>ECHO</strong>        - Print text to screen</div>
            <div><strong>VER</strong>         - Display MS-DOS version</div>
          </div>
        );
        break;

      case 'dir':
        output = (
          <div className="terminal-dir">
            <div> Volume in drive C is MAHTAB95</div>
            <div> Volume Serial Number is 1337-4242</div>
            <div> Directory of C:\PORTFOLIO</div>
            <br />
            <div>.              &lt;DIR&gt;        08-23-22  12:00p</div>
            <div>..             &lt;DIR&gt;        08-23-22  12:00p</div>
            <div>ABOUT    TXT          2,450  08-28-26   4:30p</div>
            <div>SKILLS   DAT          1,024  08-28-26   4:30p</div>
            <div>CLIPDOCK FLT         15,480  08-15-26   9:10a</div>
            <div>NEWSTV   FLT         24,960  08-20-26   2:15p</div>
            <div>GUESTBK  DB           4,096  08-28-26   5:00p</div>
            <br />
            <div>        5 File(s)         48,010 bytes</div>
            <div>        2 Dir(s)     420,690,000 bytes free</div>
          </div>
        );
        break;

      case 'type':
      case 'cat':
        if (!argString) {
          output = <div>Usage: TYPE &lt;filename&gt; (e.g. TYPE ABOUT.TXT)</div>;
        } else if (argString.includes('about')) {
          output = (
            <div>
              [ABOUT.TXT]<br />
              Name: Mahtab Jack (Mahtab Alam)<br />
              Location: Bihar, India<br />
              Specialization: Flutter & Dart Desktop/Mobile Apps, React Web<br />
              Blog: https://blogthread.in/<br />
              GitHub: https://github.com/{GITHUB_USERNAME}
            </div>
          );
        } else if (argString.includes('skills')) {
          output = <div>Flutter, Dart, HTML5, CSS3, JavaScript, TypeScript, Git, Firebase, Android, Windows</div>;
        } else {
          output = <div>File not found - {argString}</div>;
        }
        break;

      case 'whoami':
        output = (
          <div>
            Mahtab Jack (@{GITHUB_USERNAME})<br />
            Developer from Bihar, India.<br />
            Crafting elegant, high-performance desktop and mobile apps with Flutter & Dart.
          </div>
        );
        break;

      case 'skills':
        output = (
          <div>
            <div>=== PRIMARY LANGUAGES & TECHNOLOGIES ===</div>
            <div>- Flutter & Dart (Desktop & Mobile Application Architecture)</div>
            <div>- HTML5 / CSS3 / JavaScript / TypeScript</div>
            <div>- Git / GitHub / CI/CD Actions</div>
            <div>- Firebase / REST APIs / State Management</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div>
            <div>=== FEATURED REPOSITORIES ===</div>
            <div>1. ClipDock - Modern screen-edge Windows clipboard manager (Flutter)</div>
            <div>2. News-TV  - Live TV streaming desktop app with remote control (Flutter)</div>
            <div>3. Portfolio - Windows 95 Desktop Simulator (React + TypeScript)</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div>
            <div>Email:   mahtabjack@gmail.com</div>
            <div>Twitter: @mahtab_jack</div>
            <div>GitHub:  https://github.com/{GITHUB_USERNAME}</div>
            <div>Blog:    https://blogthread.in/</div>
          </div>
        );
        break;

      case 'blog':
        window.open('https://blogthread.in/', '_blank');
        output = <div>Launching https://blogthread.in/ in browser...</div>;
        break;

      case 'github':
        window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank');
        output = <div>Launching https://github.com/{GITHUB_USERNAME} in browser...</div>;
        break;

      case 'ver':
        output = <div>MS-DOS Version 7.00 (Windows 95 Mahtab Edition)</div>;
        break;

      case 'date':
      case 'time':
        output = <div>Current Date & Time: {new Date().toLocaleString()}</div>;
        break;

      case 'echo':
        output = <div>{argString}</div>;
        break;

      case 'cls':
      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div>
            Bad command or file name: '{trimmed}'. Type 'help' for a list of commands.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const newPtr = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(newPtr);
        setInput(cmdHistory[newPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyPointer !== -1) {
        const newPtr = historyPointer + 1;
        if (newPtr >= cmdHistory.length) {
          setHistoryPointer(-1);
          setInput('');
        } else {
          setHistoryPointer(newPtr);
          setInput(cmdHistory[newPtr]);
        }
      }
    }
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {history.map((h, i) => (
          <div key={i} className="terminal-entry">
            {h.command !== undefined && (
              <div className="terminal-cmd-line">
                <span className="terminal-prompt">C:\PORTFOLIO&gt;</span>
                <span className="terminal-cmd-text">{h.command}</span>
              </div>
            )}
            {h.output && <div className="terminal-cmd-result">{h.output}</div>}
          </div>
        ))}

        <div className="terminal-active-line">
          <span className="terminal-prompt">C:\PORTFOLIO&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
