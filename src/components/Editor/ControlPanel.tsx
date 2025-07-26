import React from 'react';
import { LiquidGlassConfig, OutputType } from '@/lib/types';
import { defaultPresets } from '@/lib/utils/presets';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Select } from '@/components/ui/Select';

interface ControlPanelProps {
  config: LiquidGlassConfig;
  outputType: OutputType;
  isGenerating: boolean;
  onConfigChange: (config: Partial<LiquidGlassConfig>) => void;
  onOutputTypeChange: (type: OutputType) => void;
  onGenerate: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  outputType,
  isGenerating,
  onConfigChange,
  onOutputTypeChange,
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
  ];

  const outputOptions = [
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'typescript', label: 'TypeScript' },
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
            onChange={(padding) => onConfigChange({ padding })}
          />
        </div>

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            Animation Settings
          </h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="animation-enabled"
              checked={config.animationEnabled}
              onChange={(e) => onConfigChange({ animationEnabled: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="animation-enabled" className="text-sm text-gray-700 dark:text-gray-300">
              Enable Animation
            </label>
          </div>

          {config.animationEnabled && (
            <>
              <Select
                label="Animation Type"
                value={config.animationType}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'float', label: '🕸️ Float' },
                  { value: 'glow', label: '✨ Glow' },
                  { value: 'pulse', label: '💗 Pulse' },
                  { value: 'shimmer', label: '🌟 Shimmer' },
                  { value: 'bounce', label: '⚡ Bounce' },
                ]}
                onChange={(animationType) => onConfigChange({ animationType: animationType as LiquidGlassConfig['animationType'] })}
              />

              <Slider
                label="Animation Duration (seconds)"
                value={config.animationDuration}
                min={0.5}
                max={5}
                step={0.1}
                onChange={(animationDuration) => onConfigChange({ animationDuration })}
              />

              <Slider
                label="Animation Delay (seconds)"
                value={config.animationDelay}
                min={0}
                max={3}
                step={0.1}
                onChange={(animationDelay) => onConfigChange({ animationDelay })}
              />
            </>
          )}
        </div>

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            Hover Effects
          </h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hover-enabled"
              checked={config.hoverEnabled}
              onChange={(e) => onConfigChange({ hoverEnabled: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="hover-enabled" className="text-sm text-gray-700 dark:text-gray-300">
              Enable Hover Effects
            </label>
          </div>

          {config.hoverEnabled && (
            <>
              <Select
                label="Hover Effect"
                value={config.hoverEffect}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'lift', label: '⬆️ Lift' },
                  { value: 'glow', label: '✨ Glow' },
                  { value: 'blur', label: '🌫️ Blur' },
                  { value: 'brightness', label: '☀️ Brightness' },
                  { value: 'scale', label: '🔍 Scale' },
                  { value: 'tilt', label: '🎭 Tilt' },
                  { value: 'rainbow', label: '🌈 Rainbow' },
                  { value: 'cursor-follow', label: '🖱️ Cursor Follow' },
                  { value: 'cursor-glow', label: '💫 Cursor Glow' },
                  { value: 'cursor-tilt', label: '🎯 Cursor Tilt' },
                ]}
                onChange={(hoverEffect) => onConfigChange({ hoverEffect: hoverEffect as LiquidGlassConfig['hoverEffect'] })}
              />

              <Slider
                label="Hover Intensity"
                value={config.hoverIntensity}
                min={0.1}
                max={2.0}
                step={0.1}
                onChange={(hoverIntensity) => onConfigChange({ hoverIntensity })}
              />

              <Slider
                label="Hover Duration (seconds)"
                value={config.hoverDuration}
                min={0.1}
                max={1.0}
                step={0.05}
                onChange={(hoverDuration) => onConfigChange({ hoverDuration })}
              />
            </>
          )}
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

        <div className="pt-2 pb-2">
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