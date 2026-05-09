import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'h-7 px-3 text-sm font-normal transition-colors focus:outline-none';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-500',
    secondary: 'bg-white border border-border-color text-text-primary hover:border-primary',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;