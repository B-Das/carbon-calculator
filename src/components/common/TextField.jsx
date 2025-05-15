import './TextField.css';

export default function TextField({
  label,
  id,
  type = 'text',
  placeholder = '',
  helpText,
  error,
  icon = null,
  hideLabel = false,
  required = false,
  ...props
}) {
  const ariaInvalid = error ? true : undefined;

  return (
    <div className="mb-4">
      {label && !hideLabel && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}{required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative input-3d-wrapper">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{icon}</span>
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            form-input-3d
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
              : 'border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:ring-gray-400/30'
            }
          `}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          aria-required={required}
          {...props}
        />
      </div>
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center" id={`${id}-error`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
} 