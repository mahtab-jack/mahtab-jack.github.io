import './Programs.css';

const SKILLS = [
  { name: 'Flutter', color: '#000080', textColor: '#fff' },
  { name: 'Dart', color: '#008080', textColor: '#fff' },
  { name: 'HTML', color: '#800000', textColor: '#fff' },
  { name: 'CSS', color: '#008000', textColor: '#fff' },
  { name: 'JavaScript', color: '#800080', textColor: '#fff' },
  { name: 'Git', color: '#808000', textColor: '#000' },
  { name: 'Firebase', color: '#FF0000', textColor: '#fff' },
  { name: 'VS Code', color: '#0000FF', textColor: '#fff' },
  { name: 'Android', color: '#00AA00', textColor: '#fff' },
  { name: 'Windows', color: '#FF8000', textColor: '#000' },
  { name: 'APIs', color: '#FF00FF', textColor: '#fff' },
  { name: 'UI/UX', color: '#00FFFF', textColor: '#000' },
];

export default function Skills() {
  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item">File</span>
        <span className="toolbar-item">View</span>
        <span className="toolbar-item">Help</span>
      </div>

      <div className="program-body">
        <div className="skills-header">
          <h3 className="section-title">My Toolbox</h3>
          <p className="section-desc">Technologies and tools I work with</p>
        </div>

        <div className="skills-grid">
          {SKILLS.map(skill => (
            <button
              key={skill.name}
              className="skill-tile"
              style={{ background: skill.color, color: skill.textColor }}
            >
              {skill.name}
            </button>
          ))}
        </div>

        <div className="hr-groove" />

        <div className="skills-note">
          <strong>Primary Stack:</strong> Flutter & Dart for cross-platform desktop and mobile applications.
          <br />
          <strong>Web:</strong> HTML, CSS, JavaScript/TypeScript.
          <br />
          <strong>Tools:</strong> Git, VS Code, Firebase, Android Studio.
        </div>
      </div>
    </div>
  );
}
