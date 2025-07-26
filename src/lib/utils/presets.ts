import { Preset, AnimationConfig, ShadowConfig, GradientConfig } from '@/lib/types';
import { defaultThemes } from './themes';

// Default configurations for new features
const defaultAnimation: AnimationConfig = {
  enabled: false,
  type: 'none',
  duration: 0.3,
  intensity: 1,
};

const defaultShadow: ShadowConfig = {
  enabled: true,
  blur: 32,
  spread: 0,
  offsetX: 0,
  offsetY: 8,
  color: 'rgba(31, 38, 135, 0.37)',
  inset: false,
};

const defaultGradient: GradientConfig = {
  enabled: false,
  type: 'linear',
  direction: 135,
  stops: [
    { color: 'rgba(255, 255, 255, 0.1)', position: 0 },
    { color: 'rgba(255, 255, 255, 0.05)', position: 100 },
  ],
};

export const defaultPresets: Preset[] = [
  {
    id: 'modern',
    name: 'Modern Glass',
    config: {
      type: 'card',
      blur: 15,
      opacity: 0.25,
      saturation: 180,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      padding: 24,
      animation: defaultAnimation,
      shadow: defaultShadow,
      gradient: defaultGradient,
    },
    theme: defaultThemes[0], // Light theme
    isPublic: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['modern', 'clean', 'card'],
  },
  {
    id: 'subtle',
    name: 'Subtle Glass',
    config: {
      type: 'card',
      blur: 8,
      opacity: 0.15,
      saturation: 120,
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      padding: 16,
      animation: defaultAnimation,
      shadow: { ...defaultShadow, blur: 16, offsetY: 4 },
      gradient: defaultGradient,
    },
    theme: defaultThemes[0], // Light theme
    isPublic: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['subtle', 'minimal', 'card'],
  },
  {
    id: 'bold',
    name: 'Bold Glass',
    config: {
      type: 'card',
      blur: 25,
      opacity: 0.4,
      saturation: 200,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      padding: 32,
      animation: defaultAnimation,
      shadow: { ...defaultShadow, blur: 40, offsetY: 12 },
      gradient: defaultGradient,
    },
    theme: defaultThemes[0], // Light theme
    isPublic: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['bold', 'prominent', 'card'],
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    config: {
      type: 'button',
      blur: 20,
      opacity: 0.3,
      saturation: 200,
      borderRadius: 12,
      backgroundColor: 'rgba(236, 72, 153, 0.3)',
      borderColor: 'rgba(236, 72, 153, 0.6)',
      padding: 20,
      animation: { enabled: true, type: 'glow', duration: 2, intensity: 1.5 },
      shadow: {
        enabled: true,
        blur: 20,
        spread: 2,
        offsetX: 0,
        offsetY: 0,
        color: 'rgba(236, 72, 153, 0.4)',
        inset: false,
      },
      gradient: {
        enabled: true,
        type: 'linear',
        direction: 45,
        stops: [
          { color: 'rgba(236, 72, 153, 0.2)', position: 0 },
          { color: 'rgba(139, 92, 246, 0.2)', position: 100 },
        ],
      },
    },
    theme: defaultThemes[5], // Neon theme
    isPublic: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['neon', 'glow', 'button', 'animated'],
  },
  {
    id: 'floating-panel',
    name: 'Floating Panel',
    config: {
      type: 'panel',
      blur: 12,
      opacity: 0.2,
      saturation: 150,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      padding: 28,
      animation: { enabled: true, type: 'float', duration: 3, intensity: 1 },
      shadow: {
        enabled: true,
        blur: 24,
        spread: -4,
        offsetX: 0,
        offsetY: 8,
        color: 'rgba(0, 0, 0, 0.25)',
        inset: false,
      },
      gradient: {
        enabled: true,
        type: 'radial',
        direction: 0,
        stops: [
          { color: 'rgba(255, 255, 255, 0.15)', position: 0 },
          { color: 'rgba(255, 255, 255, 0.05)', position: 100 },
        ],
      },
    },
    theme: defaultThemes[3], // Ocean theme
    isPublic: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['floating', 'panel', 'animated', 'modern'],
  },
  {
    id: 'dark-hero',
    name: 'Dark Hero Section',
    config: {
      type: 'hero',
      blur: 30,
      opacity: 0.15,
      saturation: 140,
      borderRadius: 24,
      backgroundColor: 'rgba(15, 23, 42, 0.15)',
      borderColor: 'rgba(100, 116, 139, 0.3)',
      padding: 48,
      animation: { enabled: true, type: 'pulse', duration: 4, intensity: 0.8 },
      shadow: {
        enabled: true,
        blur: 60,
        spread: -10,
        offsetX: 0,
        offsetY: 20,
        color: 'rgba(0, 0, 0, 0.5)',
        inset: false,
      },
      gradient: {
        enabled: true,
        type: 'linear',
        direction: 135,
        stops: [
          { color: 'rgba(96, 165, 250, 0.1)', position: 0 },
          { color: 'rgba(167, 139, 250, 0.05)', position: 50 },
          { color: 'rgba(34, 197, 94, 0.08)', position: 100 },
        ],
      },
    },
    theme: defaultThemes[1], // Dark theme
    isPublic: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['hero', 'dark', 'large', 'animated'],
  },
];

export const getPresetById = (id: string): Preset | undefined => {
  return defaultPresets.find(preset => preset.id === id);
};

export const getPresetsByTag = (tag: string): Preset[] => {
  return defaultPresets.filter(preset => preset.tags.includes(tag));
};

export const getDefaultConfigForType = (type: string) => {
  const preset = defaultPresets.find(p => p.config.type === type);
  return preset ? preset.config : defaultPresets[0].config;
};