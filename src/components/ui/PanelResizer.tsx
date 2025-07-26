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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.touches[0].clientX;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - startX;
      onResize(deltaX);
    };

    const handleTouchEnd = () => {
      setIsResizing(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [onResize]);

  return (
    <div
      className={`
        w-2 lg:w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-500 
        cursor-col-resize relative group transition-colors duration-150 touch-manipulation
        ${isResizing ? 'bg-blue-500 dark:bg-blue-400' : ''}
        ${className}
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Visual indicator */}
      <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-400/20 dark:group-hover:bg-blue-500/20 transition-colors duration-150" />
      
      {/* Resize handle dots */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="flex flex-col space-y-1 lg:space-y-0.5">
          <div className="w-1.5 h-1.5 lg:w-1 lg:h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          <div className="w-1.5 h-1.5 lg:w-1 lg:h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          <div className="w-1.5 h-1.5 lg:w-1 lg:h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};