'use client';

import { useState, useRef, useEffect } from 'react';
import { LiquidGlassFilters } from './LiquidGlassFilters';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  accentColor?: string;
  intensity?: 'subtle' | 'normal' | 'intense';
  theme?: 'light' | 'dark' | 'auto';
}

export function LiquidGlassButton({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  accentColor = '#D7DADD',
  intensity = 'normal',
  theme = 'auto'
}: LiquidGlassButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rotationAngle, setRotationAngle] = useState(-75);

  useEffect(() => {
    if (isHovering) {
      const interval = setInterval(() => {
        setRotationAngle(prev => (prev + 2) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const filterMap = {
    subtle: 'none', // Removed filter for better readability
    normal: 'none', // Removed filter for better readability
    intense: 'url(#liquid-glass-subtle)' // Only use very subtle filter
  };

  const isDark = theme === 'dark' || (theme === 'auto' && window?.matchMedia?.('(prefers-color-scheme: dark)').matches);

  return (
    <>
      <LiquidGlassFilters />
      <div className="liquid-glass-button-wrapper relative overflow-hidden rounded-xl w-fit">
        {/* Hover Effect Layer */}
        {isHovering && (
          <div 
            className="absolute inset-0 opacity-60 rounded-xl transition-opacity duration-400 ease-out"
            style={{
              background: '#e4fbfbb8',
              zIndex: 1
            }}
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(from ${rotationAngle}deg, #e7ffff 0%, ${accentColor} 25%, #fff 50%, ${accentColor} 75%, #e7ffff 100%)`,
                mixBlendMode: 'lighten',
                opacity: 0.7,
                animation: isHovering ? 'rotate-gradient 4s ease-in-out infinite' : 'none'
              }}
            />
          </div>
        )}

        {/* Accent Tint Layer */}
        {accentColor !== '#D7DADD' && (
          <div
            className="absolute inset-0 opacity-30 rounded-xl"
            style={{
              backgroundColor: accentColor,
              zIndex: 2
            }}
          />
        )}

        {/* Main Button */}
        <button
          ref={buttonRef}
          onClick={onClick}
          disabled={disabled}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          className={`
            liquid-glass-button-core relative overflow-hidden cursor-pointer transition-all duration-300
            ${sizeClasses[size]}
            ${isDark ? 'liquid-dark-button' : 'liquid-light-button'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          style={{
            zIndex: 3,
            filter: filterMap[intensity],
            borderRadius: 'var(--liquid-roundness, 12px)',
            transform: isHovering ? 'scale(0.975)' : 'scale(1)',
            backdropFilter: isHovering ? 'blur(0.5px)' : 'blur(4px)',
            WebkitBackdropFilter: isHovering ? 'blur(0.5px)' : 'blur(4px)'
          }}
        >
          <span className="relative z-10 font-medium transition-all duration-300">
            {children}
          </span>

          {/* Shimmer Effect */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'url(#shimmer-gradient)',
              backgroundSize: '200% 100%',
              animation: isHovering ? 'shimmer 2s infinite' : 'none'
            }}
          />

          {/* Interactive Light Effect */}
          <div
            className="absolute pointer-events-none transition-opacity duration-200"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              opacity: isHovering ? 1 : 0,
              zIndex: 5
            }}
          />
        </button>

        {/* Shadow Layer */}
        <div 
          className={`liquid-glass-shadow absolute transition-all duration-300 ${isDark ? 'liquid-dark-shadow' : 'liquid-light-shadow'}`}
          style={{
            width: 'calc(100% + 2em)',
            height: 'calc(100% + 2em)',
            top: 'calc(-1em)',
            left: 'calc(-1em)',
            filter: isHovering ? 'blur(6px)' : 'blur(12px)',
            WebkitFilter: isHovering ? 'blur(6px)' : 'blur(12px)',
            zIndex: 0
          }}
        />

        {/* Glass Filter Layer */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backdropFilter: 'blur(4px) saturate(150%)',
            WebkitBackdropFilter: 'blur(4px) saturate(150%)',
            filter: filterMap[intensity],
            isolation: 'isolate',
            zIndex: 1
          }}
        />
      </div>

      <style jsx>{`
        @property --liquid-angle-1 {
          syntax: '<angle>';
          inherits: false;
          initial-value: -75deg;
        }

        @property --liquid-angle-2 {
          syntax: '<angle>';
          inherits: false;
          initial-value: -45deg;
        }

        @property --liquid-roundness {
          syntax: '<length>';
          inherits: false;
          initial-value: 12px;
        }

        .liquid-glass-button-wrapper {
          --liquid-hover-time: 400ms;
          --liquid-hover-ease: cubic-bezier(0.25, 1, 0.5, 1);
          --liquid-border-width: clamp(1px, 0.0625em, 4px);
        }

        .liquid-glass-button-core {
          position: relative;
          border: var(--liquid-border-width) solid transparent;
          background-clip: padding-box;
        }

        .liquid-light-button {
          background: linear-gradient(-75deg, 
            rgba(255, 255, 255, 0.05), 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0.05)
          );
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.2),
            0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2);
          color: white;
          text-shadow: 0em 0.12em 0.05em rgba(0, 0, 0, 0.1);
        }

        .liquid-dark-button {
          background: linear-gradient(-75deg, 
            rgba(0, 0, 0, 0.05), 
            rgba(0, 0, 0, 0.2), 
            rgba(0, 0, 0, 0.05)
          );
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.25em 0.125em -0.125em rgba(254, 254, 254, 0.2),
            0 0 0.1em 0.25em inset rgba(0, 0, 0, 0.2);
          color: white;
          text-shadow: 0em 0.12em 0.05em rgba(254, 254, 254, 0.1);
        }

        .liquid-light-button:hover {
          box-shadow:
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.25),
            0 0 0.05em 0.1em inset rgba(255, 255, 255, 0.5);
          text-shadow: 0.025em 0.025em 0.025em rgba(0, 0, 0, 0.12);
        }

        .liquid-dark-button:hover {
          box-shadow:
            inset 0 0.125em 0.125em rgba(254, 254, 254, 0.05),
            inset 0 -0.125em 0.125em rgba(0, 0, 0, 0.5),
            0 0.15em 0.05em -0.1em rgba(254, 254, 254, 0.25),
            0 0 0.05em 0.1em inset rgba(0, 0, 0, 0.5);
          text-shadow: 0.025em 0.025em 0.025em rgba(254, 254, 254, 0.12);
        }

        .liquid-light-shadow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--liquid-roundness);
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
          width: calc(100% - 2em - 0.25em);
          height: calc(100% - 2em - 0.25em);
          top: calc(2em - 0.5em);
          left: calc(2em - 0.875em);
          padding: 0.125em;
          box-sizing: border-box;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all var(--liquid-hover-time) var(--liquid-hover-ease);
        }

        .liquid-dark-shadow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--liquid-roundness);
          background: linear-gradient(180deg, rgba(254, 254, 254, 0.2), rgba(254, 254, 254, 0.1));
          width: calc(100% - 2em - 0.25em);
          height: calc(100% - 2em - 0.25em);
          top: calc(2em - 0.5em);
          left: calc(2em - 0.875em);
          padding: 0.125em;
          box-sizing: border-box;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all var(--liquid-hover-time) var(--liquid-hover-ease);
        }

        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .liquid-glass-button-wrapper:hover {
          transform: rotate3d(1, 0, 0, 25deg);
        }

        .liquid-glass-button-wrapper:active {
          transform: rotate3d(1, 0, 0, 5deg) scale(0.98);
        }

        @media (hover: none) and (pointer: coarse) {
          .liquid-glass-button-wrapper:hover,
          .liquid-glass-button-wrapper:active {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}