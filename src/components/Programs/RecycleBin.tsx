import { useState } from 'react';
import './Programs.css';

interface DeletedItem {
  id: string;
  name: string;
  originalLocation: string;
  dateDeleted: string;
  size: string;
}

const INITIAL_ITEMS: DeletedItem[] = [
  { id: '1', name: 'boring_portfolio.html', originalLocation: 'C:\\Desktop', dateDeleted: '08/28/2026 12:00 PM', size: '2 KB' },
  { id: '2', name: 'legacy_jquery_site.zip', originalLocation: 'C:\\Projects', dateDeleted: '08/20/2026 03:15 PM', size: '1,420 KB' },
  { id: '3', name: 'unresponsive_css.css', originalLocation: 'C:\\Styles', dateDeleted: '08/15/2026 09:45 AM', size: '8 KB' },
];

export default function RecycleBin() {
  const [items, setItems] = useState<DeletedItem[]>(INITIAL_ITEMS);

  const handleEmpty = () => {
    if (items.length === 0) return;
    if (window.confirm('Are you sure you want to permanently delete these items?')) {
      setItems([]);
    }
  };

  const handleRestore = () => {
    setItems(INITIAL_ITEMS);
  };

  return (
    <div className="program-content recycle-container">
      <div className="program-toolbar">
        <span className="toolbar-item" onClick={handleEmpty}><u>F</u>ile: Empty Recycle Bin</span>
        <span className="toolbar-item" onClick={handleRestore}>Restore All</span>
        <span className="toolbar-item" onClick={() => alert('Recycle Bin (Windows 95 Edition)')}><u>H</u>elp</span>
      </div>

      <div className="program-body" style={{ padding: 0 }}>
        {items.length === 0 ? (
          <div className="loading-box">Recycle Bin is empty.</div>
        ) : (
          <table className="recycle-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Original Location</th>
                <th>Date Deleted</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><span style={{ marginRight: 6 }}>&#x1F5CE;</span>{item.name}</td>
                  <td>{item.originalLocation}</td>
                  <td>{item.dateDeleted}</td>
                  <td>{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="notepad-status-bar">
        <span className="status-cell flex-1">{items.length} object(s)</span>
        <span className="status-cell">Recycle Bin</span>
      </div>
    </div>
  );
}
