import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  placeholder,
  className = '',
  ...props
}) => {
  const baseStyles = 'h-[26px] px-3 text-sm border border-border-color rounded-none transition-colors focus:outline-none';

  const disabledStyles = disabled
    ? 'bg-page-bg cursor-not-allowed'
    : 'bg-white';

  const placeholderStyles = placeholder ? 'text-text-muted' : '';

  return (
    <input
      type="text"
      className={`${baseStyles} ${disabledStyles} ${placeholderStyles} ${className}`}
      style={{ borderRadius: 0 }}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;