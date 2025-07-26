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

  return `
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
}`.trim();
}

export function generateHTML(config: LiquidGlassConfig): string {
  const css = generateCSS(config);
  
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  <div class="liquid-glass">
    <h2 style="margin: 0 0 16px 0; color: rgba(255, 255, 255, 0.9);">Liquid Glass</h2>
    <p style="margin: 0; color: rgba(255, 255, 255, 0.7); line-height: 1.5;">
      Beautiful glassmorphism effect with backdrop blur and transparency.
    </p>
  </div>
</body>
</html>`.trim();
}

export function generateReact(config: LiquidGlassConfig): string {
  const css = generateCSS(config);
  
  return `
import React from 'react';

const LiquidGlassCard: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={\`liquid-glass \${className}\`}>
      {children}
    </div>
  );
};

// CSS (add to your stylesheet)
const styles = \`
${css}
\`;

export default LiquidGlassCard;`.trim();
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
  
  return `
<template>
  <div class="liquid-glass" :class="className">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
}

withDefaults(defineProps<Props>(), {
  className: ''
});
</script>

<style scoped>
${css}
</style>`.trim();
}