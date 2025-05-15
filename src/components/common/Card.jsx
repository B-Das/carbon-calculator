export default function Card({ 
  children, 
  title, 
  className = '',
  hoverEffect = false
}) {
  return (
    <div className={`
      bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden
      ${hoverEffect ? 'transition-all duration-200 hover:shadow-md hover:border-gray-200' : ''}
      ${className}
    `}>
      {title && (
        <div className="border-b px-4 py-3 bg-gray-50">
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
} 