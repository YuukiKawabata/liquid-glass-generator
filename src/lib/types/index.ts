export interface LiquidGlassConfig {
  type: 'card' | 'button' | 'modal' | 'panel' | 'navigation' | 'sidebar' | 'dropdown' | 'toast' | 'input';
  blur: number;
  opacity: number;
  saturation: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  padding: number;
  presetId?: string;
}

export type OutputType = 'css' | 'html' | 'react' | 'vue';

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