import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useCalculator } from '../context/CalculatorContext';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '../utils/reportGenerator';
import EmissionsChart from '../components/results/EmissionsChart';
import EmissionsSummary from '../components/results/EmissionsSummary';
import RecommendationList from '../components/results/RecommendationList';
import Tooltip from '../components/common/Tooltip';

export default function ResultsPage() {
  const { results, calculatorData } = useCalculator();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  
  useEffect(() => {
    setSelectedTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle PDF download
  const handleDownloadPDF = () => {
    downloadPDFReport(results, calculatorData.businessInfo);
  };

  // Generate a shareable summary text
  const generateShareableText = () => {
    return `🌱 Our business carbon footprint: ${results.total.toLocaleString()} kg CO₂e/year
    
🔌 Electricity: ${results.electricity.toLocaleString()} kg CO₂e (${getPercentage(results.electricity)}%)
✈️ Business Travel: ${results.travel.toLocaleString()} kg CO₂e (${getPercentage(results.travel)}%)
🚗 Commuting: ${results.commuting.toLocaleString()} kg CO₂e (${getPercentage(results.commuting)}%)

Calculated with CarbonCalC - Measure and reduce your business carbon footprint!`;
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareableText());
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  // Calculate percentages for the pie chart
  const getPercentage = (value) => ((value / results.total) * 100).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Carbon Footprint Results</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your input, we've calculated your business's carbon footprint. 
          Explore the results and discover actionable steps to reduce your emissions.
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setSelectedTab('overview')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'overview' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setSelectedTab('details')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'details' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Detailed Breakdown
        </button>
        <button 
          onClick={() => setSelectedTab('recommendations')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'recommendations' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Recommendations
        </button>
      </div>
      
      {/* Overview Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          <EmissionsSummary results={results} />
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Emissions Breakdown</h3>
              <EmissionsChart results={results} />
            </div>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => setSelectedTab('recommendations')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            >
              View Reduction Recommendations
            </Button>
          </div>
        </div>
      )}
      
      {/* Detailed Breakdown Tab Content */}
      {selectedTab === 'details' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Electricity Emissions</h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Electricity Usage</span>
                <span>{calculatorData.electricity.kwh.toLocaleString()} kWh / year</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Emission Factor</span>
                <Tooltip content="Emission factor is the amount of CO2 emitted per unit of electricity. This varies by region and energy mix.">
                  <span className="flex items-center">
                    0.417 kg CO₂e / kWh
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </Tooltip>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Renewable Energy</span>
                <span>{calculatorData.electricity.renewable}%</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between font-semibold">
                <span>Total Electricity Emissions</span>
                <span>{results.electricity.toLocaleString()} kg CO₂e / year</span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Travel Emissions</h2>
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{Math.round(results.travel * 0.6).toLocaleString()}</div>
                  <div className="text-xs text-gray-500">kg CO₂e</div>
                  <div className="text-sm text-gray-600 mt-1">Car Travel</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{Math.round(results.travel * 0.4).toLocaleString()}</div>
                  <div className="text-xs text-gray-500">kg CO₂e</div>
                  <div className="text-sm text-gray-600 mt-1">Air Travel</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">0</div>
                  <div className="text-xs text-gray-500">kg CO₂e</div>
                  <div className="text-sm text-gray-600 mt-1">Public Transport</div>
                </div>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between font-semibold">
                <span>Total Travel Emissions</span>
                <span>{results.travel.toLocaleString()} kg CO₂e / year</span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Commuting Emissions</h2>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Average Distance</span>
                <span>{calculatorData.commuting.averageMiles} miles / day / employee</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Number of Employees</span>
                <span>{calculatorData.businessInfo.employees}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Working Days</span>
                <Tooltip content="We assume 240 working days per year, accounting for weekends and standard holidays.">
                  <span className="flex items-center">
                    240 days / year
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </Tooltip>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between font-semibold">
                <span>Total Commuting Emissions</span>
                <span>{results.commuting.toLocaleString()} kg CO₂e / year</span>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTab('overview')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Back to Overview
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setSelectedTab('recommendations')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              View Recommendations
            </Button>
          </div>
        </div>
      )}
      
      {/* Recommendations Tab Content */}
      {selectedTab === 'recommendations' && (
        <RecommendationList 
          results={results} 
          onBackToOverview={() => setSelectedTab('overview')} 
        />
      )}
      
      <div className="mt-12 border-t border-gray-200 pt-8 text-center">
        <div className="text-sm text-gray-500">
          <p>This carbon footprint calculation is an estimate based on the information provided.</p>
          <p>For a more accurate assessment, consider engaging with a professional carbon accounting service.</p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownloadPDF}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
          >
            Download Report as PDF
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowShareModal(true)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            }
          >
            Share Results
          </Button>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowShareModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Results</h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-600 whitespace-pre-line">{generateShareableText()}</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                variant="primary" 
                onClick={handleCopyToClipboard}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                }
              >
                {copyStatus === 'copied' ? 'Copied!' : copyStatus === 'error' ? 'Failed to copy' : 'Copy to Clipboard'}
              </Button>
              
              <div className="text-center text-sm text-gray-500 mt-2">
                You can also share this report by downloading the PDF and attaching it to an email or message.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 