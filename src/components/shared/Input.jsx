import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Professional Input Component with validation and states
 */
export function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  success,
  required,
  placeholder,
  disabled,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  const borderColor = error 
    ? 'border-danger-500 focus:border-danger-600 focus:ring-danger-500'
    : success
    ? 'border-success-500 focus:border-success-600 focus:ring-success-500'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label 
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            isFocused || hasValue
              ? '-top-2 text-xs bg-white px-1 text-primary-600'
              : 'top-2.5 text-gray-500'
          }`}
        >
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        placeholder={isFocused ? placeholder : ''}
        className={`
          w-full px-3 py-2.5 rounded-lg border-2 
          ${borderColor}
          outline-none transition-all duration-200
          disabled:bg-gray-100 disabled:cursor-not-allowed
          pr-10
        `}
        {...props}
      />
      
      {/* Icon indicators */}
      {error && (
        <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-danger-500" />
      )}
      {success && (
        <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-success-500" />
      )}
      
      {/* Error/Success message */}
      {error && (
        <p className="mt-1 text-xs text-danger-600 animate-slide-down">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-1 text-xs text-success-600 animate-slide-down">
          {success}
        </p>
      )}
    </div>
  );
}

