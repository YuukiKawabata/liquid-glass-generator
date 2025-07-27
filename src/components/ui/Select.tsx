import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="liquid-glass-input w-full px-4 py-3 lg:py-2.5 text-sm min-h-[44px] lg:min-h-[auto] 
                   text-white/90 placeholder-white/50 appearance-none cursor-pointer 
                   focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20
                   transition-all duration-200 touch-manipulation pr-10"
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-gray-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className="w-5 h-5 text-white/60 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};