export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  type = 'button', 
  disabled = false,
  className = '',
  icon = null,
  ...props 
}) {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus:ring-primary/50 shadow-sm hover:shadow',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-200 focus:ring-gray-500/30 border border-gray-200',
    success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-700 focus:ring-green-500/50 shadow-sm hover:shadow',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-700 focus:ring-red-500/50 shadow-sm hover:shadow',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500/30'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
} 