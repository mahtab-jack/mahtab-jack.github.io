import './Programs.css';

const CONTACTS = [
  {
    icon: '\u{1F4BB}',
    label: 'GitHub',
    value: 'mahtab-jack',
    url: 'https://github.com/mahtab-jack',
  },
  {
    icon: '\u{1F426}',
    label: 'Twitter / X',
    value: '@mahtab_jack',
    url: 'https://twitter.com/mahtab_jack',
  },
  {
    icon: '\u{1F4DD}',
    label: 'Blog',
    value: 'blogthread.in',
    url: 'https://blogthread.in/',
  },
  {
    icon: '\u2709',
    label: 'Email',
    value: 'mahtabjack@gmail.com',
    url: 'mailto:mahtabjack@gmail.com',
  },
];

export default function Contact() {
  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item">File</span>
        <span className="toolbar-item">Help</span>
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
              <div className="contact-card-icon">{c.icon}</div>
              <div className="contact-card-label">{c.label}</div>
              <div className="contact-card-value">{c.value}</div>
            </a>
          ))}
        </div>

        <div className="hr-groove" />

        <div className="contact-cta">
          <div className="construction-stripe" />
          <div className="cta-inner">
            <strong>Let's Build Something Together!</strong>
            <p>Interested in collaborating? Have a project idea? Don't be a stranger -- reach out!</p>
          </div>
          <div className="construction-stripe" />
        </div>
      </div>
    </div>
  );
}
