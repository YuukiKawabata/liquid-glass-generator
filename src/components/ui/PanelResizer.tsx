import React, { useState, useCallback } from 'react';

interface PanelResizerProps {
  onResize: (deltaX: number) => void;
  className?: string;
}

export const PanelResizer: React.FC<PanelResizerProps> = ({
  onResize,
  className = '',
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      onResize(deltaX);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [onResize]);

  return (
    <div
      className={`
        w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-500 
        cursor-col-resize relative group transition-colors duration-150
        ${isResizing ? 'bg-blue-500 dark:bg-blue-400' : ''}
        ${className}
      `}
      onMouseDown={handleMouseDown}
    >
      {/* Visual indicator */}
      <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-400/20 dark:group-hover:bg-blue-500/20 transition-colors duration-150" />
      
      {/* Resize handle dots */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="flex flex-col space-y-0.5">
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};