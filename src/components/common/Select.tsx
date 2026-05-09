import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '请选择',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverValue, setHoverValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const baseStyles = 'h-[26px] px-3 text-sm border border-border-color rounded-none transition-colors focus:outline-none relative';
  const disabledStyles = disabled ? 'bg-page-bg cursor-not-allowed' : 'bg-white cursor-pointer';
  const openStyles = isOpen ? 'border-primary' : '';

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div
        className={`${baseStyles} ${disabledStyles} ${openStyles}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-text-primary' : 'text-text-muted'}>
            {selectedOption?.label || placeholder}
          </span>
          <span className="ml-2 text-text-muted">▾</span>
        </div>
      </div>

      {isOpen && !disabled && (
        <div
          className="absolute top-full left-0 z-50 mt-1 bg-white border border-border-color shadow-md min-w-full"
          style={{ borderRadius: 0 }}
        >
          {options.map(option => (
            <div
              key={option.value}
              className={`h-[26px] px-3 flex items-center text-sm cursor-pointer ${
                hoverValue === option.value ? 'bg-primary text-white' : 'text-text-primary hover:bg-page-bg'
              }`}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHoverValue(option.value)}
              onMouseLeave={() => setHoverValue(null)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;