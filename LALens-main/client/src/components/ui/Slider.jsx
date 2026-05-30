import { useState, useCallback } from "react";
import { cn } from "../../utils/cn";

/**
 * Slider component - native HTML range input with custom styling
 * @param {Object} props - Component props
 * @param {number[]} props.value - Current value array [value]
 * @param {Function} props.onValueChange - Callback with [newValue]
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.step - Step increment
 * @param {string} props.className - Additional classes
 */
function Slider({
  value = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  ...props
}) {
  const currentValue = Array.isArray(value) ? value[0] : value;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleChange = useCallback((e) => {
    const newValue = Number(e.target.value);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  }, [onValueChange]);

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="slider-input w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none"
        style={{
          background: `linear-gradient(to right, var(--purple) 0%, var(--purple) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
        }}
        {...props}
      />
      <style>{`
        .slider-input::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: white;
          border: 3px solid var(--purple);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(109, 93, 251, 0.3);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(109, 93, 251, 0.4);
        }
        .slider-input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border: 3px solid var(--purple);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(109, 93, 251, 0.3);
        }
      `}</style>
    </div>
  );
}

export { Slider };
