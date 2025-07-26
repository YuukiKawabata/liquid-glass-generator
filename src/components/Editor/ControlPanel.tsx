import React from 'react';
import { LiquidGlassConfig, OutputType, Theme } from '@/lib/types';
import { defaultPresets } from '@/lib/utils/presets';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Select } from '@/components/ui/Select';
import { AnimationControls } from '@/components/ui/AnimationControls';
import { ThemeSelector } from '@/components/ui/ThemeSelector';
import { ConfigManager } from '@/components/ui/ConfigManager';

interface ControlPanelProps {
  config: LiquidGlassConfig;
  outputType: OutputType;
  isGenerating: boolean;
  currentTheme: Theme;
  onConfigChange: (config: Partial<LiquidGlassConfig>) => void;
  onOutputTypeChange: (type: OutputType) => void;
  onThemeChange: (theme: Theme) => void;
  onGenerate: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  outputType,
  isGenerating,
  currentTheme,
  onConfigChange,
  onOutputTypeChange,
  onThemeChange,
  onGenerate,
}) => {
  const handlePresetChange = (presetId: string) => {
    const preset = defaultPresets.find(p => p.id === presetId);
    if (preset) {
      onConfigChange({ ...preset.config, presetId });
    }
  };

  const typeOptions = [
    { value: 'card', label: 'Card' },
    { value: 'button', label: 'Button' },
    { value: 'modal', label: 'Modal' },
    { value: 'panel', label: 'Panel' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'toast', label: 'Toast' },
    { value: 'input', label: 'Input' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'form', label: 'Form' },
    { value: 'grid', label: 'Grid' },
    { value: 'hero', label: 'Hero Section' },
    { value: 'feature', label: 'Feature Section' },
  ];

  const outputOptions = [
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'tailwind', label: 'Tailwind CSS' },
  ];

  const presetOptions = [
    { value: '', label: 'Custom' },
    ...defaultPresets.map(preset => ({
      value: preset.id,
      label: preset.name,
    })),
  ];

  return (
    <div className="h-full p-4 lg:p-6">
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Control Panel
          </h2>
        </div>

        <Select
          label="Preset"
          value={config.presetId || ''}
          options={presetOptions}
          onChange={handlePresetChange}
        />

        <Select
          label="Component Type"
          value={config.type}
          options={typeOptions}
          onChange={(type) => onConfigChange({ type: type as LiquidGlassConfig['type'] })}
        />

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            Visual Properties
          </h3>

          <Slider
            label="Blur"
            value={config.blur}
            min={0}
            max={50}
            onChange={(blur) => onConfigChange({ blur })}
          />

          <Slider
            label="Opacity"
            value={config.opacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(opacity) => onConfigChange({ opacity })}
          />

          <Slider
            label="Saturation"
            value={config.saturation}
            min={50}
            max={300}
            step={10}
            onChange={(saturation) => onConfigChange({ saturation })}
          />

          <Slider
            label="Border Radius"
            value={config.borderRadius}
            min={0}
            max={50}
            onChange={(borderRadius) => onConfigChange({ borderRadius })}
          />

          <Slider
            label="Padding"
            value={config.padding}
            min={0}
            max={60}
            step={4}
            onChange={(padding) => onConfigChange({ padding })}
          />
        </div>

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            Colors
          </h3>

          <ColorPicker
            label="Background Color"
            value={config.backgroundColor}
            onChange={(backgroundColor) => onConfigChange({ backgroundColor })}
          />

          <ColorPicker
            label="Border Color"
            value={config.borderColor}
            onChange={(borderColor) => onConfigChange({ borderColor })}
          />
        </div>

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            Output
          </h3>

          <Select
            label="Framework"
            value={outputType}
            options={outputOptions}
            onChange={(type) => onOutputTypeChange(type as OutputType)}
          />
        </div>

        <AnimationControls
          animation={config.animation}
          onChange={(animation) => onConfigChange({ animation })}
        />

        <ThemeSelector
          selectedTheme={currentTheme}
          onThemeChange={onThemeChange}
        />

        <ConfigManager
          currentConfig={config}
          currentTheme={currentTheme}
          onConfigLoad={(loadedConfig, loadedTheme) => {
            onConfigChange(loadedConfig);
            onThemeChange(loadedTheme);
          }}
        />

        <div className="pt-2">
          <Button
            onClick={onGenerate}
            loading={isGenerating}
            variant="primary"
            fullWidth
            className="py-3 lg:py-2"
          >
            Generate Code
          </Button>
        </div>
      </div>
    </div>
  );
};