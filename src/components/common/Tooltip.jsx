import { useState } from 'react';

export default function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-1',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-1',
  };
  
  return (
    <div className="relative inline-block">
      <div 
        className="inline-flex items-center cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className={`
          absolute z-50 w-64 p-3 text-sm bg-gray-800 text-white rounded-md shadow-lg 
          transform scale-100 opacity-100 transition-all duration-150
          ${positionClasses[position]}
        `}>
          <div className="relative">
            {content}
          </div>
        </div>
      )}
    </div>
  );
} 