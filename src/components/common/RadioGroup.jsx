import { Fragment } from 'react';

export default function RadioGroup({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  helpText,
  className = '',
  orientation = 'vertical' // 'vertical' or 'horizontal'
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className={`space-${orientation === 'vertical' ? 'y' : 'x'}-3`}>
        {options.map((option) => (
          <Fragment key={option.value}>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">
                {option.label}
              </span>
            </label>
            {option.description && (
              <p className="mt-1 mb-2 text-xs text-gray-500 ml-6">
                {option.description}
              </p>
            )}
          </Fragment>
        ))}
      </div>
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}