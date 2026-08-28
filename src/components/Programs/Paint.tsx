import { useRef, useState, useEffect } from 'react';
import './Programs.css';

const PALETTE = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000', '#FFFFFF', '#C0C0C0',
  '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80',
  '#80FFFF', '#7F7FFF', '#FF80FF', '#FF8080',
];

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [tool, setTool] = useState<'pencil' | 'brush' | 'eraser'>('pencil');
  const [brushSize, setBrushSize] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Initial white canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPos({ x, y });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : currentColor;
    ctx.fillStyle = tool === 'eraser' ? '#FFFFFF' : currentColor;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : tool === 'brush' ? brushSize * 2 : brushSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(x, y, (ctx.lineWidth || 1) / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : currentColor;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : tool === 'brush' ? brushSize * 2 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="program-content paint-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item" onClick={clearCanvas}><u>F</u>ile: New</span>
        <span className="toolbar-item" onClick={clearCanvas}><u>I</u>mage: Clear</span>
        <span className="toolbar-item" onClick={() => alert('MS Paint (Windows 95 Edition)\nDraw using mouse or touch!')}><u>H</u>elp</span>
      </div>

      <div className="paint-workspace">
        {/* Left Tools Bar */}
        <div className="paint-tool-box">
          <button
            className={`paint-tool-btn ${tool === 'pencil' ? 'active' : ''}`}
            onClick={() => setTool('pencil')}
            title="Pencil"
          >
            &#9998;
          </button>
          <button
            className={`paint-tool-btn ${tool === 'brush' ? 'active' : ''}`}
            onClick={() => setTool('brush')}
            title="Brush"
          >
            &#128396;
          </button>
          <button
            className={`paint-tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >
            &#9003;
          </button>
          <div className="paint-size-selector">
            <div className={`size-line ${brushSize === 1 ? 'selected' : ''}`} onClick={() => setBrushSize(1)} style={{ height: 1 }} />
            <div className={`size-line ${brushSize === 3 ? 'selected' : ''}`} onClick={() => setBrushSize(3)} style={{ height: 3 }} />
            <div className={`size-line ${brushSize === 6 ? 'selected' : ''}`} onClick={() => setBrushSize(6)} style={{ height: 6 }} />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="paint-canvas-frame">
          <canvas
            ref={canvasRef}
            width={520}
            height={340}
            className="paint-canvas"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />
        </div>
      </div>

      {/* Color Palette at Bottom */}
      <div className="paint-palette-bar">
        <div className="current-color-preview" style={{ background: currentColor }} />
        <div className="paint-colors-grid">
          {PALETTE.map((col, i) => (
            <div
              key={i}
              className="paint-color-box"
              style={{ background: col }}
              onClick={() => setCurrentColor(col)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
