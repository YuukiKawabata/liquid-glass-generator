import React, { useState } from 'react';
import { LiquidGlassConfig } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface PreviewAreaProps {
  config: LiquidGlassConfig;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ config }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const getBackgroundStyle = () => {
    if (isDarkMode) {
      return {
        background: `
          linear-gradient(135deg, #1e293b 0%, #0f172a 100%),
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
      };
    }
    return {
      background: `
        linear-gradient(135deg, #667eea 0%, #764ba2 100%),
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `,
    };
  };

  const getLiquidGlassStyle = () => {
    // Parse the backgroundColor to extract RGB values and apply opacity
    const parseRgba = (color: string) => {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${config.opacity})`;
      }
      // Fallback for hex colors or other formats
      return `rgba(255, 255, 255, ${config.opacity})`;
    };

    return {
      position: 'relative' as const,
      backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
      WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
      background: parseRgba(config.backgroundColor),
      border: `1px solid ${config.borderColor}`,
      borderRadius: `${config.borderRadius}px`,
      padding: `${config.padding}px`,
      boxShadow: `
        0 8px 32px 0 rgba(31, 38, 135, 0.37),
        inset 0 0 0 1px rgba(255, 255, 255, 0.1)
      `,
      overflow: 'hidden' as const,
    };
  };

  const getGradientOverlayStyle = () => {
    return {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
      )`,
      pointerEvents: 'none' as const,
    };
  };

  const getContentByType = () => {
    const liquidGlassStyle = getLiquidGlassStyle();
    
    switch (config.type) {
      case 'button':
        return (
          <button 
            style={{
              ...liquidGlassStyle,
              background: 'transparent',
              border: `1px solid ${config.borderColor}`,
              cursor: 'pointer',
            }}
            className="min-h-[44px] px-6 touch-manipulation active:scale-95 transition-transform"
          >
            <div style={getGradientOverlayStyle()}></div>
            <span className="text-white font-medium relative z-10 text-sm lg:text-base">Click me</span>
          </button>
        );
        
      case 'modal':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-md mx-auto"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h3 className="text-base lg:text-lg font-semibold text-white">Modal Title</h3>
                <button className="text-white hover:text-gray-300 p-1 touch-manipulation">✕</button>
              </div>
              <p className="text-white/80 mb-3 lg:mb-4 text-sm lg:text-base">
                This is a modal dialog with liquid glass effect. It creates a beautiful frosted glass appearance.
              </p>
              <div className="flex justify-end space-x-2">
                <button className="px-3 lg:px-4 py-2 text-white/80 hover:text-white text-sm lg:text-base touch-manipulation">Cancel</button>
                <button className="px-3 lg:px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 text-sm lg:text-base touch-manipulation">Confirm</button>
              </div>
            </div>
          </div>
        );
        
      case 'panel':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-sm mx-auto"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-3">Control Panel</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm lg:text-base">Brightness</span>
                  <span className="text-white text-sm lg:text-base">85%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full touch-manipulation">
                  <div className="w-4/5 h-full bg-white/60 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm lg:text-base">Volume</span>
                  <span className="text-white text-sm lg:text-base">62%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full touch-manipulation">
                  <div className="w-3/5 h-full bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default: // card
        return (
          <div style={liquidGlassStyle} className="mx-auto">
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">Liquid Glass Card</h3>
              <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                Beautiful glassmorphism effect with backdrop blur and transparency. 
                Perfect for modern UI designs.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Preview
        </h2>
        
        <div className="flex items-center space-x-1 lg:space-x-2">
          <Button
            variant={!isDarkMode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsDarkMode(false)}
            className="px-2 lg:px-3 py-1 lg:py-2 text-xs lg:text-sm"
          >
            Light
          </Button>
          <Button
            variant={isDarkMode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsDarkMode(true)}
            className="px-2 lg:px-3 py-1 lg:py-2 text-xs lg:text-sm"
          >
            Dark
          </Button>
        </div>
      </div>
      
      <div 
        className="flex-1 flex items-center justify-center p-4 lg:p-8 transition-all duration-300 relative overflow-auto"
        style={getBackgroundStyle()}
      >
        {/* Texture overlay to make blur more visible */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
          }}
        />
        <div className="w-full max-w-sm lg:max-w-none lg:w-auto">
          {getContentByType()}
        </div>
      </div>
    </div>
  );
};