export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`
                flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium 
                transition-all duration-300 ease-in-out transform
                ${index < currentStep 
                  ? 'bg-primary text-white shadow-md' 
                  : index === currentStep 
                    ? 'bg-primary text-white scale-110 shadow-lg ring-4 ring-primary/20' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200'}
              `}
            >
              {index < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-20 h-1 transition-all duration-300 ease-in-out
                  ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`
                }
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-3 text-gray-800 font-medium text-lg">
        {steps[currentStep].title}
      </div>
      <div className="text-center text-gray-500 text-sm mt-1">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
} 