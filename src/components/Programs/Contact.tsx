import { ProgramIcon } from '../Icons/ProgramIcon';
import './Programs.css';

const CONTACTS = [
  {
    iconId: 'contact',
    label: 'Email',
    value: 'mahtabjack@gmail.com',
    url: 'mailto:mahtabjack@gmail.com',
  },
  {
    iconId: 'mycomputer',
    label: 'GitHub',
    value: 'mahtab-jack',
    url: 'https://github.com/mahtab-jack',
  },
  {
    iconId: 'ie',
    label: 'Blog',
    value: 'blogthread.in',
    url: 'https://blogthread.in/',
  },
  {
    iconId: 'properties',
    label: 'Twitter / X',
    value: '@mahtab_jack',
    url: 'https://twitter.com/mahtab_jack',
  },
];

export default function Contact() {
  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      <div className="program-body">
        <h3 className="section-title">Get In Touch</h3>
        <p className="section-desc">Feel free to reach out through any of these channels!</p>

        <div className="contact-grid">
          {CONTACTS.map(c => (
            <a
              key={c.label}
              href={c.url}
              target={c.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-card-icon">
                <ProgramIcon iconId={c.iconId} size={32} />
              </div>
              <div className="contact-card-label">{c.label}</div>
              <div className="contact-card-value">{c.value}</div>
            </a>
          ))}
        </div>

        <div className="hr-groove" />

        <div className="contact-cta">
          <div className="construction-stripe" />
          <div className="cta-inner">
            <strong style={{ display: 'block', marginBottom: 4 }}>Let's Build Something Together!</strong>
            <p>Interested in collaborating? Have a project idea? Don't be a stranger -- reach out!</p>
          </div>
          <div className="construction-stripe" />
        </div>
      </div>
    </div>
  );
}
