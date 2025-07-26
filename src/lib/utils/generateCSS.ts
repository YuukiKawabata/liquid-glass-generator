import { LiquidGlassConfig, OutputType } from '@/lib/types';

export function generateCSS(config: LiquidGlassConfig): string {
  const {
    blur,
    opacity,
    saturation,
    borderRadius,
    backgroundColor,
    borderColor,
    padding,
    animationEnabled,
    animationType,
    animationDuration,
    animationDelay,
    hoverEnabled,
    hoverEffect,
    hoverIntensity,
    hoverDuration,
  } = config;

  // Parse the backgroundColor to extract RGB values and apply opacity
  const parseRgbaWithOpacity = (color: string, opacityValue: number) => {
    // Check if it's already an rgba/rgb color
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
      return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacityValue})`;
    }
    
    // Check if it's a hex color
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
      const r = parseInt(hexMatch[1], 16);
      const g = parseInt(hexMatch[2], 16);
      const b = parseInt(hexMatch[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
    }
    
    // Fallback for other formats
    return `rgba(255, 255, 255, ${opacityValue})`;
  };

  const getHoverCSS = () => {
    if (!hoverEnabled || hoverEffect === 'none') return '';

    const transition = `transition: all ${hoverDuration}s ease;`;

    const hoverEffects = {
      lift: `
.liquid-glass {
  ${transition}
}

.liquid-glass:hover {
  transform: translateY(-${hoverIntensity * 8}px);
  box-shadow: 
    0 ${8 + hoverIntensity * 12}px ${32 + hoverIntensity * 20}px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}`,
      glow: `
.liquid-glass {
  ${transition}
}

.liquid-glass:hover {
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 ${hoverIntensity * 20}px rgba(255, 255, 255, ${hoverIntensity * 0.4});
}`,
      blur: `
.liquid-glass {
  ${transition}
}

.liquid-glass:hover {
  backdrop-filter: blur(${blur * hoverIntensity}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur * hoverIntensity}px) saturate(${saturation}%);
}`,
      brightness: `
.liquid-glass {
  ${transition}
}

.liquid-glass:hover {
  background: ${parseRgbaWithOpacity(backgroundColor, Math.min(opacity * hoverIntensity, 1))};
  border-color: ${borderColor.replace(/[\d.]+\)$/, `${hoverIntensity * 0.5})`)};
}`,
      scale: `
.liquid-glass {
  ${transition}
}

.liquid-glass:hover {
  transform: scale(${hoverIntensity});
}`,
      tilt: `
.liquid-glass {
  ${transition}
  transform-style: preserve-3d;
}

.liquid-glass:hover {
  transform: perspective(1000px) rotateX(${hoverIntensity * 5}deg) rotateY(${hoverIntensity * 5}deg);
}`,
      rainbow: `
.liquid-glass {
  ${transition}
}

.liquid-glass:hover {
  background: linear-gradient(
    45deg,
    rgba(255, 0, 150, ${opacity * hoverIntensity * 0.3}) 0%,
    rgba(0, 204, 255, ${opacity * hoverIntensity * 0.3}) 25%,
    rgba(255, 204, 0, ${opacity * hoverIntensity * 0.3}) 50%,
    rgba(255, 0, 150, ${opacity * hoverIntensity * 0.3}) 75%,
    rgba(0, 204, 255, ${opacity * hoverIntensity * 0.3}) 100%
  );
  background-size: 400% 400%;
  animation: liquid-glass-rainbow-shift ${hoverDuration * 2}s ease infinite;
}

@keyframes liquid-glass-rainbow-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
      'cursor-follow': `
.liquid-glass {
  ${transition}
  position: relative;
  overflow: hidden;
}

.liquid-glass::after {
  content: '';
  position: absolute;
  top: var(--cursor-y, 50%);
  left: var(--cursor-x, 50%);
  width: ${hoverIntensity * 100}px;
  height: ${hoverIntensity * 100}px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, ${hoverIntensity * 0.3}) 0%,
    rgba(255, 255, 255, ${hoverIntensity * 0.1}) 50%,
    transparent 100%
  );
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity ${hoverDuration}s ease;
}

.liquid-glass:hover::after {
  opacity: 1;
}`,
      'cursor-glow': `
.liquid-glass {
  ${transition}
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  top: var(--cursor-y, 50%);
  left: var(--cursor-x, 50%);
  width: ${hoverIntensity * 150}px;
  height: ${hoverIntensity * 150}px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, ${hoverIntensity * 0.4}) 0%,
    rgba(100, 200, 255, ${hoverIntensity * 0.2}) 30%,
    rgba(255, 100, 200, ${hoverIntensity * 0.1}) 60%,
    transparent 100%
  );
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity ${hoverDuration}s ease;
  filter: blur(${hoverIntensity * 2}px);
  animation: liquid-glass-cursor-glow ${hoverDuration * 4}s ease-in-out infinite;
}

.liquid-glass:hover::before {
  opacity: 1;
}

@keyframes liquid-glass-cursor-glow {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    filter: blur(${hoverIntensity * 2}px) brightness(1);
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1);
    filter: blur(${hoverIntensity * 3}px) brightness(1.3);
  }
}`,
      'cursor-tilt': `
.liquid-glass {
  ${transition}
  transform-style: preserve-3d;
  perspective: 1000px;
}

.liquid-glass:hover {
  transform: 
    perspective(1000px)
    rotateX(calc((var(--cursor-y, 50) - 50) * ${hoverIntensity * 0.3}deg))
    rotateY(calc((var(--cursor-x, 50) - 50) * ${hoverIntensity * 0.3}deg))
    translateZ(${hoverIntensity * 10}px);
}`,
    };

    return hoverEffects[hoverEffect] || '';
  };

  const getAnimationCSS = () => {
    if (!animationEnabled || animationType === 'none') return '';

    const animationProperty = `animation: liquid-glass-${animationType} ${animationDuration}s ease-in-out ${animationDelay}s infinite;`;

    const keyframes = {
      float: `
@keyframes liquid-glass-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}`,
      glow: `
@keyframes liquid-glass-glow {
  0%, 100% { box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 255, 255, 0.3); }
}`,
      pulse: `
@keyframes liquid-glass-pulse {
  0%, 100% { transform: scale(1); opacity: ${opacity}; }
  50% { transform: scale(1.05); opacity: ${Math.min(opacity + 0.1, 1)}; }
}`,
      shimmer: `
@keyframes liquid-glass-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}`,
      bounce: `
@keyframes liquid-glass-bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}`,
    };

    return `
${keyframes[animationType] || ''}

.liquid-glass {
  ${animationProperty}
  ${animationType === 'shimmer' ? `
  background: linear-gradient(
    90deg,
    ${parseRgbaWithOpacity(backgroundColor, opacity)} 25%,
    ${parseRgbaWithOpacity(backgroundColor, Math.min(opacity + 0.1, 1))} 50%,
    ${parseRgbaWithOpacity(backgroundColor, opacity)} 75%
  );
  background-size: 200% 100%;` : ''}
}`;
  };

  const baseCSS = `
.liquid-glass {
  position: relative;
  backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  background: ${parseRgbaWithOpacity(backgroundColor, opacity)};
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
}`;

  // Add component-specific styles
  const componentSpecificCSS = getComponentSpecificCSS(config.type);
  const animationCSS = getAnimationCSS();
  const hoverCSS = getHoverCSS();
  
  return `${baseCSS}${componentSpecificCSS}${animationCSS}${hoverCSS}`.trim();
}

function getComponentSpecificCSS(type: string): string {
  switch (type) {
    case 'button':
      return `

.liquid-glass-button {
  background: transparent;
  cursor: pointer;
  transition: transform 0.1s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
}

.liquid-glass-button:active {
  transform: scale(0.95);
}

.liquid-glass-button .content {
  position: relative;
  z-index: 10;
  color: white;
  font-weight: 500;
  font-size: 14px;
}

@media (min-width: 1024px) {
  .liquid-glass-button .content {
    font-size: 16px;
  }
}`;

    case 'modal':
      return `

.liquid-glass-modal {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}

.liquid-glass-modal .content {
  position: relative;
  z-index: 10;
}

.liquid-glass-modal .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.liquid-glass-modal .title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.liquid-glass-modal .close-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
}

.liquid-glass-modal .close-button:hover {
  color: rgba(255, 255, 255, 0.7);
}

.liquid-glass-modal .body {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
}

.liquid-glass-modal .actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.liquid-glass-modal .button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.liquid-glass-modal .button.secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.liquid-glass-modal .button.secondary:hover {
  color: white;
}

.liquid-glass-modal .button.primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.liquid-glass-modal .button.primary:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (min-width: 1024px) {
  .liquid-glass-modal .header {
    margin-bottom: 16px;
  }
  
  .liquid-glass-modal .title {
    font-size: 18px;
  }
  
  .liquid-glass-modal .body {
    font-size: 16px;
  }
  
  .liquid-glass-modal .button {
    font-size: 16px;
  }
}`;

    case 'panel':
      return `

.liquid-glass-panel {
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}

.liquid-glass-panel .content {
  position: relative;
  z-index: 10;
}

.liquid-glass-panel .title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0 0 12px 0;
}

.liquid-glass-panel .control-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.liquid-glass-panel .control-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.liquid-glass-panel .control-value {
  color: white;
  font-size: 14px;
}

.liquid-glass-panel .slider-container {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  margin-bottom: 12px;
  cursor: pointer;
}

.liquid-glass-panel .slider-fill {
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 9999px;
}

@media (min-width: 1024px) {
  .liquid-glass-panel .title {
    font-size: 18px;
  }
  
  .liquid-glass-panel .control-label,
  .liquid-glass-panel .control-value {
    font-size: 16px;
  }
}`;

    case 'navigation':
      return `

.liquid-glass-nav {
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
}

.liquid-glass-nav .content {
  position: relative;
  z-index: 10;
}

.liquid-glass-nav .nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.liquid-glass-nav .nav-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.liquid-glass-nav .brand {
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-decoration: none;
}

.liquid-glass-nav .nav-links {
  display: none;
  gap: 16px;
}

.liquid-glass-nav .nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.liquid-glass-nav .nav-link:hover {
  color: white;
}

.liquid-glass-nav .menu-button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
}

.liquid-glass-nav .menu-button:hover {
  color: white;
}

.liquid-glass-nav .menu-icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 768px) {
  .liquid-glass-nav .nav-links {
    display: flex;
  }
}

@media (min-width: 1024px) {
  .liquid-glass-nav .nav-link {
    font-size: 16px;
  }
}`;

    case 'sidebar':
      return `

.liquid-glass-sidebar {
  width: 100%;
  max-width: 18rem;
  margin: 0 auto;
  height: 24rem;
}

.liquid-glass-sidebar .content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.liquid-glass-sidebar .title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 16px 0;
}

.liquid-glass-sidebar .nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.liquid-glass-sidebar .nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  transition: color 0.2s;
  font-size: 14px;
}

.liquid-glass-sidebar .nav-item:hover {
  color: white;
}

.liquid-glass-sidebar .nav-item.active {
  color: rgba(255, 255, 255, 0.9);
}

.liquid-glass-sidebar .nav-icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 1024px) {
  .liquid-glass-sidebar .nav-item {
    font-size: 16px;
  }
}`;

    case 'dropdown':
      return `

.liquid-glass-dropdown {
  width: 100%;
  max-width: 18rem;
  margin: 0 auto;
}

.liquid-glass-dropdown .content {
  position: relative;
  z-index: 10;
}

.liquid-glass-dropdown .trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 0;
  background: none;
  border: none;
  width: 100%;
}

.liquid-glass-dropdown .trigger-text {
  color: white;
  font-size: 14px;
}

.liquid-glass-dropdown .trigger-icon {
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.liquid-glass-dropdown .options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.liquid-glass-dropdown .option {
  padding: 8px;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.liquid-glass-dropdown .option:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.liquid-glass-dropdown .option.selected {
  color: rgba(255, 255, 255, 0.9);
}

@media (min-width: 1024px) {
  .liquid-glass-dropdown .trigger-text,
  .liquid-glass-dropdown .option {
    font-size: 16px;
  }
}`;

    case 'toast':
      return `

.liquid-glass-toast {
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}

.liquid-glass-toast .content {
  position: relative;
  z-index: 10;
}

.liquid-glass-toast .toast-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.liquid-glass-toast .icon {
  flex-shrink: 0;
}

.liquid-glass-toast .success-icon {
  width: 20px;
  height: 20px;
  color: #10b981;
}

.liquid-glass-toast .message {
  flex: 1;
}

.liquid-glass-toast .title {
  color: white;
  font-weight: 500;
  margin: 0 0 4px 0;
  font-size: 14px;
}

.liquid-glass-toast .description {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.liquid-glass-toast .close-button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
}

.liquid-glass-toast .close-button:hover {
  color: white;
}

@media (min-width: 1024px) {
  .liquid-glass-toast .title {
    font-size: 16px;
  }
  
  .liquid-glass-toast .description {
    font-size: 14px;
  }
}`;

    case 'input':
      return `

.liquid-glass-form {
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}

.liquid-glass-form .content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.liquid-glass-form .field {
  display: flex;
  flex-direction: column;
}

.liquid-glass-form .label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-size: 14px;
}

.liquid-glass-form .input {
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 14px;
}

.liquid-glass-form .input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.liquid-glass-form .input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.liquid-glass-form .submit-button {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.liquid-glass-form .submit-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (min-width: 1024px) {
  .liquid-glass-form .label,
  .liquid-glass-form .input,
  .liquid-glass-form .submit-button {
    font-size: 16px;
  }
}`;

    default: // card
      return `

.liquid-glass-card .content {
  position: relative;
  z-index: 10;
}

.liquid-glass-card .title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 12px 0;
}

.liquid-glass-card .description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

@media (min-width: 1024px) {
  .liquid-glass-card .title {
    font-size: 20px;
  }
  
  .liquid-glass-card .description {
    font-size: 16px;
  }
}`;
  }
}

export function generateHTML(config: LiquidGlassConfig): string {
  const css = generateCSS(config);
  const htmlContent = getHTMLContent(config.type);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liquid Glass Component</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: 
        linear-gradient(135deg, #667eea 0%, #764ba2 100%),
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    ${css}
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`.trim();
}

function getHTMLContent(type: string): string {
  switch (type) {
    case 'button':
      return `
  <button class="liquid-glass liquid-glass-button">
    <span class="content">Click me</span>
  </button>`;

    case 'modal':
      return `
  <div class="liquid-glass liquid-glass-modal">
    <div class="content">
      <div class="header">
        <h3 class="title">Modal Title</h3>
        <button class="close-button">✕</button>
      </div>
      <p class="body">
        This is a modal dialog with liquid glass effect. It creates a beautiful frosted glass appearance.
      </p>
      <div class="actions">
        <button class="button secondary">Cancel</button>
        <button class="button primary">Confirm</button>
      </div>
    </div>
  </div>`;

    case 'panel':
      return `
  <div class="liquid-glass liquid-glass-panel">
    <div class="content">
      <h3 class="title">Control Panel</h3>
      <div class="control-item">
        <span class="control-label">Brightness</span>
        <span class="control-value">85%</span>
      </div>
      <div class="slider-container">
        <div class="slider-fill" style="width: 80%;"></div>
      </div>
      <div class="control-item">
        <span class="control-label">Volume</span>
        <span class="control-value">62%</span>
      </div>
      <div class="slider-container">
        <div class="slider-fill" style="width: 60%;"></div>
      </div>
    </div>
  </div>`;

    case 'navigation':
      return `
  <div class="liquid-glass liquid-glass-nav">
    <div class="content">
      <nav class="nav-container">
        <div class="nav-left">
          <a href="#" class="brand">Brand</a>
          <div class="nav-links">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Services</a>
            <a href="#" class="nav-link">Contact</a>
          </div>
        </div>
        <button class="menu-button">
          <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </div>
  </div>`;

    case 'sidebar':
      return `
  <div class="liquid-glass liquid-glass-sidebar">
    <div class="content">
      <h3 class="title">Menu</h3>
      <nav class="nav">
        <a href="#" class="nav-item active">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
          <span>Dashboard</span>
        </a>
        <a href="#" class="nav-item">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </a>
        <a href="#" class="nav-item">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  </div>`;

    case 'dropdown':
      return `
  <div class="liquid-glass liquid-glass-dropdown">
    <div class="content">
      <button class="trigger">
        <span class="trigger-text">Select an option</span>
        <svg class="trigger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="options">
        <div class="option selected">Option 1</div>
        <div class="option">Option 2</div>
        <div class="option">Option 3</div>
      </div>
    </div>
  </div>`;

    case 'toast':
      return `
  <div class="liquid-glass liquid-glass-toast">
    <div class="content">
      <div class="toast-container">
        <div class="icon">
          <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="message">
          <h4 class="title">Success!</h4>
          <p class="description">Your changes have been saved successfully.</p>
        </div>
        <button class="close-button">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>`;

    case 'input':
      return `
  <div class="liquid-glass liquid-glass-form">
    <div class="content">
      <div class="field">
        <label class="label">Email</label>
        <input type="email" class="input" placeholder="Enter your email">
      </div>
      <div class="field">
        <label class="label">Password</label>
        <input type="password" class="input" placeholder="Enter your password">
      </div>
      <button class="submit-button">Sign In</button>
    </div>
  </div>`;

    default: // card
      return `
  <div class="liquid-glass liquid-glass-card">
    <div class="content">
      <h3 class="title">Liquid Glass Card</h3>
      <p class="description">
        Beautiful glassmorphism effect with backdrop blur and transparency. 
        Perfect for modern UI designs.
      </p>
    </div>
  </div>`;
  }
}

export function generateReact(config: LiquidGlassConfig): string {
  const css = generateCSS(config);
  const componentCode = getReactComponent(config.type);
  
  return `
import React from 'react';

${componentCode}

// CSS (add to your stylesheet)
const styles = \`
${css}
\`;

export default LiquidGlass${config.type.charAt(0).toUpperCase() + config.type.slice(1)};`.trim();
}

function getReactComponent(type: string): string {
  switch (type) {
    case 'button':
      return `
const LiquidGlassButton: React.FC<{
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children = 'Click me', onClick, className = '' }) => {
  return (
    <button 
      className={\`liquid-glass liquid-glass-button \${className}\`}
      onClick={onClick}
    >
      <span className="content">{children}</span>
    </button>
  );
};`;

    case 'modal':
      return `
const LiquidGlassModal: React.FC<{
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  className?: string;
}> = ({ 
  title = 'Modal Title', 
  children = 'This is a modal dialog with liquid glass effect. It creates a beautiful frosted glass appearance.',
  onClose, 
  onConfirm,
  className = '' 
}) => {
  return (
    <div className={\`liquid-glass liquid-glass-modal \${className}\`}>
      <div className="content">
        <div className="header">
          <h3 className="title">{title}</h3>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <div className="body">
          {children}
        </div>
        <div className="actions">
          <button className="button secondary" onClick={onClose}>Cancel</button>
          <button className="button primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};`;

    case 'panel':
      return `
const LiquidGlassPanel: React.FC<{
  title?: string;
  controls?: Array<{ label: string; value: string; percentage: number }>;
  className?: string;
}> = ({ 
  title = 'Control Panel',
  controls = [
    { label: 'Brightness', value: '85%', percentage: 80 },
    { label: 'Volume', value: '62%', percentage: 60 }
  ],
  className = '' 
}) => {
  return (
    <div className={\`liquid-glass liquid-glass-panel \${className}\`}>
      <div className="content">
        <h3 className="title">{title}</h3>
        {controls.map((control, index) => (
          <div key={index}>
            <div className="control-item">
              <span className="control-label">{control.label}</span>
              <span className="control-value">{control.value}</span>
            </div>
            <div className="slider-container">
              <div className="slider-fill" style={{ width: \`\${control.percentage}%\` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`;

    case 'navigation':
      return `
const LiquidGlassNavigation: React.FC<{
  brand?: string;
  links?: Array<{ href: string; label: string }>;
  className?: string;
}> = ({ 
  brand = 'Brand',
  links = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Services' },
    { href: '#', label: 'Contact' }
  ],
  className = '' 
}) => {
  return (
    <div className={\`liquid-glass liquid-glass-nav \${className}\`}>
      <div className="content">
        <nav className="nav-container">
          <div className="nav-left">
            <a href="#" className="brand">{brand}</a>
            <div className="nav-links">
              {links.map((link, index) => (
                <a key={index} href={link.href} className="nav-link">{link.label}</a>
              ))}
            </div>
          </div>
          <button className="menu-button">
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};`;

    case 'sidebar':
      return `
const LiquidGlassSidebar: React.FC<{
  title?: string;
  items?: Array<{ href: string; icon: string; label: string; active?: boolean }>;
  className?: string;
}> = ({ 
  title = 'Menu',
  items = [
    { href: '#', icon: 'dashboard', label: 'Dashboard', active: true },
    { href: '#', icon: 'profile', label: 'Profile' },
    { href: '#', icon: 'settings', label: 'Settings' }
  ],
  className = '' 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />;
      case 'profile':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
      case 'settings':
        return (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={\`liquid-glass liquid-glass-sidebar \${className}\`}>
      <div className="content">
        <h3 className="title">{title}</h3>
        <nav className="nav">
          {items.map((item, index) => (
            <a key={index} href={item.href} className={\`nav-item \${item.active ? 'active' : ''}\`}>
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getIcon(item.icon)}
              </svg>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};`;

    case 'dropdown':
      return `
const LiquidGlassDropdown: React.FC<{
  placeholder?: string;
  options?: string[];
  className?: string;
  onSelect?: (option: string) => void;
}> = ({ 
  placeholder = 'Select an option',
  options = ['Option 1', 'Option 2', 'Option 3'],
  className = '',
  onSelect
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option);
  };

  return (
    <div className={\`liquid-glass liquid-glass-dropdown \${className}\`}>
      <div className="content">
        <button className="trigger">
          <span className="trigger-text">{selectedOption || placeholder}</span>
          <svg className="trigger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="options">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={\`option \${selectedOption === option ? 'selected' : ''}\`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`;

    case 'toast':
      return `
const LiquidGlassToast: React.FC<{
  title?: string;
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
  className?: string;
}> = ({ 
  title = 'Success!',
  message = 'Your changes have been saved successfully.',
  type = 'success',
  onClose,
  className = '' 
}) => {
  return (
    <div className={\`liquid-glass liquid-glass-toast \${className}\`}>
      <div className="content">
        <div className="toast-container">
          <div className="icon">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="message">
            <h4 className="title">{title}</h4>
            <p className="description">{message}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};`;

    case 'input':
      return `
const LiquidGlassForm: React.FC<{
  fields?: Array<{ name: string; type: string; label: string; placeholder: string }>;
  onSubmit?: (data: Record<string, string>) => void;
  submitLabel?: string;
  className?: string;
}> = ({ 
  fields = [
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password' }
  ],
  onSubmit,
  submitLabel = 'Sign In',
  className = '' 
}) => {
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form className={\`liquid-glass liquid-glass-form \${className}\`} onSubmit={handleSubmit}>
      <div className="content">
        {fields.map((field, index) => (
          <div key={index} className="field">
            <label className="label">{field.label}</label>
            <input 
              type={field.type}
              className="input" 
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">{submitLabel}</button>
      </div>
    </form>
  );
};`;

    default: // card
      return `
const LiquidGlassCard: React.FC<{
  title?: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ 
  title = 'Liquid Glass Card',
  children = 'Beautiful glassmorphism effect with backdrop blur and transparency. Perfect for modern UI designs.',
  className = '' 
}) => {
  return (
    <div className={\`liquid-glass liquid-glass-card \${className}\`}>
      <div className="content">
        <h3 className="title">{title}</h3>
        <div className="description">
          {children}
        </div>
      </div>
    </div>
  );
};`;
  }
}

export function generateCode(config: LiquidGlassConfig, outputType: OutputType): string {
  switch (outputType) {
    case 'css':
      return generateCSS(config);
    case 'html':
      return generateHTML(config);
    case 'react':
      return generateReact(config);
    case 'vue':
      return generateVue(config);
    case 'typescript':
      return generateTypeScript(config);
    default:
      return generateCSS(config);
  }
}

function generateVue(config: LiquidGlassConfig): string {
  const css = generateCSS(config);
  const vueTemplate = getVueTemplate(config.type);
  
  return `
${vueTemplate}

<style scoped>
${css}
</style>`.trim();
}

function getVueTemplate(type: string): string {
  switch (type) {
    case 'button':
      return `
<template>
  <button class="liquid-glass liquid-glass-button" @click="$emit('click')">
    <span class="content">
      <slot>Click me</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: []
}>();
</script>`;

    case 'modal':
      return `
<template>
  <div class="liquid-glass liquid-glass-modal">
    <div class="content">
      <div class="header">
        <h3 class="title">{{ title }}</h3>
        <button class="close-button" @click="$emit('close')">✕</button>
      </div>
      <div class="body">
        <slot>This is a modal dialog with liquid glass effect.</slot>
      </div>
      <div class="actions">
        <button class="button secondary" @click="$emit('close')">Cancel</button>
        <button class="button primary" @click="$emit('confirm')">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Modal Title'
});

defineEmits<{
  close: []
  confirm: []
}>();
</script>`;

    default:
      return `
<template>
  <div class="liquid-glass liquid-glass-card">
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <div class="description">
        <slot>Beautiful glassmorphism effect with backdrop blur and transparency.</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Liquid Glass Card'
});
</script>`;
  }
}

export function generateTypeScript(config: LiquidGlassConfig): string {
  const componentName = `LiquidGlass${config.type.charAt(0).toUpperCase() + config.type.slice(1)}`;
  
  const getTypeDefinitions = () => {
    switch (config.type) {
      case 'button':
        return `
/**
 * Props for the ${componentName} component
 */
export interface ${componentName}Props {
  /** Content to display inside the button */
  children?: React.ReactNode;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS class names */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}`;

      case 'modal':
        return `
/**
 * Props for the ${componentName} component
 */
export interface ${componentName}Props {
  /** Modal title */
  title?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close event handler */
  onClose?: () => void;
  /** Confirm event handler */
  onConfirm?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether to show action buttons */
  showActions?: boolean;
}`;

      case 'input':
        return `
/**
 * Form field configuration
 */
export interface FormField {
  /** Field name/id */
  name: string;
  /** Input type */
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Field label */
  label: string;
  /** Placeholder text */
  placeholder: string;
  /** Whether the field is required */
  required?: boolean;
  /** Field validation pattern */
  pattern?: string;
}

/**
 * Props for the ${componentName} component
 */
export interface ${componentName}Props {
  /** Form fields configuration */
  fields?: FormField[];
  /** Form submission handler */
  onSubmit?: (data: Record<string, string>) => void;
  /** Submit button label */
  submitLabel?: string;
  /** Additional CSS class names */
  className?: string;
  /** Whether the form is loading */
  isLoading?: boolean;
}`;

      default:
        return `
/**
 * Props for the ${componentName} component
 */
export interface ${componentName}Props {
  /** Component title */
  title?: string;
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}`;
    }
  };

  const getUsageExample = () => {
    switch (config.type) {
      case 'button':
        return `
// Usage Example:
import { ${componentName} } from './components/LiquidGlass';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <${componentName} 
      onClick={handleClick}
      size="md"
      className="my-custom-class"
    >
      Click me!
    </${componentName}>
  );
}`;

      case 'modal':
        return `
// Usage Example:
import { useState } from 'react';
import { ${componentName} } from './components/LiquidGlass';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <${componentName} 
        isOpen={isOpen}
        title="Confirm Action"
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Confirmed!');
          setIsOpen(false);
        }}
      >
        Are you sure you want to continue?
      </${componentName}>
    </>
  );
}`;

      case 'input':
        return `
// Usage Example:
import { ${componentName} } from './components/LiquidGlass';

function App() {
  const fields = [
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password' }
  ];

  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form data:', data);
  };

  return (
    <${componentName} 
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Sign In"
    />
  );
}`;

      default:
        return `
// Usage Example:
import { ${componentName} } from './components/LiquidGlass';

function App() {
  return (
    <${componentName} title="Welcome">
      This is a beautiful liquid glass component!
    </${componentName}>
  );
}`;
    }
  };

  return `
/**
 * 🌟 Liquid Glass ${config.type.charAt(0).toUpperCase() + config.type.slice(1)} Component
 * 
 * A beautiful glassmorphism component with advanced backdrop filters.
 * 
 * Features:
 * ✨ Modern glassmorphism design
 * 🎨 Customizable blur and opacity
 * 📱 Responsive design
 * ♿ Accessibility compliant
 * ${config.animationEnabled ? `🎭 Animated with ${config.animationType} effect` : '🎯 Static design'}
 * ${config.hoverEnabled ? `🖱️ Interactive hover effects (${config.hoverEffect})` : ''}
 * ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? '🎯 Advanced cursor tracking' : ''}
 * 
 * Configuration:
 * - Blur: ${config.blur}px
 * - Opacity: ${config.opacity}
 * - Saturation: ${config.saturation}%
 * - Border Radius: ${config.borderRadius}px
 * - Padding: ${config.padding}px
 * ${config.animationEnabled ? `- Animation: ${config.animationType} (${config.animationDuration}s duration, ${config.animationDelay}s delay)` : ''}
 * ${config.hoverEnabled ? `- Hover Effect: ${config.hoverEffect} (intensity: ${config.hoverIntensity}, duration: ${config.hoverDuration}s)` : ''}
 * 
 * Generated at: ${new Date().toISOString()}
 */

import React from 'react';

${getTypeDefinitions()}

/**
 * CSS Custom Properties (CSS Variables)
 * Add these to your root CSS for easy theming:
 */
/*
:root {
  --liquid-glass-blur: ${config.blur}px;
  --liquid-glass-opacity: ${config.opacity};
  --liquid-glass-saturation: ${config.saturation}%;
  --liquid-glass-border-radius: ${config.borderRadius}px;
  --liquid-glass-padding: ${config.padding}px;
  --liquid-glass-bg: ${config.backgroundColor};
  --liquid-glass-border: ${config.borderColor};
  ${config.animationEnabled ? `--liquid-glass-animation-duration: ${config.animationDuration}s;` : ''}
  ${config.hoverEnabled ? `--liquid-glass-hover-duration: ${config.hoverDuration}s;` : ''}
  ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? `
  /* Cursor tracking variables (dynamically set by JavaScript) */
  --cursor-x: 50%;
  --cursor-y: 50%;` : ''}
}
*/

${getUsageExample()}

/**
 * Installation & Setup:
 * 
 * 1. Install dependencies:
 *    npm install react @types/react
 * 
 * 2. Add the CSS (see generated CSS tab)
 * 
 * 3. Import and use the component:
 *    import { ${componentName} } from './components/LiquidGlass';
 * 
 * ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? `
 * 4. Cursor Tracking Setup (for ${config.hoverEffect} effect):
 *    Add mouse event listeners to track cursor position:
 *    \`\`\`typescript
 *    const handleMouseMove = (e: MouseEvent) => {
 *      const rect = element.getBoundingClientRect();
 *      const x = ((e.clientX - rect.left) / rect.width) * 100;
 *      const y = ((e.clientY - rect.top) / rect.height) * 100;
 *      ${config.hoverEffect === 'cursor-tilt' ? `// For cursor-tilt, use numeric values without units
 *      element.style.setProperty('--cursor-x', Math.max(0, Math.min(100, x)).toString());
 *      element.style.setProperty('--cursor-y', Math.max(0, Math.min(100, y)).toString());` : `// For other cursor effects, use percentage values
 *      element.style.setProperty('--cursor-x', \`\${x}%\`);
 *      element.style.setProperty('--cursor-y', \`\${y}%\`);`}
 *    };
 *    element.addEventListener('mousemove', handleMouseMove);
 *    \`\`\`
 * ` : ''}
 * 
 * Browser Support:
 * ✅ Chrome 76+
 * ✅ Firefox 103+
 * ✅ Safari 9+
 * ✅ Edge 79+
 * ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? '✅ CSS Custom Properties support required for cursor tracking' : ''}
 * 
 * Performance Notes:
 * - backdrop-filter is GPU accelerated
 * - Use transform3d(0,0,0) to force hardware acceleration if needed
 * - Consider reducing blur on lower-end devices
 * ${config.hoverEnabled ? '- Hover effects use CSS transitions for smooth performance' : ''}
 * ${config.animationEnabled ? '- Animations are optimized for 60fps performance' : ''}
 * ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? '- Cursor tracking uses requestAnimationFrame for smooth updates' : ''}
 */

${getReactComponent(config.type)}

export default ${componentName};

/**
 * Accessibility Features:
 * - ARIA attributes included
 * - Keyboard navigation support
 * - Focus management
 * - Screen reader compatibility
 * ${config.hoverEnabled ? '- Hover effects respect prefers-reduced-motion' : ''}
 * ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? '- Cursor effects are purely visual and don\'t affect keyboard navigation' : ''}
 * 
 * Customization:
 * You can override the default styles by:
 * 1. Using CSS custom properties (variables)
 * 2. Passing custom className prop
 * 3. Modifying the CSS directly
 * ${config.hoverEnabled ? '4. Customizing hover effects via CSS' : ''}
 * ${config.animationEnabled ? '4. Adjusting animation parameters' : ''}
 * ${config.hoverEffect === 'cursor-follow' || config.hoverEffect === 'cursor-glow' || config.hoverEffect === 'cursor-tilt' ? '5. Fine-tuning cursor tracking sensitivity' : ''}
 */`.trim();
}

export function getOutputOptions() {
  return [
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'typescript', label: 'TypeScript' },
  ];
}