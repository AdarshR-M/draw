import React, { useState } from 'react';

interface ShapeProps {
  shape: {
    id: number;
    type: 'square';
    x: number;
    y: number;
    size: number;
  };
  updateShape: (shape: any) => void;
}

const Square: React.FC<ShapeProps> = ({ shape, updateShape }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, resize: boolean = false) => {
    setIsDragging(!resize);
    setIsResizing(resize);
    setStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && startPos) {
      const dx = event.clientX - startPos.x;
      const dy = event.clientY - startPos.y;
      updateShape({ ...shape, x: shape.x + dx, y: shape.y + dy });
      setStartPos({ x: event.clientX, y: event.clientY });
    } else if (isResizing && startPos) {
      const dx = event.clientX - startPos.x;
      const dy = event.clientY - startPos.y;
      updateShape({ ...shape, size: Math.max(10, shape.size + Math.max(dx, dy)) });
      setStartPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <div
      className="shape square"
      style={{
        left: shape.x - shape.size / 2,
        top: shape.y - shape.size / 2,
        width: shape.size,
        height: shape.size,
      }}
      onMouseDown={(e) => handleMouseDown(e)}
    >
      <div
        className="resizer"
        onMouseDown={(e) => handleMouseDown(e, true)}
      />
    </div>
  );
};

export default Square;
