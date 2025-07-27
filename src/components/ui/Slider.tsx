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
        <label className="text-sm font-medium text-white/90">
          {label}
        </label>
        <span className="text-sm text-white/70 font-mono min-w-[3ch] text-right px-2 py-1 bg-white/10 rounded-md backdrop-blur-4">
          {value}
        </span>
      </div>
      
      <div className="relative py-3">
        <div className="relative">
          {/* Track background */}
          <div className="absolute inset-0 h-2 bg-white/10 rounded-full backdrop-blur-4"></div>
          
          {/* Progress track */}
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-md transition-all duration-200"
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="liquid-slider w-full h-2 bg-transparent appearance-none cursor-pointer touch-manipulation relative z-10"
        />
      </div>
      
      <style jsx>{`
        .liquid-slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #a855f7);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            0 0 0 0 rgba(96, 165, 250, 0.4);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }
        
        .liquid-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.2),
            0 0 0 4px rgba(96, 165, 250, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .liquid-slider::-webkit-slider-thumb:active {
          transform: scale(1.3);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.25),
            0 0 0 6px rgba(96, 165, 250, 0.3);
        }
        
        .liquid-slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #a855f7);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            0 0 0 0 rgba(96, 165, 250, 0.4);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .liquid-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.2),
            0 0 0 4px rgba(96, 165, 250, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .liquid-slider::-moz-range-thumb:active {
          transform: scale(1.3);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.25),
            0 0 0 6px rgba(96, 165, 250, 0.3);
        }
        
        .liquid-slider::-moz-range-track {
          background: transparent;
          border: none;
        }
        
        @media (max-width: 1024px) {
          .liquid-slider::-webkit-slider-thumb {
            height: 28px;
            width: 28px;
          }
          
          .liquid-slider::-moz-range-thumb {
            height: 28px;
            width: 28px;
          }
        }
        
        /* Focus styles */
        .liquid-slider:focus {
          outline: none;
        }
        
        .liquid-slider:focus::-webkit-slider-thumb {
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.2),
            0 0 0 4px rgba(96, 165, 250, 0.4);
        }
        
        .liquid-slider:focus::-moz-range-thumb {
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.2),
            0 0 0 4px rgba(96, 165, 250, 0.4);
        }
      `}</style>
    </div>
  );
};