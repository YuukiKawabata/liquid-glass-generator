import React from 'react';

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
  // Convert rgba string to hex for color input
  const rgbaToHex = (rgba: string): string => {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (!match) return '#ffffff';
    
    const [, r, g, b] = match;
    const toHex = (n: string) => parseInt(n).toString(16).padStart(2, '0');
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

  const currentAlpha = value.match(/rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/)?.[1] || '0.25';
  const hexValue = rgbaToHex(value);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRgba = hexToRgba(e.target.value, parseFloat(currentAlpha));
    onChange(newRgba);
  };

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseFloat(e.target.value);
    const newRgba = hexToRgba(hexValue, newAlpha);
    onChange(newRgba);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="color"
            value={hexValue}
            onChange={handleColorChange}
            className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Transparency</span>
            <span className="text-xs text-gray-500 font-mono">
              {Math.round(parseFloat(currentAlpha) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={currentAlpha}
            onChange={handleAlphaChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      <div className="text-xs font-mono text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded border">
        {value}
      </div>
    </div>
  );
};