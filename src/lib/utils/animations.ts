import { AnimationConfig } from '@/lib/types';

export const generateAnimationCSS = (animation: AnimationConfig): string => {
  if (!animation.enabled || animation.type === 'none') {
    return '';
  }

  const duration = animation.duration;
  const intensity = animation.intensity;

  switch (animation.type) {
    case 'pulse':
      return `
        @keyframes liquidGlassPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(${1 + (intensity * 0.05)}); opacity: ${1 - (intensity * 0.1)}; }
        }
        animation: liquidGlassPulse ${duration}s ease-in-out infinite;
      `;

    case 'glow':
      return `
        @keyframes liquidGlassGlow {
          0%, 100% { box-shadow: inherit; }
          50% { 
            box-shadow: 
              inherit,
              0 0 ${20 * intensity}px rgba(59, 130, 246, ${0.3 * intensity}),
              0 0 ${40 * intensity}px rgba(59, 130, 246, ${0.2 * intensity});
          }
        }
        animation: liquidGlassGlow ${duration}s ease-in-out infinite;
      `;

    case 'float':
      return `
        @keyframes liquidGlassFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${-10 * intensity}px); }
        }
        animation: liquidGlassFloat ${duration}s ease-in-out infinite;
      `;

    case 'shake':
      return `
        @keyframes liquidGlassShake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(${-5 * intensity}px); }
          20%, 40%, 60%, 80% { transform: translateX(${5 * intensity}px); }
        }
        animation: liquidGlassShake ${duration}s ease-in-out;
      `;

    case 'bounce':
      return `
        @keyframes liquidGlassBounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(${-20 * intensity}px); }
          70% { transform: translateY(${-10 * intensity}px); }
          90% { transform: translateY(${-4 * intensity}px); }
        }
        animation: liquidGlassBounce ${duration}s ease-in-out;
      `;

    default:
      return '';
  }
};

export const getAnimationPresets = () => [
  {
    name: 'None',
    config: { enabled: false, type: 'none' as const, duration: 0, intensity: 0 },
  },
  {
    name: 'Gentle Pulse',
    config: { enabled: true, type: 'pulse' as const, duration: 3, intensity: 0.5 },
  },
  {
    name: 'Strong Pulse',
    config: { enabled: true, type: 'pulse' as const, duration: 2, intensity: 1.5 },
  },
  {
    name: 'Soft Glow',
    config: { enabled: true, type: 'glow' as const, duration: 4, intensity: 0.8 },
  },
  {
    name: 'Bright Glow',
    config: { enabled: true, type: 'glow' as const, duration: 2, intensity: 1.5 },
  },
  {
    name: 'Gentle Float',
    config: { enabled: true, type: 'float' as const, duration: 4, intensity: 1 },
  },
  {
    name: 'Active Float',
    config: { enabled: true, type: 'float' as const, duration: 2.5, intensity: 1.5 },
  },
  {
    name: 'Light Shake',
    config: { enabled: true, type: 'shake' as const, duration: 0.8, intensity: 0.5 },
  },
  {
    name: 'Strong Shake',
    config: { enabled: true, type: 'shake' as const, duration: 0.6, intensity: 1.2 },
  },
  {
    name: 'Gentle Bounce',
    config: { enabled: true, type: 'bounce' as const, duration: 1.5, intensity: 0.8 },
  },
  {
    name: 'Energetic Bounce',
    config: { enabled: true, type: 'bounce' as const, duration: 1, intensity: 1.5 },
  },
];

export const generateHoverEffects = (baseConfig: AnimationConfig): string => {
  if (!baseConfig.enabled) {
    return `
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 
          inherit,
          0 8px 25px rgba(0, 0, 0, 0.15);
      }
    `;
  }

  // Enhanced hover effects for animated elements
  return `
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 
        inherit,
        0 12px 35px rgba(0, 0, 0, 0.2);
    }
  `;
};

export const generateClickEffects = (): string => {
  return `
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }
  `;
};

// Utility for generating CSS custom properties for animations
export const generateAnimationVariables = (animation: AnimationConfig): Record<string, string> => {
  return {
    '--animation-duration': `${animation.duration}s`,
    '--animation-intensity': animation.intensity.toString(),
    '--animation-enabled': animation.enabled ? '1' : '0',
  };
};

// Generate keyframes as a string for injection
export const generateKeyframes = (animations: AnimationConfig[]): string => {
  const uniqueTypes = [...new Set(animations.filter(a => a.enabled).map(a => a.type))];
  
  let keyframes = '';
  
  uniqueTypes.forEach(type => {
    switch (type) {
      case 'pulse':
        keyframes += `
          @keyframes liquidGlassPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
        `;
        break;
      case 'glow':
        keyframes += `
          @keyframes liquidGlassGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2) saturate(1.3); }
          }
        `;
        break;
      case 'float':
        keyframes += `
          @keyframes liquidGlassFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `;
        break;
      case 'shake':
        keyframes += `
          @keyframes liquidGlassShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `;
        break;
      case 'bounce':
        keyframes += `
          @keyframes liquidGlassBounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-20px); }
            70% { transform: translateY(-10px); }
            90% { transform: translateY(-4px); }
          }
        `;
        break;
    }
  });
  
  return keyframes;
};