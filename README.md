# Mahtab Jack - Windows 95 Desktop Portfolio

An authentic **Windows 95 desktop simulator portfolio** built with **React, TypeScript, and Vite**, hosted on GitHub Pages.

Live URL: [https://mahtab-jack.github.io](https://mahtab-jack.github.io)

---

## Features

- **Windows 95 Desktop Environment**: Full-screen desktop with classic teal tiled wallpaper and desktop icons.
- **Window Management System**:
  - **Draggable**: Drag any window smoothly by its title bar.
  - **8-Direction Resizing**: Resize from any corner or edge.
  - **Minimize & Maximize**: Minimize to taskbar, maximize/restore by button or double-clicking the title bar.
  - **Z-Index Stacking**: Click to bring any window to the front with authentic active/inactive title bar gradient states.
- **Start Menu**: Classic Start button with program list, quick shortcuts, and restart/shut down options.
- **Taskbar**: Quick launch, active running window tabs (click to toggle minimize/focus), and system tray digital clock.
- **Programs**:
  - `About Me.exe`: Profile header, avatar, bio, info table, and notepad README.
  - `Projects.exe`: Live GitHub repository explorer with languages, stars, forks, and direct code links.
  - `Skills.exe`: Interactive 3D beveled toolbox tiles with press animation.
  - `Stats.exe`: Terminal-style retro monitor with live GitHub stats.
  - `Contact.exe`: Direct contact cards with construction-stripe CTA.
  - `Guestbook.exe`: Interactive guestbook sign form with retro input fields.
  - `Blog.url` & `GitHub.url`: Desktop internet shortcuts.
- **Zero Heavy External Window Libraries**: Lightweight custom pointer-event hooks (`useDraggable`, `useResizable`, `useWindowManager`).
- **Automated CI/CD**: GitHub Actions workflow builds and deploys to GitHub Pages on every push.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS (Authentic Win95 Design System, 3D bevels, zero border-radius)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/mahtab-jack/mahtab-jack.github.io.git
cd mahtab-jack.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Connect

- GitHub: [@mahtab-jack](https://github.com/mahtab-jack)
- Twitter: [@mahtab_jack](https://twitter.com/mahtab_jack)
- Blog: [blogthread.in](https://blogthread.in/)
