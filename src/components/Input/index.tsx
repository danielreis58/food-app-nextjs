import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  id: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, fullWidth = true, ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`${widthClass} ${className || ''}`}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`input-field ${error ? 'focus:ring-[var(--color-error)]' : ''}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
