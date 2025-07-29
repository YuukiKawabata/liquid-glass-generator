'use client';

import { ReactNode, useState } from 'react';
import { LiquidGlassFilters } from './LiquidGlassFilters';

interface LiquidGlassContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'enhanced' | 'preview';
  roundness?: number;
  enableDistortion?: boolean;
  enableParticles?: boolean;
  enableInteractive?: boolean;
}

export function LiquidGlassContainer({
  children,
  className = '',
  variant = 'default',
  roundness = 16,
  enableDistortion = false,
  enableParticles = false,
  enableInteractive = false
}: LiquidGlassContainerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableInteractive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const getFilterStyle = () => {
    if (!enableDistortion) return {};
    
    switch (variant) {
      case 'enhanced':
        return { filter: 'url(#lg-dist-subtle) saturate(150%)' };
      case 'preview':
        return { filter: 'url(#lg-dist) saturate(150%)' };
      default:
        return { filter: 'url(#lg-dist-subtle) saturate(120%)' };
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'enhanced':
        return 'liquid-glass-enhanced';
      case 'preview':
        return 'liquid-glass-preview';
      default:
        return 'liquid-glass';
    }
  };

  return (
    <>
      <LiquidGlassFilters />
      <div
        className={`
          ${getVariantClasses()}
          ${enableParticles ? 'liquid-glass-particles' : ''}
          ${enableInteractive ? 'liquid-glass-interactive' : ''}
          ${className}
        `}
        style={{
          '--liquid-roundness': `${roundness}px`,
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
          borderRadius: `${roundness}px`,
          position: 'relative',
          ...getFilterStyle()
        }}
        onMouseMove={handleMouseMove}
      >
        {children}

        {/* Interactive Light Effect */}
        {enableInteractive && (
          <div
            className="absolute pointer-events-none transition-opacity duration-200 opacity-0 hover:opacity-100"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
              zIndex: 10
            }}
          />
        )}

        {/* Particle Effect Layer */}
        {enableParticles && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 80px 80px, 100px 100px',
              animation: 'liquid-glass-float 15s ease-in-out infinite',
              opacity: 0.4,
              borderRadius: `${roundness}px`
            }}
          />
        )}
      </div>

      <style jsx>{`
        .liquid-glass-preview {
          background: var(--liquid-glass-white);
          border-radius: var(--liquid-roundness);
          border: 1px solid var(--liquid-glass-white-border);
          box-shadow: 
            var(--liquid-glass-shadow),
            inset 0 1px 2px rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }

        .liquid-glass-preview:hover {
          background: var(--liquid-glass-white-hover);
          box-shadow: 
            var(--liquid-glass-shadow-hover),
            inset 0 2px 4px rgba(255, 255, 255, 0.15);
          transform: translateY(-1px) scale(1.005);
        }

        .liquid-glass-interactive::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 25%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 5;
        }

        .liquid-glass-interactive:hover::after {
          opacity: 1;
        }

        .liquid-glass-particles {
          position: relative;
          overflow: hidden;
        }

        .liquid-glass-particles::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 70px 70px, 90px 90px, 110px 110px;
          animation: liquid-glass-float 20s ease-in-out infinite;
          opacity: 0.3;
          pointer-events: none;
          border-radius: inherit;
        }

        @keyframes liquid-glass-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            background-position: 0% 0%, 0% 0%, 0% 0%;
          }
          25% { 
            transform: translateY(-5px) rotate(1deg); 
            background-position: 25% 25%, -25% 25%, 50% -50%;
          }
          50% { 
            transform: translateY(-10px) rotate(0deg); 
            background-position: 50% 50%, -50% 50%, 100% -100%;
          }
          75% { 
            transform: translateY(-5px) rotate(-1deg); 
            background-position: 75% 75%, -75% 75%, 150% -150%;
          }
        }
      `}</style>
    </>
  );
}