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
  } = config;

  // Parse the backgroundColor to extract RGB values and apply opacity
  const parseRgbaWithOpacity = (color: string, opacityValue: number) => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacityValue})`;
    }
    // Fallback for hex colors or other formats
    return `rgba(255, 255, 255, ${opacityValue})`;
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
  
  return `${baseCSS}${componentSpecificCSS}`.trim();
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