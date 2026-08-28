import './Programs.css';

interface PhotoItem {
  id: string;
  name: string;
  src: string;
  size: string;
  date: string;
}

export const PHOTOS_LIST: PhotoItem[] = [
  {
    id: '1',
    name: 'photo_2026-08-28_19-01-13.jpg',
    src: './photos/photo_2026-08-28_19-01-13.jpg',
    size: '316 KB',
    date: '08/28/2026',
  },
  {
    id: '2',
    name: 'photo_2026-08-28_19-01-16.jpg',
    src: './photos/photo_2026-08-28_19-01-16.jpg',
    size: '300 KB',
    date: '08/28/2026',
  },
  {
    id: '3',
    name: 'photo_2026-08-28_19-01-18.jpg',
    src: './photos/photo_2026-08-28_19-01-18.jpg',
    size: '98 KB',
    date: '08/28/2026',
  },
  {
    id: '4',
    name: 'photo_2026-08-28_19-01-20.jpg',
    src: './photos/photo_2026-08-28_19-01-20.jpg',
    size: '352 KB',
    date: '08/28/2026',
  },
  {
    id: '5',
    name: 'photo_2026-08-28_19-01-21.jpg',
    src: './photos/photo_2026-08-28_19-01-21.jpg',
    size: '142 KB',
    date: '08/28/2026',
  },
  {
    id: '6',
    name: 'photo_2026-08-28_19-01-23.jpg',
    src: './photos/photo_2026-08-28_19-01-23.jpg',
    size: '52 KB',
    date: '08/28/2026',
  },
];

interface PhotosFolderProps {
  onOpenPhoto?: (photo: PhotoItem) => void;
}

export default function PhotosFolder({ onOpenPhoto }: PhotosFolderProps) {
  return (
    <div className="program-content photos-folder-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>F</u>ile</span>
        <span className="toolbar-item"><u>E</u>dit</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      {/* Address Bar */}
      <div className="program-address-bar">
        <span className="address-label">Address:</span>
        <span className="address-value">C:\My Documents\My Photos</span>
      </div>

      {/* Photos Thumbnail Grid */}
      <div className="photos-grid-body">
        {PHOTOS_LIST.map((photo) => (
          <div
            key={photo.id}
            className="photo-thumb-card"
            onClick={() => onOpenPhoto?.(photo)}
            title={`Click to view ${photo.name}`}
          >
            <div className="photo-thumb-frame">
              <img
                src={photo.src}
                alt={photo.name}
                className="photo-thumb-img"
                loading="lazy"
              />
            </div>
            <span className="photo-thumb-name">{photo.name}</span>
            <span className="photo-thumb-meta">{photo.size}</span>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="notepad-status-bar">
        <span className="status-cell flex-1">{PHOTOS_LIST.length} photo(s) in folder</span>
        <span className="status-cell">My Photos</span>
      </div>
    </div>
  );
}
