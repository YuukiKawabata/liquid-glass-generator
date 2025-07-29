export interface LiquidGlassConfig {
  type: 'card' | 'button' | 'modal' | 'panel' | 'navigation' | 'sidebar' | 'dropdown' | 'toast' | 'input';
  blur: number;
  opacity: number;
  saturation: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  textColor: string; // 追加
  padding: number;
  paddingX: number; // 新規追加
  paddingY: number; // 新規追加
  // Size and spacing
  width: number; // 新規追加
  height: number; // 新規追加
  margin: number; // 新規追加
  maxWidth: number; // 新規追加
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
  // Advanced settings
  shadowIntensity: number; // 追加
  borderWidth: number; // 追加
  glassNoise: boolean; // 追加
  responsive: boolean; // 追加
  presetId?: string;
}

export type OutputType = 'css' | 'html' | 'react' | 'vue' | 'typescript' | 'tailwindcss';

// Language support types
export type Language = 'ja' | 'en';

export interface Messages {
  // Control Panel
  controlPanel: string;
  preset: string;
  custom: string;
  componentType: string;
  visualProperties: string;
  blur: string;
  opacity: string;
  saturation: string;
  borderRadius: string;
  padding: string;
  // Size and spacing
  width: string; // 新規追加
  height: string; // 新規追加
  margin: string; // 新規追加
  maxWidth: string; // 新規追加
  animationSettings: string;
  enableAnimation: string;
  animationType: string;
  animationDuration: string;
  animationDelay: string;
  hoverEffects: string;
  enableHoverEffects: string;
  hoverEffect: string;
  hoverIntensity: string;
  hoverDuration: string;
  colors: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string; // 追加
  // Advanced settings
  advancedSettings: string; // 追加
  shadowIntensity: string; // 追加
  borderWidth: string; // 追加
  glassNoise: string; // 追加
  responsive: string; // 追加
  // Output
  output: string;
  outputType: string; // 追加
  codeFormat: string; // 追加
  framework: string;
  generateCode: string;
  generating: string; // 追加
  transparency: string;
  
  // Component types
  card: string;
  button: string;
  modal: string;
  panel: string;
  navigation: string;
  sidebar: string;
  dropdown: string;
  toast: string;
  input: string;
  
  // Animation types
  none: string;
  float: string;
  glow: string;
  pulse: string;
  shimmer: string;
  bounce: string;
  
  // Hover effects
  lift: string;
  scale: string;
  tilt: string;
  rainbow: string;
  brightness: string;
  cursorFollow: string;
  cursorGlow: string;
  cursorTilt: string;
  
  // Preview Area
  previewTitle: string;
  hoverInstruction: string;
  moveInstruction: string;
  
  // Code Output
  codeOutput: string;
  copy: string;
  copied: string;
  download: string;
  
  // Language
  language: string;
  japanese: string;
  english: string;
  
  // No content state
  generateCodeMessage: string;
}

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