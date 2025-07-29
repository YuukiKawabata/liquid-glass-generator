'use client';

import { useState, useRef, useEffect } from 'react';
import { LiquidGlassFilters } from './LiquidGlassFilters';

interface TrueLiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'light' | 'dark';
  accentColor?: string;
  roundness?: number;
  paddingX?: number;
  paddingY?: number;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  className?: string;
  disabled?: boolean;
}

export function TrueLiquidGlassButton({
  children,
  onClick,
  variant = 'dark',
  accentColor = '#D7DADD',
  roundness = 60,
  paddingX = 3,
  paddingY = 3,
  fontSize = 3.5,
  fontWeight = 500,
  fontFamily = 'Inter',
  className = '',
  disabled = false
}: TrueLiquidGlassButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(-75);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovering) {
      const interval = setInterval(() => {
        setRotationAngle(prev => prev + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const isDark = variant === 'dark';

  return (
    <>
      <LiquidGlassFilters />
      <div 
        ref={buttonRef}
        className={`true-liquid-glass-button relative overflow-hidden ${className}`}
        style={{
          '--roundness': `${roundness}px`,
          '--anim--hover-time': '400ms',
          '--anim--hover-ease': 'cubic-bezier(0.25, 1, 0.5, 1)',
          borderRadius: `${roundness}px`,
          width: 'fit-content',
          pointerEvents: 'none',
          transition: 'all var(--anim--hover-time) var(--anim--hover-ease)',
          transform: isActive ? 'rotate3d(1, 0, 0, 25deg)' : 'none'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsActive(false);
        }}
      >
        {/* Hover Effect with Rotating Gradient */}
        {isHovering && (
          <div 
            className="absolute inset-0 opacity-60 transition-opacity duration-400"
            style={{
              background: '#e4fbfbb8',
              borderRadius: `${roundness}px`,
              zIndex: 1
            }}
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                borderRadius: `${roundness}px`,
                mixBlendMode: 'lighten',
                opacity: 0.7,
                background: `conic-gradient(from ${rotationAngle}deg, #e7ffff 0%, ${accentColor} 25%, #fff 50%, ${accentColor} 75%, #e7ffff 100%)`,
                animation: 'rotate-gradient 4s ease-in-out infinite'
              }}
            />
          </div>
        )}

        {/* Accent Tint */}
        {accentColor !== '#D7DADD' && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundColor: accentColor,
              borderRadius: `${roundness}px`,
              zIndex: 2
            }}
          />
        )}

        {/* Main Button */}
        <button
          onClick={onClick}
          disabled={disabled}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          className={`glassy-button overflow-hidden ${isDark ? 'dark-glassy-button' : 'light-glassy-button'}`}
          style={{
            all: 'unset',
            cursor: disabled ? 'not-allowed' : 'pointer',
            position: 'relative',
            pointerEvents: 'auto',
            zIndex: 3,
            borderRadius: `${roundness}px`,
            backdropFilter: isHovering ? 'blur(0.01em)' : 'blur(4px)',
            WebkitBackdropFilter: isHovering ? 'blur(0.01em)' : 'blur(4px)',
            transition: 'all var(--anim--hover-time) var(--anim--hover-ease)',
            transform: isHovering ? 'scale(0.975)' : 'scale(1)',
            opacity: disabled ? 0.6 : 1,
            '--border-width': 'clamp(1px, 0.0625em, 4px)'
          }}
        >
          <span
            className="relative block user-select-none transition-all duration-300"
            style={{
              fontFamily,
              letterSpacing: '-0.05em',
              fontWeight,
              fontSize: `${fontSize}rem`,
              paddingInline: `${paddingX}rem`,
              paddingBlock: `${paddingY / 4}rem`,
              color: 'white',
              textShadow: isDark 
                ? '0em 0.12em 0.05em rgba(254, 254, 254, 0.1)' 
                : '0em 0.12em 0.05em rgba(0, 0, 0, 0.1)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            {children}
          </span>
        </button>

        {/* Button Shadow */}
        <div 
          className={`button-shadow absolute ${isDark ? 'dark-shadow' : 'light-shadow'}`}
          style={{
            '--shadow-cuttoff-fix': '2em',
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
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            filter: 'url(#lg-dist-subtle) saturate(120%)',
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

        .dark-glassy-button {
          background: linear-gradient(-75deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05));
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.25em 0.125em -0.125em rgba(254, 254, 254, 0.2),
            0 0 0.1em 0.25em inset rgba(0, 0, 0, 0.2);
        }

        .light-glassy-button {
          background: linear-gradient(-75deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.2),
            0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2);
        }

        .dark-glassy-button:hover {
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.15em 0.05em -0.1em rgba(254, 254, 254, 0.25),
            0 0 0.05em 0.1em inset rgba(0, 0, 0, 0.5);
        }

        .light-glassy-button:hover {
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.25),
            0 0 0.05em 0.1em inset rgba(255, 255, 255, 0.5);
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

        .true-liquid-glass-button:has(.glassy-button:hover) .button-shadow::after {
          top: calc(var(--shadow-cuttoff-fix) - 0.875em);
          opacity: 1;
        }

        .true-liquid-glass-button:has(.glassy-button:active) .button-shadow::after {
          top: calc(var(--shadow-cuttoff-fix) - 0.5em);
          opacity: 0.75;
        }

        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (hover: none) and (pointer: coarse) {
          .true-liquid-glass-button {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}