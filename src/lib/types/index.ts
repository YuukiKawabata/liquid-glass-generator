export interface LiquidGlassConfig {
  type: 'card' | 'button' | 'modal' | 'panel' | 'navigation' | 'sidebar' | 'dropdown' | 'toast' | 'input' | 'dashboard' | 'form' | 'grid' | 'hero' | 'feature';
  blur: number;
  opacity: number;
  saturation: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  padding: number;
  animation: AnimationConfig;
  shadow: ShadowConfig;
  gradient: GradientConfig;
  presetId?: string;
}

export interface AnimationConfig {
  enabled: boolean;
  type: 'none' | 'pulse' | 'glow' | 'float' | 'shake' | 'bounce';
  duration: number;
  intensity: number;
}

export interface ShadowConfig {
  enabled: boolean;
  blur: number;
  spread: number;
  offsetX: number;
  offsetY: number;
  color: string;
  inset: boolean;
}

export interface GradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial' | 'conic';
  direction: number;
  stops: GradientStop[];
}

export interface GradientStop {
  color: string;
  position: number;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  mode: 'light' | 'dark' | 'auto';
}

export type OutputType = 'css' | 'html' | 'react' | 'vue' | 'tailwind';

export interface Preset {
  id: string;
  name: string;
  config: LiquidGlassConfig;
  theme: Theme;
  isPublic: boolean;
  usageCount: number;
  createdAt: string;
  tags: string[];
}

export interface GeneratedCode {
  code: string;
  language: string;
  framework: OutputType;
  generatedAt: string;
  preview?: string;
}

export interface AppState {
  editorConfig: LiquidGlassConfig;
  selectedPreset: string | null;
  currentTheme: Theme;
  isDarkMode: boolean;
  outputType: OutputType;
  isGenerating: boolean;
  generatedCode: GeneratedCode | null;
  savedConfigs: SavedConfig[];
}

export interface SavedConfig {
  id: string;
  name: string;
  config: LiquidGlassConfig;
  theme: Theme;
  createdAt: string;
  lastModified: string;
}