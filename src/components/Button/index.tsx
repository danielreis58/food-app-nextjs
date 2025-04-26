import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${widthClass} ${className || ''}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span>Carregando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;