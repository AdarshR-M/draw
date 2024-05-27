import React, { useState } from 'react';
import './App.css';
import Circle from './components/Circle';
import Square from './components/Square';

interface Shape {
  id: number;
  type: 'circle' | 'square';
  x: number;
  y: number;
  size: number;
}

const App: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [drawingMode, setDrawingMode] = useState<'square' | 'circle'>('square');
  const [currentId, setCurrentId] = useState<number>(0);

  const addShape = (x: number, y: number) => {
    const newShape: Shape = {
      id: currentId,
      type: drawingMode,
      x,
      y,
      size: 50,
    };
    setShapes([...shapes, newShape]);
    setCurrentId(currentId + 1);
  };

  const updateShape = (updatedShape: Shape) => {
    setShapes(shapes.map(shape => shape.id === updatedShape.id ? updatedShape : shape));
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target instanceof HTMLCanvasElement) return;
    if ((event.target as HTMLDivElement).className === "shape circle" ||
    (event.target as HTMLDivElement).className === "shape square" ||
    (event.target as HTMLDivElement).className === "resizer") return;
    
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(event);
    addShape(x, y);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={() => setDrawingMode('square')}>Draw Square</button>
        <button onClick={() => setDrawingMode('circle')}>Draw Circle</button>
      </div>
      <div className="drawing-canvas" onMouseDown={handleCanvasClick}>
        {shapes.map(shape => (
          shape.type === 'circle' ? (
            <Circle key={shape.id} shape={shape} updateShape={updateShape} />
          ) : (
            <Square key={shape.id} shape={shape} updateShape={updateShape} />
          )
        ))}
      </div>
    </div>
  );
};

export default App;
