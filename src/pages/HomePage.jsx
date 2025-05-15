import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 drop-shadow-sm">
          Business Carbon Footprint Calculator
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-10">
          A simple, free carbon calculator to help businesses measure, understand, and reduce their environmental impact.
        </p>
        <Link 
          to="/calculator" 
          className="inline-block w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Calculate Your Carbon Footprint
        </Link>
      </div>

      <div className="relative my-10 sm:my-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50 via-white to-gray-100 rounded-2xl shadow-inner" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4">
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 flex flex-col items-center">
            <div className="mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 stroke-primary" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1 text-center">Quick & Easy Carbon Calculator</h3>
            <p className="text-gray-600 text-center text-sm leading-snug">Calculate your business carbon footprint in less than 5 minutes with our simple step-by-step calculator.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 flex flex-col items-center">
            <div className="mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 stroke-primary" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1 text-center">Visualize Carbon Emissions</h3>
            <p className="text-gray-600 text-center text-sm leading-snug">See where your carbon emissions come from with clear charts and graphs that make your footprint data easy to understand.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 flex flex-col items-center">
            <div className="mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 stroke-primary" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1 text-center">Track Carbon Reduction</h3>
            <p className="text-gray-600 text-center text-sm leading-snug">Save your carbon footprint results and monitor your emission reductions over time as you implement greener practices.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
