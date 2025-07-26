import React, { useState } from 'react';
import { Theme } from '@/lib/types';
import { defaultThemes, applyTheme, createCustomTheme } from '@/lib/utils/themes';
import { Button } from './Button';
import { ColorPicker } from './ColorPicker';

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
  className = '',
}) => {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customColors, setCustomColors] = useState(selectedTheme.colors);

  const handleThemeSelect = (theme: Theme) => {
    onThemeChange(theme);
    applyTheme(theme);
    setCustomColors(theme.colors);
  };

  const handleColorChange = (colorKey: keyof Theme['colors'], value: string) => {
    const updatedColors = { ...customColors, [colorKey]: value };
    setCustomColors(updatedColors);
    
    // Create and apply custom theme
    const customTheme = createCustomTheme(
      'Custom Theme',
      updatedColors,
      selectedTheme.mode
    );
    onThemeChange(customTheme);
    applyTheme(customTheme);
  };

  const resetToDefault = () => {
    const defaultTheme = defaultThemes[0];
    handleThemeSelect(defaultTheme);
    setShowCustomizer(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Theme
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCustomizer(!showCustomizer)}
          className="text-xs"
        >
          {showCustomizer ? 'Hide' : 'Customize'}
        </Button>
      </div>

      {/* Theme Preset Grid */}
      <div className="grid grid-cols-2 gap-2">
        {defaultThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`
              relative p-3 rounded-lg border-2 transition-all duration-200 group
              ${selectedTheme.id === theme.id 
                ? 'border-blue-500 dark:border-blue-400' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }
            `}
          >
            {/* Theme Preview */}
            <div className="space-y-2">
              <div className="flex space-x-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
              <div 
                className="h-8 rounded text-xs flex items-center justify-center font-medium"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                {theme.name}
              </div>
            </div>
            
            {/* Selected indicator */}
            {selectedTheme.id === theme.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600 dark:text-gray-400">Mode:</span>
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => {
              const updatedTheme = { ...selectedTheme, mode: 'light' as const };
              onThemeChange(updatedTheme);
              applyTheme(updatedTheme);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedTheme.mode === 'light'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => {
              const updatedTheme = { ...selectedTheme, mode: 'dark' as const };
              onThemeChange(updatedTheme);
              applyTheme(updatedTheme);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedTheme.mode === 'dark'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Custom Color Controls */}
      {showCustomizer && (
        <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Custom Colors
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefault}
              className="text-xs h-6 px-2"
            >
              Reset
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <ColorPicker
              label="Primary"
              value={customColors.primary}
              onChange={(value) => handleColorChange('primary', value)}
            />
            <ColorPicker
              label="Secondary"
              value={customColors.secondary}
              onChange={(value) => handleColorChange('secondary', value)}
            />
            <ColorPicker
              label="Accent"
              value={customColors.accent}
              onChange={(value) => handleColorChange('accent', value)}
            />
            <ColorPicker
              label="Background"
              value={customColors.background}
              onChange={(value) => handleColorChange('background', value)}
            />
            <ColorPicker
              label="Surface"
              value={customColors.surface}
              onChange={(value) => handleColorChange('surface', value)}
            />
            <ColorPicker
              label="Text"
              value={customColors.text}
              onChange={(value) => handleColorChange('text', value)}
            />
          </div>
        </div>
      )}

      {/* Current Theme Info */}
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
        <div className="font-medium">{selectedTheme.name}</div>
        <div className="text-xs opacity-75">
          {selectedTheme.mode.charAt(0).toUpperCase() + selectedTheme.mode.slice(1)} mode
        </div>
      </div>
    </div>
  );
};