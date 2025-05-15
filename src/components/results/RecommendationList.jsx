import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

/**
 * RecommendationList - Component to display recommendations based on the emissions results
 * @param {Object} props
 * @param {Object} props.results - The emissions results object
 * @param {Function} props.onBackToOverview - Function to handle navigation back to overview
 */
export default function RecommendationList({ results, onBackToOverview }) {
  // Recommendations based on the results
  const recommendations = [
    {
      category: 'electricity',
      title: 'Switch to LED lighting',
      description: 'Replace conventional lighting with LED alternatives to reduce electricity consumption by up to 80%.',
      impact: 'high',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      category: 'travel',
      title: 'Implement virtual meetings',
      description: 'Replace non-essential business travel with video conferencing to reduce travel emissions.',
      impact: 'medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      category: 'commuting',
      title: 'Encourage carpooling',
      description: 'Implement a carpool program to reduce the number of single-occupancy vehicles commuting to work.',
      impact: 'medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      category: 'electricity',
      title: 'Install smart thermostats',
      description: 'Smart thermostats can optimize energy usage for heating and cooling, reducing wasted energy.',
      impact: 'medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    }
  ];

  // Prioritize recommendations based on emissions breakdown
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const categoryToValue = {
      'electricity': results.electricity,
      'travel': results.travel,
      'commuting': results.commuting
    };
    
    const aValue = categoryToValue[a.category] || 0;
    const bValue = categoryToValue[b.category] || 0;
    
    return bValue - aValue;
  });

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recommended Actions to Reduce Your Carbon Footprint</h2>
        
        <div className="space-y-6">
          {sortedRecommendations.map((rec, index) => (
            <div key={index} className="flex border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${
                rec.impact === 'high' 
                  ? 'bg-green-100 text-green-600' 
                  : rec.impact === 'medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600'
              }`}>
                {rec.icon}
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-1">
                  <h3 className="font-medium text-gray-900">{rec.title}</h3>
                  <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                    rec.impact === 'high' 
                      ? 'bg-green-100 text-green-800' 
                      : rec.impact === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rec.impact === 'high' ? 'High Impact' : rec.impact === 'medium' ? 'Medium Impact' : 'Low Impact'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="text-center mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Want to get more specific recommendations?</h3>
        <p className="text-gray-600 mb-4">Complete our detailed assessment for tailored advice.</p>
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={onBackToOverview}
          >
            Back to Overview
          </Button>
          <Link to="/calculator">
            <Button variant="primary">
              Update Your Data
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 