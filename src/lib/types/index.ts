export interface LiquidGlassConfig {
  type: 'card' | 'button' | 'modal' | 'panel' | 'navigation' | 'sidebar' | 'dropdown' | 'toast' | 'input';
  blur: number;
  opacity: number;
  saturation: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  padding: number;
  // Animation settings
  animationEnabled: boolean;
  animationType: 'none' | 'float' | 'glow' | 'pulse' | 'shimmer' | 'bounce';
  animationDuration: number; // in seconds
  animationDelay: number; // in seconds
  // Hover effect settings
  hoverEnabled: boolean;
  hoverEffect: 'none' | 'lift' | 'glow' | 'blur' | 'brightness' | 'scale' | 'tilt' | 'rainbow' | 'cursor-follow' | 'cursor-glow' | 'cursor-tilt';
  hoverIntensity: number; // 0.1 to 2.0
  hoverDuration: number; // transition duration in seconds
  presetId?: string;
}

export type OutputType = 'css' | 'html' | 'react' | 'vue' | 'typescript';

export interface Preset {
  id: string;
  name: string;
  config: LiquidGlassConfig;
  isPublic: boolean;
  usageCount: number;
  createdAt: string;
}

export interface GeneratedCode {
  code: string;
  language: string;
  framework: OutputType;
  generatedAt: string;
}

export interface AppState {
  editorConfig: LiquidGlassConfig;
  selectedPreset: string | null;
  isDarkMode: boolean;
  outputType: OutputType;
  isGenerating: boolean;
  generatedCode: GeneratedCode | null;
}