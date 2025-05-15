import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StepIndicator from '../components/calculator/StepIndicator';
import BusinessInfoStep from '../components/calculator/BusinessInfoStep';
import ElectricityStep from '../components/calculator/ElectricityStep';
import TravelStep from '../components/calculator/TravelStep';
import CommutingStep from '../components/calculator/CommutingStep';
import TextField from '../components/common/TextField';
import Select from '../components/common/Select';
import { useCalculator } from '../context/CalculatorContext';

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { resetCalculatorData } = useCalculator();

  const steps = [
    { id: 'basics', title: 'Basic Information' },
    { id: 'energy', title: 'Energy Usage' },
    { id: 'travel', title: 'Business Travel' },
    { id: 'commuting', title: 'Employee Commuting' }
  ];

  // For steps with validation, only advance if valid
  const handleNext = () => {
    if (currentStep === 0) {
      document.getElementById('business-info-continue')?.click();
      return;
    }
    if (currentStep === 1) {
      document.getElementById('electricity-continue')?.click();
      return;
    }
    if (currentStep === 2) {
      document.getElementById('travel-continue')?.click();
      return;
    }
    if (currentStep === 3) {
      // For the final step, just validate the form and then show results
      if (typeof window.validateCommutingForm === 'function' && window.validateCommutingForm()) {
        // Form is valid, proceed to results
        navigate('/results');
      }
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Business Carbon Footprint Calculator</h1>
      <p className="text-center text-gray-600 mb-8">Measure and reduce your business's carbon emissions in just a few simple steps</p>

      <StepIndicator steps={steps} currentStep={currentStep} />

      <Card className="mb-6">
        {currentStep === 0 && (
          <BusinessInfoStep
            onValid={() => {
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            continueButtonId="business-info-continue"
          />
        )}

        {currentStep === 1 && (
          <ElectricityStep
            onValid={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            continueButtonId="electricity-continue"
          />
        )}

        {currentStep === 2 && (
          <TravelStep
            onValid={() => {
              setCurrentStep(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            continueButtonId="travel-continue"
          />
        )}

        {currentStep === 3 && (
          <CommutingStep
            onValid={() => {
              // Next phase: show results or summary
              navigate('/results');
            }}
            continueButtonId="commuting-continue"
          />
        )}
        
        {currentStep === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank you for completing the calculator!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We have all the information needed to calculate your carbon footprint. Click below to see your results.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => {
                if (typeof window.validateCommutingForm === 'function') {
                  if (window.validateCommutingForm()) {
                    navigate('/results');
                  }
                } else {
                  navigate('/results');
                }
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            >
              Generate Results
            </Button>
          </div>
        )}
      </Card>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          }
        >
          Previous
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            resetCalculatorData();
            setCurrentStep(0);
          }}
        >
          Reset Calculator
        </Button>
      </div>
    </div>
  );
}
