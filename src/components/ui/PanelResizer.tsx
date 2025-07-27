import React, { useCallback, useRef } from 'react';

interface PanelResizerProps {
  onResize: (deltaX: number) => void;
  className?: string;
}

export const PanelResizer: React.FC<PanelResizerProps> = ({
  onResize,
  className = '',
}) => {
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - startX.current;
      onResize(deltaX);
      startX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onResize]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      e.preventDefault();
      
      const deltaX = e.touches[0].clientX - startX.current;
      onResize(deltaX);
      startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [onResize]);

  return (
    <div
      className={`
        group relative w-2 h-full cursor-col-resize select-none touch-manipulation
        flex items-center justify-center transition-all duration-200
        ${className}
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Background with liquid glass effect */}
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 backdrop-blur-8 transition-all duration-200"></div>
      
      {/* Resize handle */}
      <div className="relative z-10 w-1 h-8 group-hover:h-12 transition-all duration-200">
        <div className="w-full h-full bg-white/20 group-hover:bg-white/40 rounded-full backdrop-blur-4 shadow-md group-hover:shadow-lg transition-all duration-200">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Hover indicator dots */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
      </div>
    </div>
  );
};