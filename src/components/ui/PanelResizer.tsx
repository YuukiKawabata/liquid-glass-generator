import React, { useCallback, useRef, useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDragging.current) return; // Prevent duplicate events
    
    console.log('Mouse down on resizer');
    
    isDragging.current = true;
    startX.current = e.clientX;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      
      const deltaX = e.clientX - startX.current;
      if (Math.abs(deltaX) > 0) { // Only process meaningful movements
        console.log('Resizing by:', deltaX);
        onResize(deltaX);
        startX.current = e.clientX;
      }
    };

    const handleMouseUp = () => {
      console.log('Mouse up');
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
    e.preventDefault();
    
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
        group relative w-4 h-full cursor-col-resize select-none
        flex items-center justify-center
        z-[60] flex-shrink-0 bg-transparent hover:bg-white/10
        transition-all duration-200
        ${className}
      `}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      style={{ 
        pointerEvents: 'all',
        minWidth: '16px',
        userSelect: 'none'
      }}
    >
      {/* Resize handle - more visible */}
      <div className={`
        w-1 h-8 rounded-full transition-all duration-200
        ${isHovered || isDragging.current ? 'bg-white/60 h-12' : 'bg-white/30'}
      `}>
        {/* Shimmer effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40 
          rounded-full transition-opacity duration-300
          ${isHovered || isDragging.current ? 'opacity-100' : 'opacity-0'}
        `}></div>
      </div>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
          Drag to resize
        </div>
      )}
    </div>
  );
};