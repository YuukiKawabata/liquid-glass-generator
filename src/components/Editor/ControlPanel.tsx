import React from 'react';
import { LiquidGlassConfig, OutputType } from '@/lib/types';
import { defaultPresets } from '@/lib/utils/presets';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Select } from '@/components/ui/Select';
import { useI18n } from '@/lib/i18n/context';

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
  const { t } = useI18n();

  const handlePresetChange = (presetId: string) => {
    const preset = defaultPresets.find(p => p.id === presetId);
    if (preset) {
      onConfigChange({ ...preset.config, presetId });
    }
  };

  const typeOptions = [
    { value: 'card', label: t.card },
    { value: 'button', label: t.button },
    { value: 'modal', label: t.modal },
    { value: 'panel', label: t.panel },
    { value: 'navigation', label: t.navigation },
    { value: 'sidebar', label: t.sidebar },
    { value: 'dropdown', label: t.dropdown },
    { value: 'toast', label: t.toast },
    { value: 'input', label: t.input },
  ];

  const outputOptions = [
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwindcss', label: 'Tailwind CSS' },
  ];

  const presetOptions = [
    { value: '', label: t.custom },
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
            {t.controlPanel}
          </h2>
        </div>

        <Select
          label={t.preset}
          value={config.presetId || ''}
          options={presetOptions}
          onChange={handlePresetChange}
        />

        <Select
          label={t.componentType}
          value={config.type}
          options={typeOptions}
          onChange={(type) => onConfigChange({ type: type as LiquidGlassConfig['type'] })}
        />

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            {t.visualProperties}
          </h3>

          <Slider
            label={t.blur}
            value={config.blur}
            min={0}
            max={50}
            onChange={(blur) => onConfigChange({ blur })}
          />

          <Slider
            label={t.opacity}
            value={config.opacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(opacity) => onConfigChange({ opacity })}
          />

          <Slider
            label={t.saturation}
            value={config.saturation}
            min={50}
            max={300}
            step={10}
            onChange={(saturation) => onConfigChange({ saturation })}
          />

          <Slider
            label={t.borderRadius}
            value={config.borderRadius}
            min={0}
            max={50}
            onChange={(borderRadius) => onConfigChange({ borderRadius })}
          />

          <Slider
            label={t.padding}
            value={config.padding}
            min={0}
            max={60}
            onChange={(padding) => onConfigChange({ padding })}
          />
        </div>

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            {t.animationSettings}
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
              {t.enableAnimation}
            </label>
          </div>

          {config.animationEnabled && (
            <>
              <Select
                label={t.animationType}
                value={config.animationType}
                options={[
                  { value: 'none', label: t.none },
                  { value: 'float', label: t.float },
                  { value: 'glow', label: t.glow },
                  { value: 'pulse', label: t.pulse },
                  { value: 'shimmer', label: t.shimmer },
                  { value: 'bounce', label: t.bounce },
                ]}
                onChange={(animationType) => onConfigChange({ animationType: animationType as LiquidGlassConfig['animationType'] })}
              />

              <Slider
                label={t.animationDuration}
                value={config.animationDuration}
                min={0.5}
                max={5}
                step={0.1}
                onChange={(animationDuration) => onConfigChange({ animationDuration })}
              />

              <Slider
                label={t.animationDelay}
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
            {t.hoverEffects}
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
              {t.enableHoverEffects}
            </label>
          </div>

          {config.hoverEnabled && (
            <>
              <Select
                label={t.hoverEffect}
                value={config.hoverEffect}
                options={[
                  { value: 'none', label: t.none },
                  { value: 'lift', label: t.lift },
                  { value: 'glow', label: t.glow },
                  { value: 'blur', label: t.blur },
                  { value: 'brightness', label: t.brightness },
                  { value: 'scale', label: t.scale },
                  { value: 'tilt', label: t.tilt },
                  { value: 'rainbow', label: t.rainbow },
                  { value: 'cursor-follow', label: t.cursorFollow },
                  { value: 'cursor-glow', label: t.cursorGlow },
                  { value: 'cursor-tilt', label: t.cursorTilt },
                ]}
                onChange={(hoverEffect) => onConfigChange({ hoverEffect: hoverEffect as LiquidGlassConfig['hoverEffect'] })}
              />

              <Slider
                label={t.hoverIntensity}
                value={config.hoverIntensity}
                min={0.1}
                max={2.0}
                step={0.1}
                onChange={(hoverIntensity) => onConfigChange({ hoverIntensity })}
              />

              <Slider
                label={t.hoverDuration}
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
            {t.colors}
          </h3>

          <ColorPicker
            label={t.backgroundColor}
            value={config.backgroundColor}
            onChange={(backgroundColor) => onConfigChange({ backgroundColor })}
          />

          <ColorPicker
            label={t.borderColor}
            value={config.borderColor}
            onChange={(borderColor) => onConfigChange({ borderColor })}
          />
        </div>

        <div className="space-y-4 lg:space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
            {t.output}
          </h3>

          <Select
            label={t.framework}
            value={outputType}
            options={outputOptions}
            onChange={(type) => onOutputTypeChange(type as OutputType)}
          />
        </div>

        <div className="pt-2 pb-6">
          <Button
            onClick={onGenerate}
            loading={isGenerating}
            variant="primary"
            fullWidth
            className="py-3 lg:py-2"
          >
            {t.generateCode}
          </Button>
        </div>
      </div>
    </div>
  );
};