import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    console.log(`Slider ${label} changed to:`, newValue);
    onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono min-w-[3ch] text-right">
          {value}
        </span>
      </div>
      
      <div className="relative py-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 lg:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider touch-manipulation"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.15s ease-in-out;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.15s ease-in-out;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb:active {
          transform: scale(1.2);
        }
        
        @media (max-width: 1024px) {
          .slider::-webkit-slider-thumb {
            height: 28px;
            width: 28px;
          }
          
          .slider::-moz-range-thumb {
            height: 28px;
            width: 28px;
          }
        }
      `}</style>
    </div>
  );
};