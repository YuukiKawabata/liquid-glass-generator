import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
}) => {
  const baseStyles = `
    relative font-medium rounded-xl transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50
    disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation 
    backdrop-filter backdrop-blur-12 overflow-hidden group
    min-h-[44px] lg:min-h-[auto]
  `;
  
  const variantStyles = {
    primary: `
      liquid-glass-button text-white shadow-lg
      hover:shadow-xl hover:scale-105 active:scale-95
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-blue-400/20 before:to-purple-500/20 
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-100
    `,
    secondary: `
      bg-white/10 backdrop-blur-8 text-white/90 border border-white/20
      hover:bg-white/20 hover:shadow-lg hover:scale-105 active:scale-95
      shadow-md
    `,
    ghost: `
      bg-transparent text-white/80 border border-white/10
      hover:bg-white/10 hover:text-white active:scale-95
      backdrop-blur-4
    `,
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-sm lg:py-2',
    md: 'px-6 py-3 text-sm lg:py-2.5',
    lg: 'px-8 py-4 text-base',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform group-hover:top-full transition-transform duration-1000 ease-out" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm lg:text-base">Loading...</span>
          </div>
        ) : (
          children
        )}
      </div>
    </button>
  );
};