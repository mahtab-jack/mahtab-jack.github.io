import { useState } from 'react';
import './Programs.css';

export default function Guestbook() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="program-content">
      <div className="program-toolbar">
        <span className="toolbar-item">File</span>
        <span className="toolbar-item">Edit</span>
        <span className="toolbar-item">Help</span>
      </div>

      <div className="program-body">
        <div className="guestbook-header">
          <h3 className="section-title">Sign My Guestbook!</h3>
          <p className="section-desc">Leave a message -- I'd love to hear from you!</p>
        </div>

        <form className="guestbook-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gb-name">Your Name:</label>
            <input
              type="text"
              id="gb-name"
              className="retro-input"
              placeholder="Enter your name..."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gb-email">Your E-Mail:</label>
            <input
              type="email"
              id="gb-email"
              className="retro-input"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gb-message">Your Message:</label>
            <textarea
              id="gb-message"
              className="retro-input retro-textarea"
              placeholder="Write something nice..."
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-retro accent">Submit Message</button>
            <button type="reset" className="btn-retro">Clear Form</button>
          </div>
        </form>

        {submitted && (
          <div className="guestbook-success">
            Message sent! Thanks for signing the guestbook!
          </div>
        )}
      </div>
    </div>
  );
}
