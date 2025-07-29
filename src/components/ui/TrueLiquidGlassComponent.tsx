'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { LiquidGlassFilters } from './LiquidGlassFilters';

interface TrueLiquidGlassComponentProps {
  children: ReactNode;
  componentType: 'card' | 'button' | 'modal' | 'panel' | 'navigation' | 'sidebar';
  accentColor?: string;
  roundness?: number;
  paddingX?: number;
  paddingY?: number;
  blur?: number;
  opacity?: number;
  saturation?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'light' | 'dark' | 'auto';
  onClick?: () => void;
}

export function TrueLiquidGlassComponent({
  children,
  componentType,
  accentColor = '#D7DADD',
  roundness = 16,
  paddingX = 24,
  paddingY = 16,
  blur = 16,
  opacity = 0.15,
  saturation = 180,
  className = '',
  style = {},
  variant = 'auto',
  onClick
}: TrueLiquidGlassComponentProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(-75);
  const [angle1, setAngle1] = useState(-75);
  const [angle2, setAngle2] = useState(-45);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovering) {
      const interval = setInterval(() => {
        setRotationAngle(prev => prev + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  // Handle angle changes for different states
  useEffect(() => {
    if (componentType === 'button') {
      if (isActive) {
        setAngle1(-75);
        setAngle2(-15);
      } else if (isHovering) {
        setAngle1(-125);
        setAngle2(-45);
      } else {
        setAngle1(-75);
        setAngle2(-45);
      }
    }
  }, [isHovering, isActive, componentType]);

  const isDark = variant === 'auto' 
    ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    : variant === 'dark';

  const getComponentClasses = () => {
    const baseClasses = 'true-liquid-glass-component relative overflow-hidden';
    
    switch (componentType) {
      case 'button':
        return `${baseClasses} cursor-pointer inline-block`;
      case 'card':
        return `${baseClasses} block`;
      case 'modal':
        return `${baseClasses} block max-w-md mx-auto`;
      case 'panel':
        return `${baseClasses} block max-w-xs`;
      case 'navigation':
        return `${baseClasses} block w-full`;
      case 'sidebar':
        return `${baseClasses} block max-w-xs h-full`;
      default:
        return `${baseClasses} block`;
    }
  };

  return (
    <>
      <LiquidGlassFilters />
      <div 
        ref={componentRef}
        className={`${getComponentClasses()} ${className}`}
        style={{
          ...({
            '--roundness': `${roundness}px`,
            '--anim--hover-time': '400ms',
            '--anim--hover-ease': 'cubic-bezier(0.25, 1, 0.5, 1)',
            '--shadow-cuttoff-fix': '2em',
          } as Record<string, string>),
          borderRadius: `${roundness}px`,
          pointerEvents: 'none' as const,
          transition: 'all var(--anim--hover-time) var(--anim--hover-ease)',
          transform: isActive && componentType === 'button' ? 'rotate3d(1, 0, 0, 25deg)' : 'none',
          ...style
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsActive(false);
        }}
      >
        {/* Hover Effect with Rotating Gradient */}
        {isHovering && componentType === 'button' && (
          <div 
            className="hoverstyle absolute inset-0 opacity-60 transition-opacity duration-400"
            style={{
              background: '#e4fbfbb8',
              borderRadius: `${roundness}px`,
              zIndex: 1
            }}
          >
            <div
              className="rotating-gradient pointer-events-none absolute inset-0"
              style={{
                borderRadius: `${roundness}px`,
                mixBlendMode: 'lighten',
                opacity: 0.7,
                background: `conic-gradient(from 0deg, #e7ffff 0%, ${accentColor} 25%, #fff 50%, ${accentColor} 75%, #e7ffff 100%)`,
                animation: 'rotate-gradient 4s ease-in-out infinite'
              }}
            />
          </div>
        )}

        {/* Accent Tint */}
        {accentColor !== '#D7DADD' && (
          <div
            className="absolute inset-0"
            style={{
              opacity: opacity * 0.5, // Use props opacity
              backgroundColor: accentColor,
              borderRadius: `${roundness}px`,
              zIndex: 2
            }}
          />
        )}

        {/* Main Component */}
        <div
          onClick={onClick}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          className={`glassy-component overflow-hidden ${isDark ? 'dark-glassy-component' : 'light-glassy-component'} ${componentType}-component`}
          style={{
            all: componentType === 'button' ? 'unset' : undefined,
            cursor: ['button', 'card', 'modal', 'panel'].includes(componentType) ? 'pointer' : 'default',
            position: 'relative',
            pointerEvents: 'auto',
            zIndex: 3,
            borderRadius: `${roundness}px`,
            backdropFilter: isHovering 
              ? 'blur(0.01em)' 
              : `blur(${blur}px)`,
            WebkitBackdropFilter: isHovering 
              ? 'blur(0.01em)' 
              : `blur(${blur}px)`,
            transition: 'all var(--anim--hover-time) var(--anim--hover-ease)',
            transform: isHovering ? 'scale(0.98)' : 'scale(1)',
            '--border-width': 'clamp(1px, 0.0625em, 4px)',
            padding: `${paddingY}px ${paddingX}px`,
            // Remove the fontSize override for button
            '--angle-1': `${angle1}deg`,
            '--angle-2': `${angle2}deg`
          } as React.CSSProperties}
        >
          {componentType === 'button' ? (
            <span
              className="relative block select-none"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.05em',
                fontWeight: 500,
                fontSize: '14px', // Fixed font size
                color: 'white',
                textShadow: isDark 
                  ? isHovering 
                    ? '0.025em 0.025em 0.025em rgba(254, 254, 254, 0.12)'
                    : '0em 0.12em 0.05em rgba(254, 254, 254, 0.1)'
                  : isHovering
                    ? '0.025em 0.025em 0.025em rgba(0, 0, 0, 0.12)' 
                    : '0em 0.12em 0.05em rgba(0, 0, 0, 0.1)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transition: 'all var(--anim--hover-time) var(--anim--hover-ease)'
              }}
            >
              {children}
            </span>
          ) : (
            children
          )}
        </div>

        {/* Enhanced Shadow System - for all components */}
        <div 
          className={`component-shadow absolute ${isDark ? 'dark-shadow' : 'light-shadow'}`}
            style={{
              width: 'calc(100% + var(--shadow-cuttoff-fix))',
              height: 'calc(100% + var(--shadow-cuttoff-fix))',
              top: 'calc(0% - var(--shadow-cuttoff-fix) / 2)',
              left: 'calc(0% - var(--shadow-cuttoff-fix) / 2)',
              filter: isHovering ? 'blur(clamp(2px, 0.0625em, 6px))' : 'blur(clamp(2px, 0.125em, 12px))',
              WebkitFilter: isHovering ? 'blur(clamp(2px, 0.0625em, 6px))' : 'blur(clamp(2px, 0.125em, 12px))',
              overflow: 'visible',
              pointerEvents: 'none',
              transition: 'filter var(--anim--hover-time) var(--anim--hover-ease)',
              zIndex: 0
            }}
          />

        {/* Glass Filter Layer */}
        <div
          className="glass-filter absolute inset-0"
          style={{
            zIndex: 0,
            backdropFilter: `blur(4px)`,
            WebkitBackdropFilter: `blur(4px)`,
            filter: `url(#lg-dist) saturate(${saturation}%)`,
            isolation: 'isolate',
            borderRadius: `${roundness}px`
          }}
        />
      </div>

      <style jsx>{`
        @property --angle-1 {
          syntax: '<angle>';
          inherits: false;
          initial-value: -75deg;
        }

        @property --angle-2 {
          syntax: '<angle>';
          inherits: false;
          initial-value: -45deg;
        }

        /* Button Styles */
        .dark-glassy-component {
          -webkit-tap-highlight-color: rgba(254, 254, 254, 0);
          background: linear-gradient(-75deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05));
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.25em 0.125em -0.125em rgba(254, 254, 254, 0.2),
            0 0 0.1em 0.25em inset rgba(0, 0, 0, 0.2),
            0 0 0 0 rgba(0, 0, 0, 1);
          color: white;
        }
        
        .dark-glassy-component *,
        .light-glassy-component * {
          color: inherit !important;
        }

        .light-glassy-component {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          background: linear-gradient(-75deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.2),
            0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2),
            0 0 0 0 rgba(255, 255, 255, 1);
          color: white;
        }
        
        .dark-glassy-component *,
        .light-glassy-component * {
          color: inherit !important;
        }

        .dark-glassy-component:hover {
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.15em 0.05em -0.1em rgba(254, 254, 254, 0.25),
            0 0 0.05em 0.1em inset rgba(0, 0, 0, 0.5),
            0 0 0 0 rgba(0, 0, 0, 1);
        }

        .light-glassy-component:hover {
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.25),
            0 0 0.05em 0.1em inset rgba(255, 255, 255, 0.5),
            0 0 0 0 rgba(255, 255, 255, 1);
        }

        /* Button Border Effects */
        .glassy-component::after {
          content: '';
          position: absolute;
          z-index: 1;
          inset: 0;
          border-radius: var(--roundness);
          width: calc(100% + var(--border-width));
          height: calc(100% + var(--border-width));
          top: calc(0% - var(--border-width) / 2);
          left: calc(0% - var(--border-width) / 2);
          padding: var(--border-width);
          box-sizing: border-box;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          transition: all var(--anim--hover-time) var(--anim--hover-ease), --angle-1 500ms ease;
        }
        
        .dark-glassy-component::after {
          background: conic-gradient(
              from var(--angle-1) at 50% 50%,
              rgba(254, 254, 254, 0.5),
              rgba(254, 254, 254, 0) 5% 40%,
              rgba(254, 254, 254, 0.5) 50%,
              rgba(254, 254, 254, 0) 60% 95%,
              rgba(254, 254, 254, 0.5)
            ),
            linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
        }

        .light-glassy-component::after {
          background: conic-gradient(
              from var(--angle-1) at 50% 50%,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0) 5% 40%,
              rgba(0, 0, 0, 0.5) 50%,
              rgba(0, 0, 0, 0) 60% 95%,
              rgba(0, 0, 0, 0.5)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
        }

        /* Button Text Effects */
        .glassy-component span::after {
          content: '';
          display: block;
          position: absolute;
          z-index: 1;
          width: calc(100% - var(--border-width));
          height: calc(100% - var(--border-width));
          top: calc(0% + var(--border-width) / 2);
          left: calc(0% + var(--border-width) / 2);
          box-sizing: border-box;
          border-radius: var(--roundness);
          overflow: clip;
          z-index: 3;
          mix-blend-mode: screen;
          pointer-events: none;
          background-size: 200% 200%;
          background-position: 0% 50%;
          background-repeat: no-repeat;
          transition:
            background-position calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease),
            --angle-2 calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease);
        }

        .dark-glassy-component span::after {
          background: linear-gradient(
            var(--angle-2),
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.5) 80% 90%,
            rgba(0, 0, 0, 0) 105%
          );
        }

        .light-glassy-component span::after {
          background: linear-gradient(
            var(--angle-2),
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 20% 30%,
            rgba(255, 255, 255, 0) 55%
          );
        }

        .glassy-component:hover span::after {
          background-position: 25% 50%;
        }

        .glassy-component:active span::after {
          background-position: 50% 15%;
        }

        .dark-shadow::after {
          content: '';
          position: absolute;
          z-index: 0;
          inset: 0;
          border-radius: var(--roundness);
          background: linear-gradient(180deg, rgba(254, 254, 254, 0.2), rgba(254, 254, 254, 0.1));
          width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
          height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
          top: calc(var(--shadow-cuttoff-fix) - 0.5em);
          left: calc(var(--shadow-cuttoff-fix) - 0.875em);
          padding: 0.125em;
          box-sizing: border-box;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all var(--anim--hover-time) var(--anim--hover-ease);
          overflow: visible;
          opacity: 1;
        }

        .light-shadow::after {
          content: '';
          position: absolute;
          z-index: 0;
          inset: 0;
          border-radius: var(--roundness);
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
          width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
          height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
          top: calc(var(--shadow-cuttoff-fix) - 0.5em);
          left: calc(var(--shadow-cuttoff-fix) - 0.875em);
          padding: 0.125em;
          box-sizing: border-box;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all var(--anim--hover-time) var(--anim--hover-ease);
          overflow: visible;
          opacity: 1;
        }

        .true-liquid-glass-component:has(.glassy-component:hover) .button-shadow::after {
          top: calc(var(--shadow-cuttoff-fix) - 0.875em);
          opacity: 1;
        }

        .true-liquid-glass-component:has(.glassy-component:active) .button-shadow::after {
          top: calc(var(--shadow-cuttoff-fix) - 0.5em);
          opacity: 0.75;
        }

        /* Active State Shadows */
        .true-liquid-glass-component:has(.dark-glassy-component:active) .glassy-component {
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.125em 0.125em -0.125em rgba(254, 254, 254, 0.2),
            0 0 0.1em 0.25em inset rgba(0, 0, 0, 0.2),
            0 0.225em 0.05em 0 rgba(254, 254, 254, 0.05),
            0 0.25em 0 0 rgba(0, 0, 0, 0.75),
            inset 0 0.25em 0.05em 0 rgba(254, 254, 254, 0.15);
        }

        .true-liquid-glass-component:has(.light-glassy-component:active) .glassy-component {
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.125em 0.125em -0.125em rgba(0, 0, 0, 0.2),
            0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2),
            0 0.225em 0.05em 0 rgba(0, 0, 0, 0.05),
            0 0.25em 0 0 rgba(255, 255, 255, 0.75),
            inset 0 0.25em 0.05em 0 rgba(0, 0, 0, 0.15);
        }

        .true-liquid-glass-component:has(.glassy-component:active) {
          transform: rotate3d(1, 0, 0, 25deg);
        }

        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Touch Device Optimization */
        @media (hover: none) and (pointer: coarse) {
          .true-liquid-glass-component {
            transform: none !important;
          }
          
          .glassy-component span::after,
          .glassy-component:active span::after {
            --angle-2: -45deg;
          }
          
          .glassy-component::after,
          .glassy-component:hover::after,
          .glassy-component:active::after {
            --angle-1: -75deg;
          }
        }
      `}</style>
    </>
  );
}