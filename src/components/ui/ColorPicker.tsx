import React from 'react';
import { useI18n } from '@/lib/i18n/context';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  const { t } = useI18n();
  
  // Convert rgba string to hex for color input
  const rgbaToHex = (rgba: string): string => {
    // Handle different rgba/rgb formats
    const match = rgba.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*[\d.]+)?\s*\)/);
    if (!match) {
      console.warn('Invalid color format:', rgba);
      return '#ffffff';
    }
    
    const [, r, g, b] = match;
    const toHex = (n: string) => {
      const num = Math.round(parseFloat(n));
      return Math.max(0, Math.min(255, num)).toString(16).padStart(2, '0');
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number = 0.25): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return value;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getCurrentAlpha = (colorValue: string): number => {
    const alphaMatch = colorValue.match(/rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);
    if (alphaMatch) {
      return parseFloat(alphaMatch[1]);
    }
    // If no alpha is found, assume it's an rgb (opaque) or default to 0.25
    if (colorValue.startsWith('rgb(')) {
      return 1.0;
    }
    return 0.25;
  };

  const currentAlpha = getCurrentAlpha(value);
  const hexValue = rgbaToHex(value);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newColor = e.target.value;
      if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
        const newRgba = hexToRgba(newColor, currentAlpha);
        onChange(newRgba);
      }
    } catch (error) {
      console.error('Error handling color change:', error);
    }
  };

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newAlpha = parseFloat(e.target.value);
      if (!isNaN(newAlpha) && newAlpha >= 0 && newAlpha <= 1) {
        const newRgba = hexToRgba(hexValue, newAlpha);
        onChange(newRgba);
      }
    } catch (error) {
      console.error('Error handling alpha change:', error);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm font-medium text-white/90">
        {label}
      </label>
      
      <div className="flex items-center space-x-4">
        {/* Color preview with liquid glass effect */}
        <div className="relative group">
          <div 
            className="w-16 h-14 lg:w-14 lg:h-12 rounded-xl border-2 border-white/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:border-white/50 shadow-lg"
            style={{ 
              backgroundColor: hexValue,
              backgroundImage: `linear-gradient(135deg, ${hexValue} 0%, ${hexValue} 100%)`,
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            }}
          >
            {/* Inner border for glass effect */}
            <div className="absolute inset-1 rounded-lg border border-white/20"></div>
            
            {/* Hidden color input */}
            <input
              type="color"
              value={hexValue}
              onChange={handleColorChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            {/* Hover effect ring */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-white/0 group-hover:ring-white/40 transition-all duration-300"></div>
          </div>
        </div>
        
        {/* Alpha slider */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/70">{t.transparency}</span>
            <span className="text-xs text-white/60 font-mono min-w-[3ch] text-right px-2 py-1 bg-white/10 rounded-md backdrop-blur-4">
              {Math.round(currentAlpha * 100)}%
            </span>
          </div>
          
          <div className="relative py-2">
            <div className="relative">
              {/* Track background with checkerboard pattern for transparency */}
              <div className="absolute inset-0 h-2 bg-white/10 rounded-full backdrop-blur-4"></div>
              <div 
                className="absolute inset-0 h-2 rounded-full"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${hexValue} 100%),
                    repeating-conic-gradient(#ffffff33 0% 25%, transparent 0% 50%) 50% / 8px 8px`
                }}
              ></div>
              
              {/* Progress track */}
              <div 
                className="absolute top-0 left-0 h-2 rounded-full shadow-md transition-all duration-200"
                style={{ 
                  width: `${currentAlpha * 100}%`,
                  background: `linear-gradient(90deg, transparent, ${value})`
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={currentAlpha}
              onChange={handleAlphaChange}
              className="liquid-slider-alpha w-full h-2 bg-transparent appearance-none cursor-pointer touch-manipulation relative z-10"
            />
          </div>
        </div>
      </div>
      
      {/* Color value display */}
      <div className="liquid-glass-input p-3 rounded-lg">
        <div className="text-xs font-mono text-white/80 break-all leading-relaxed">
          {value}
        </div>
      </div>
      
      <style jsx>{`
        .liquid-slider-alpha::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #a855f7);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.2),
            0 0 0 0 rgba(96, 165, 250, 0.4);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }
        
        .liquid-slider-alpha::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.3),
            0 0 0 4px rgba(96, 165, 250, 0.2);
          border-color: rgba(255, 255, 255, 0.7);
        }
        
        .liquid-slider-alpha::-webkit-slider-thumb:active {
          transform: scale(1.3);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.4),
            0 0 0 6px rgba(96, 165, 250, 0.3);
        }
        
        .liquid-slider-alpha::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #a855f7);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.2),
            0 0 0 0 rgba(96, 165, 250, 0.4);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .liquid-slider-alpha::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.3),
            0 0 0 4px rgba(96, 165, 250, 0.2);
          border-color: rgba(255, 255, 255, 0.7);
        }
        
        .liquid-slider-alpha::-moz-range-thumb:active {
          transform: scale(1.3);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.4),
            0 0 0 6px rgba(96, 165, 250, 0.3);
        }
        
        .liquid-slider-alpha::-moz-range-track {
          background: transparent;
          border: none;
        }
        
        .liquid-slider-alpha:focus {
          outline: none;
        }
        
        .liquid-slider-alpha:focus::-webkit-slider-thumb {
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.3),
            0 0 0 4px rgba(96, 165, 250, 0.4);
        }
        
        @media (max-width: 1024px) {
          .liquid-slider-alpha::-webkit-slider-thumb {
            height: 24px;
            width: 24px;
          }
          
          .liquid-slider-alpha::-moz-range-thumb {
            height: 24px;
            width: 24px;
          }
        }
      `}</style>
    </div>
  );
};