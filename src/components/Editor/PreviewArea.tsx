import React, { useState, useEffect, useRef } from 'react';
import { LiquidGlassConfig } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n/context';

interface PreviewAreaProps {
  config: LiquidGlassConfig;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ config }) => {
  const { t } = useI18n();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle cursor tracking for cursor-follow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Update CSS variables for cursor position
      if (config.hoverEffect === 'cursor-tilt') {
        // For cursor-tilt, we need values that can be used in calc() for rotation
        containerRef.current.style.setProperty('--cursor-x', `${Math.max(0, Math.min(100, x))}`);
        containerRef.current.style.setProperty('--cursor-y', `${Math.max(0, Math.min(100, y))}`);
      } else {
        // For other cursor effects, use percentage values
        containerRef.current.style.setProperty('--cursor-x', `${Math.max(0, Math.min(100, x))}%`);
        containerRef.current.style.setProperty('--cursor-y', `${Math.max(0, Math.min(100, y))}%`);
      }
    };

    const container = containerRef.current;
    if (container && config.hoverEnabled && 
        (config.hoverEffect === 'cursor-follow' || 
         config.hoverEffect === 'cursor-glow' || 
         config.hoverEffect === 'cursor-tilt')) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        if (config.hoverEffect === 'cursor-tilt') {
          container.style.setProperty('--cursor-x', '50');
          container.style.setProperty('--cursor-y', '50');
        } else {
          container.style.setProperty('--cursor-x', '50%');
          container.style.setProperty('--cursor-y', '50%');
        }
      });
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [config.hoverEnabled, config.hoverEffect]);
  
  // Generate dynamic CSS for hover effects
  useEffect(() => {
    const styleId = 'dynamic-liquid-glass-styles';
    let existingStyle = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!existingStyle) {
      existingStyle = document.createElement('style');
      existingStyle.id = styleId;
      document.head.appendChild(existingStyle);
    }

    const hoverCSS = config.hoverEnabled && config.hoverEffect !== 'none' ? `
      .preview-liquid-glass {
        transition: all ${config.hoverDuration}s ease;
        cursor: pointer;
      }
      
      .preview-liquid-glass:hover {
        ${config.hoverEffect === 'lift' ? `
          transform: translateY(-${config.hoverIntensity * 8}px);
          box-shadow: 
            0 ${8 + config.hoverIntensity * 12}px ${32 + config.hoverIntensity * 20}px 0 rgba(31, 38, 135, 0.37),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        ` : ''}
        
        ${config.hoverEffect === 'glow' ? `
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 ${config.hoverIntensity * 20}px rgba(255, 255, 255, ${config.hoverIntensity * 0.4});
        ` : ''}
        
        ${config.hoverEffect === 'blur' ? `
          backdrop-filter: blur(${config.blur * config.hoverIntensity}px) saturate(${config.saturation}%);
          -webkit-backdrop-filter: blur(${config.blur * config.hoverIntensity}px) saturate(${config.saturation}%);
        ` : ''}
        
        ${config.hoverEffect === 'brightness' ? `
          filter: brightness(${config.hoverIntensity});
        ` : ''}
        
        ${config.hoverEffect === 'scale' ? `
          transform: scale(${config.hoverIntensity});
        ` : ''}
        
        ${config.hoverEffect === 'tilt' ? `
          transform: perspective(1000px) rotateX(${config.hoverIntensity * 5}deg) rotateY(${config.hoverIntensity * 5}deg);
        ` : ''}
        
        ${config.hoverEffect === 'rainbow' ? `
          background: linear-gradient(
            45deg,
            rgba(255, 0, 150, ${config.opacity * config.hoverIntensity * 0.3}) 0%,
            rgba(0, 204, 255, ${config.opacity * config.hoverIntensity * 0.3}) 25%,
            rgba(255, 204, 0, ${config.opacity * config.hoverIntensity * 0.3}) 50%,
            rgba(255, 0, 150, ${config.opacity * config.hoverIntensity * 0.3}) 75%,
            rgba(0, 204, 255, ${config.opacity * config.hoverIntensity * 0.3}) 100%
          ) !important;
          background-size: 400% 400% !important;
          animation: liquid-glass-rainbow-shift ${config.hoverDuration * 2}s ease infinite !important;
        ` : ''}
      }

      /* Cursor Follow Effects */
      ${config.hoverEffect === 'cursor-follow' ? `
        .preview-liquid-glass {
          position: relative;
          overflow: hidden;
        }
        
        .preview-liquid-glass::after {
          content: '';
          position: absolute;
          top: var(--cursor-y, 50%);
          left: var(--cursor-x, 50%);
          width: ${config.hoverIntensity * 100}px;
          height: ${config.hoverIntensity * 100}px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, ${config.hoverIntensity * 0.3}) 0%,
            rgba(255, 255, 255, ${config.hoverIntensity * 0.1}) 50%,
            transparent 100%
          );
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity ${config.hoverDuration}s ease;
          z-index: 20;
        }
        
        .preview-liquid-glass:hover::after {
          opacity: 1;
        }
      ` : ''}

      ${config.hoverEffect === 'cursor-glow' ? `
        .preview-liquid-glass {
          position: relative;
          overflow: hidden;
        }
        
        .preview-liquid-glass::before {
          content: '';
          position: absolute;
          top: var(--cursor-y, 50%);
          left: var(--cursor-x, 50%);
          width: ${config.hoverIntensity * 150}px;
          height: ${config.hoverIntensity * 150}px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, ${config.hoverIntensity * 0.4}) 0%,
            rgba(100, 200, 255, ${config.hoverIntensity * 0.2}) 30%,
            rgba(255, 100, 200, ${config.hoverIntensity * 0.1}) 60%,
            transparent 100%
          );
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity ${config.hoverDuration}s ease;
          filter: blur(${config.hoverIntensity * 2}px);
          animation: liquid-glass-cursor-glow ${config.hoverDuration * 4}s ease-in-out infinite;
          z-index: 1;
        }
        
        .preview-liquid-glass:hover::before {
          opacity: 1;
        }
      ` : ''}

      ${config.hoverEffect === 'cursor-tilt' ? `
        .preview-liquid-glass {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .preview-liquid-glass:hover {
          transform: 
            perspective(1000px)
            rotateX(calc((var(--cursor-y, 50) - 50) * ${config.hoverIntensity * 0.3}deg))
            rotateY(calc((var(--cursor-x, 50) - 50) * ${config.hoverIntensity * 0.3}deg))
            translateZ(${config.hoverIntensity * 10}px) !important;
          transition: transform ${config.hoverDuration}s ease;
        }
      ` : ''}
    ` : `
      .preview-liquid-glass {
        cursor: default;
      }
    `;

    existingStyle.textContent = hoverCSS;

    return () => {
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, [config]);
  
  const getBackgroundStyle = () => {
    if (isDarkMode) {
      return {
        background: `
          linear-gradient(135deg, #1e293b 0%, #0f172a 100%),
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
      };
    }
    return {
      background: `
        linear-gradient(135deg, #667eea 0%, #764ba2 100%),
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `,
    };
  };

  const getLiquidGlassStyle = () => {
    // Parse the backgroundColor to extract RGB values and apply opacity
    const parseRgba = (color: string, opacity: number) => {
      // Check if it's already an rgba/rgb color
      const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgbaMatch) {
        return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
      }
      
      // Check if it's a hex color
      const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      if (hexMatch) {
        const r = parseInt(hexMatch[1], 16);
        const g = parseInt(hexMatch[2], 16);
        const b = parseInt(hexMatch[3], 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      
      // Fallback for other formats
      return `rgba(255, 255, 255, ${opacity})`;
    };

    const getAnimationStyle = () => {
      if (!config.animationEnabled || config.animationType === 'none') return {};

      const animationName = `liquid-glass-${config.animationType}`;
      const animationDuration = `${config.animationDuration}s`;
      const animationDelay = `${config.animationDelay}s`;

      return {
        animation: `${animationName} ${animationDuration} ease-in-out ${animationDelay} infinite`,
      };
    };

    return {
      position: 'relative' as const,
      backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
      WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
      background: parseRgba(config.backgroundColor, config.opacity),
      border: `1px solid ${config.borderColor}`,
      borderRadius: `${config.borderRadius}px`,
      padding: `${config.padding}px`,
      boxShadow: `
        0 8px 32px 0 rgba(31, 38, 135, 0.37),
        inset 0 0 0 1px rgba(255, 255, 255, 0.1)
      `,
      overflow: 'hidden' as const,
      ...getAnimationStyle(),
    };
  };

  const getGradientOverlayStyle = () => {
    return {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
      )`,
      pointerEvents: 'none' as const,
    };
  };

  const getContentByType = () => {
    const liquidGlassStyle = getLiquidGlassStyle();
    
    switch (config.type) {
      case 'button':
        return (
          <button 
            style={{
              ...liquidGlassStyle,
              background: 'transparent',
              border: `1px solid ${config.borderColor}`,
              cursor: 'pointer',
            }}
            className="min-h-[44px] px-6 touch-manipulation active:scale-95 transition-transform preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <span className="text-white font-medium relative z-10 text-sm lg:text-base">Click me</span>
          </button>
        );
        
      case 'modal':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-md mx-auto preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h3 className="text-base lg:text-lg font-semibold text-white">Modal Title</h3>
                <button className="text-white hover:text-gray-300 p-1 touch-manipulation">✕</button>
              </div>
              <p className="text-white/80 mb-3 lg:mb-4 text-sm lg:text-base">
                This is a modal dialog with liquid glass effect. It creates a beautiful frosted glass appearance.
              </p>
              <div className="flex justify-end space-x-2">
                <button className="px-3 lg:px-4 py-2 text-white/80 hover:text-white text-sm lg:text-base touch-manipulation">Cancel</button>
                <button className="px-3 lg:px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 text-sm lg:text-base touch-manipulation">Confirm</button>
              </div>
            </div>
          </div>
        );
        
      case 'panel':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-sm mx-auto preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-3">Control Panel</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm lg:text-base">Brightness</span>
                  <span className="text-white text-sm lg:text-base">85%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full touch-manipulation">
                  <div className="w-4/5 h-full bg-white/60 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm lg:text-base">Volume</span>
                  <span className="text-white text-sm lg:text-base">62%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full touch-manipulation">
                  <div className="w-3/5 h-full bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-2xl mx-auto preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-white">Brand</h2>
                  <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-white/80 hover:text-white text-sm lg:text-base">Home</a>
                    <a href="#" className="text-white/80 hover:text-white text-sm lg:text-base">About</a>
                    <a href="#" className="text-white/80 hover:text-white text-sm lg:text-base">Services</a>
                    <a href="#" className="text-white/80 hover:text-white text-sm lg:text-base">Contact</a>
                  </div>
                </div>
                <button className="text-white/80 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        );

      case 'sidebar':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-xs mx-auto h-96 preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">Menu</h3>
              </div>
              <nav className="flex-1 space-y-2">
                <a href="#" className="flex items-center space-x-3 text-white/90 hover:text-white p-2 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  <span className="text-sm lg:text-base">Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-white/80 hover:text-white p-2 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm lg:text-base">Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-white/80 hover:text-white p-2 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm lg:text-base">Settings</span>
                </a>
              </nav>
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-xs mx-auto preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="text-white text-sm lg:text-base">Select an option</span>
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded text-sm lg:text-base cursor-pointer">
                  Option 1
                </div>
                <div className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded text-sm lg:text-base cursor-pointer">
                  Option 2
                </div>
                <div className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded text-sm lg:text-base cursor-pointer">
                  Option 3
                </div>
              </div>
            </div>
          </div>
        );

      case 'toast':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-sm mx-auto preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm lg:text-base">Success!</h4>
                  <p className="text-white/80 text-xs lg:text-sm mt-1">Your changes have been saved successfully.</p>
                </div>
                <button className="text-white/60 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case 'input':
        return (
          <div 
            style={liquidGlassStyle}
            className="w-full max-w-sm mx-auto preview-liquid-glass"
          >
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10 space-y-4">
              <div>
                <label className="block text-white/80 text-sm lg:text-base mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm lg:text-base mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-sm lg:text-base"
                />
              </div>
              <button className="w-full py-2 bg-white/20 text-white rounded hover:bg-white/30 transition-colors text-sm lg:text-base">
                Sign In
              </button>
            </div>
          </div>
        );
        
      default: // card
        return (
          <div style={liquidGlassStyle} className="mx-auto preview-liquid-glass">
            <div style={getGradientOverlayStyle()}></div>
            <div className="relative z-10">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">Liquid Glass Card</h3>
              <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                Beautiful glassmorphism effect with backdrop blur and transparency. 
                Perfect for modern UI designs.
              </p>
            </div>
          </div>
        );
    }
  };

  const isCursorFollowEffect = config.hoverEnabled && 
    (config.hoverEffect === 'cursor-follow' || 
     config.hoverEffect === 'cursor-glow' || 
     config.hoverEffect === 'cursor-tilt');

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t.previewTitle}
        </h2>
        
        <div className="flex items-center space-x-1 lg:space-x-2">
          <Button
            variant={!isDarkMode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsDarkMode(false)}
            className="px-2 lg:px-3 py-1 lg:py-2 text-xs lg:text-sm"
          >
            Light
          </Button>
          <Button
            variant={isDarkMode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsDarkMode(true)}
            className="px-2 lg:px-3 py-1 lg:py-2 text-xs lg:text-sm"
          >
            Dark
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-4 lg:p-8 transition-all duration-300 relative overflow-auto"
        style={getBackgroundStyle()}
      >
        {/* Texture overlay to make blur more visible */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
          }}
        />
        <div className="w-full max-w-sm lg:max-w-none lg:w-auto">
          {getContentByType()}
        </div>
        
        {/* Hover instruction overlay */}
        {config.hoverEnabled && config.hoverEffect !== 'none' && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {isCursorFollowEffect 
              ? t.moveInstruction.replace('{effect}', config.hoverEffect)
              : t.hoverInstruction.replace('{effect}', config.hoverEffect)
            }
          </div>
        )}
      </div>
    </div>
  );
};