import { Language, Messages } from '@/lib/types';

export const messages: Record<Language, Messages> = {
  ja: {
    // Control Panel
    controlPanel: 'コントロールパネル',
    preset: 'プリセット',
    custom: 'カスタム',
    componentType: 'コンポーネントタイプ',
    visualProperties: 'ビジュアルプロパティ',
    blur: 'ぼかし',
    opacity: '透明度',
    saturation: '彩度',
    borderRadius: '角丸',
    padding: 'パディング',
    animationSettings: 'アニメーション設定',
    enableAnimation: 'アニメーションを有効にする',
    animationType: 'アニメーションタイプ',
    animationDuration: 'アニメーション時間（秒）',
    animationDelay: 'アニメーション遅延（秒）',
    hoverEffects: 'ホバーエフェクト',
    enableHoverEffects: 'ホバーエフェクトを有効にする',
    hoverEffect: 'ホバーエフェクト',
    hoverIntensity: 'ホバー強度',
    hoverDuration: 'ホバー時間（秒）',
    colors: '色設定',
    backgroundColor: '背景色',
    borderColor: 'ボーダー色',
    textColor: 'テキスト色',
    // Advanced settings
    advancedSettings: '詳細設定',
    shadowIntensity: 'シャドウの強度',
    borderWidth: 'ボーダーの幅',
    glassNoise: 'ガラスノイズ効果',
    responsive: 'レスポンシブ対応',
    // Output
    output: '出力',
    outputType: '出力タイプ',
    codeFormat: 'コードフォーマット',
    framework: 'フレームワーク',
    generateCode: 'コード生成',
    generating: '生成中...',
    transparency: '透明度',

    // Component types
    card: 'カード',
    button: 'ボタン',
    modal: 'モーダル',
    panel: 'パネル',
    navigation: 'ナビゲーション',
    sidebar: 'サイドバー',
    dropdown: 'ドロップダウン',
    toast: 'トースト',
    input: '入力',

    // Animation types
    none: 'なし',
    float: '🕸️ フロート',
    glow: '✨ グロー',
    pulse: '💗 パルス',
    shimmer: '🌟 シマー',
    bounce: '⚡ バウンス',

    // Hover effects
    lift: '⬆️ リフト',
    scale: '🔍 スケール',
    tilt: '🎭 チルト',
    rainbow: '🌈 レインボー',
    brightness: '☀️ ブライトネス',
    cursorFollow: '🖱️ カーソル追従',
    cursorGlow: '💫 カーソルグロー',
    cursorTilt: '🎯 カーソルチルト',

    // Preview Area
    previewTitle: 'プレビュー',
    hoverInstruction: 'ホバーして {effect} エフェクトを確認',
    moveInstruction: 'カーソルを動かして {effect} エフェクトを確認',

    // Code Output
    codeOutput: 'コード出力',
    copy: 'コピー',
    copied: 'コピーしました',
    download: 'ダウンロード',

    // Language
    language: '言語',
    japanese: '日本語',
    english: 'English',
    
    // No content state
    generateCodeMessage: 'コードを生成して出力を確認',
  },

  en: {
    // Control Panel
    controlPanel: 'Control Panel',
    preset: 'Preset',
    custom: 'Custom',
    componentType: 'Component Type',
    visualProperties: 'Visual Properties',
    blur: 'Blur',
    opacity: 'Opacity',
    saturation: 'Saturation',
    borderRadius: 'Border Radius',
    padding: 'Padding',
    animationSettings: 'Animation Settings',
    enableAnimation: 'Enable Animation',
    animationType: 'Animation Type',
    animationDuration: 'Animation Duration (seconds)',
    animationDelay: 'Animation Delay (seconds)',
    hoverEffects: 'Hover Effects',
    enableHoverEffects: 'Enable Hover Effects',
    hoverEffect: 'Hover Effect',
    hoverIntensity: 'Hover Intensity',
    hoverDuration: 'Hover Duration (seconds)',
    colors: 'Colors',
    backgroundColor: 'Background Color',
    borderColor: 'Border Color',
    textColor: 'Text Color',
    // Advanced settings
    advancedSettings: 'Advanced Settings',
    shadowIntensity: 'Shadow Intensity',
    borderWidth: 'Border Width',
    glassNoise: 'Glass Noise Effect',
    responsive: 'Responsive Design',
    // Output
    output: 'Output',
    outputType: 'Output Type',
    codeFormat: 'Code Format',
    framework: 'Framework',
    generateCode: 'Generate Code',
    generating: 'Generating...',
    transparency: 'Transparency',

    // Component types
    card: 'Card',
    button: 'Button',
    modal: 'Modal',
    panel: 'Panel',
    navigation: 'Navigation',
    sidebar: 'Sidebar',
    dropdown: 'Dropdown',
    toast: 'Toast',
    input: 'Input',

    // Animation types
    none: 'None',
    float: '🕸️ Float',
    glow: '✨ Glow',
    pulse: '💗 Pulse',
    shimmer: '🌟 Shimmer',
    bounce: '⚡ Bounce',

    // Hover effects
    lift: '⬆️ Lift',
    scale: '🔍 Scale',
    tilt: '🎭 Tilt',
    rainbow: '🌈 Rainbow',
    brightness: '☀️ Brightness',
    cursorFollow: '🖱️ Cursor Follow',
    cursorGlow: '💫 Cursor Glow',
    cursorTilt: '🎯 Cursor Tilt',

    // Preview Area
    previewTitle: 'Preview',
    hoverInstruction: 'Hover to see {effect} effect',
    moveInstruction: 'Move cursor to see {effect} effect',

    // Code Output
    codeOutput: 'Code Output',
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download',

    // Language
    language: 'Language',
    japanese: '日本語',
    english: 'English',
    
    // No content state
    generateCodeMessage: 'Generate code to see output',
  },
}; 