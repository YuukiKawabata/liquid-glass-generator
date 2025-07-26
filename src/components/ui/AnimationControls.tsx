import React from 'react';
import { AnimationConfig } from '@/lib/types';
import { getAnimationPresets } from '@/lib/utils/animations';
import { Button } from './Button';
import { Slider } from './Slider';
import { Select } from './Select';

interface AnimationControlsProps {
  animation: AnimationConfig;
  onChange: (animation: AnimationConfig) => void;
  className?: string;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  animation,
  onChange,
  className = '',
}) => {
  const presets = getAnimationPresets();
  
  const typeOptions = [
    { value: 'none', label: 'None' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'glow', label: 'Glow' },
    { value: 'float', label: 'Float' },
    { value: 'shake', label: 'Shake' },
    { value: 'bounce', label: 'Bounce' },
  ];

  const handlePresetChange = (presetName: string) => {
    const preset = presets.find(p => p.name === presetName);
    if (preset) {
      onChange(preset.config);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Animation
        </h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={animation.enabled}
            onChange={(e) => onChange({ ...animation, enabled: e.target.checked })}
            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">Enable</span>
        </label>
      </div>

      {animation.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {presets.slice(1).map((preset) => (
              <Button
                key={preset.name}
                variant={animation.type === preset.config.type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handlePresetChange(preset.name)}
                className="text-xs h-8"
              >
                {preset.name}
              </Button>
            ))}
          </div>

          <Select
            label="Animation Type"
            value={animation.type}
            options={typeOptions}
            onChange={(type) => onChange({ ...animation, type: type as AnimationConfig['type'] })}
          />

          <Slider
            label="Duration (seconds)"
            value={animation.duration}
            min={0.1}
            max={10}
            step={0.1}
            onChange={(duration) => onChange({ ...animation, duration })}
          />

          <Slider
            label="Intensity"
            value={animation.intensity}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(intensity) => onChange({ ...animation, intensity })}
          />

          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Preview
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {animation.type} • {animation.duration}s
              </span>
            </div>
            <div
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white text-xs font-medium"
              style={{
                animation: animation.enabled && animation.type !== 'none' 
                  ? `liquidGlass${animation.type.charAt(0).toUpperCase() + animation.type.slice(1)} ${animation.duration}s ease-in-out infinite`
                  : 'none',
                transform: animation.type === 'none' ? 'none' : undefined,
              }}
            >
              Preview Element
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes liquidGlassPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(${1 + (animation.intensity * 0.05)}); opacity: ${1 - (animation.intensity * 0.1)}; }
        }
        
        @keyframes liquidGlassGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(${1 + (animation.intensity * 0.2)}) saturate(${1 + (animation.intensity * 0.3)}); }
        }
        
        @keyframes liquidGlassFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${-10 * animation.intensity}px); }
        }
        
        @keyframes liquidGlassShake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(${-5 * animation.intensity}px); }
          20%, 40%, 60%, 80% { transform: translateX(${5 * animation.intensity}px); }
        }
        
        @keyframes liquidGlassBounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(${-20 * animation.intensity}px); }
          70% { transform: translateY(${-10 * animation.intensity}px); }
          90% { transform: translateY(${-4 * animation.intensity}px); }
        }
      `}</style>
    </div>
  );
};