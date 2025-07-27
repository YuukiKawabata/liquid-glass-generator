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
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center pb-4">
          <h2 className="text-lg lg:text-xl font-bold text-white mb-2">
            {t.controlPanel}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Presets Section */}
        <div className="liquid-glass-input p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2"></span>
            Presets & Type
          </h3>
          
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
        </div>

        {/* Visual Properties Section */}
        <div className="liquid-glass-input p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></span>
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

        {/* Animation Section */}
        <div className="liquid-glass-input p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></span>
            {t.animationSettings}
          </h3>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="animation-enabled"
              checked={config.animationEnabled}
              onChange={(e) => onConfigChange({ animationEnabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-white/10 border border-white/20 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="animation-enabled" className="text-sm text-white/80">
              {t.enableAnimation}
            </label>
          </div>

          {config.animationEnabled && (
            <div className="space-y-3 mt-4">
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
                max={10}
                step={0.1}
                onChange={(animationDuration) => onConfigChange({ animationDuration })}
              />
            </div>
          )}
        </div>

        {/* Colors Section */}
        <div className="liquid-glass-input p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-2"></span>
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

          <ColorPicker
            label={t.textColor}
            value={config.textColor}
            onChange={(textColor) => onConfigChange({ textColor })}
          />
        </div>

        {/* Advanced Settings */}
        <div className="liquid-glass-input p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full mr-2"></span>
            {t.advancedSettings}
          </h3>

          <Slider
            label={t.shadowIntensity}
            value={config.shadowIntensity}
            min={0}
            max={1}
            step={0.05}
            onChange={(shadowIntensity) => onConfigChange({ shadowIntensity })}
          />

          <Slider
            label={t.borderWidth}
            value={config.borderWidth}
            min={0}
            max={5}
            step={0.5}
            onChange={(borderWidth) => onConfigChange({ borderWidth })}
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="glass-noise"
              checked={config.glassNoise}
              onChange={(e) => onConfigChange({ glassNoise: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-white/10 border border-white/20 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="glass-noise" className="text-sm text-white/80">
              {t.glassNoise}
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="responsive"
              checked={config.responsive}
              onChange={(e) => onConfigChange({ responsive: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-white/10 border border-white/20 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="responsive" className="text-sm text-white/80">
              {t.responsive}
            </label>
          </div>
        </div>

        {/* Output Type */}
        <div className="liquid-glass-input p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></span>
            {t.outputType}
          </h3>
          
          <Select
            label={t.codeFormat}
            value={outputType}
            options={outputOptions}
            onChange={(type) => onOutputTypeChange(type as OutputType)}
          />
        </div>

        {/* Generate Button */}
        <div className="pt-6">
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full liquid-glass-button text-white font-semibold py-4 px-6 text-lg liquid-animate-pulse"
            variant="primary"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{t.generating}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">✨</span>
                <span>{t.generateCode}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};