import Card from '../common/Card';

/**
 * EmissionsSummary - Component to display a summary of the emissions results
 * @param {Object} props
 * @param {Object} props.results - The emissions results object
 */
export default function EmissionsSummary({ results }) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Annual Carbon Footprint</h2>
          <div className="text-5xl font-bold text-primary mb-2">{results.total.toLocaleString()}</div>
          <div className="text-gray-500">kg CO₂e per year</div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center py-4">
          <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Electricity</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">{results.electricity.toLocaleString()}</div>
          <div className="text-sm text-gray-500">kg CO₂e / year</div>
        </Card>
        
        <Card className="text-center py-4">
          <div className="w-10 h-10 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Business Travel</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">{results.travel.toLocaleString()}</div>
          <div className="text-sm text-gray-500">kg CO₂e / year</div>
        </Card>
        
        <Card className="text-center py-4">
          <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Commuting</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">{results.commuting.toLocaleString()}</div>
          <div className="text-sm text-gray-500">kg CO₂e / year</div>
        </Card>
      </div>
    </div>
  );
} 