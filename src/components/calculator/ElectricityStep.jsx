import { useState } from 'react';
import TextField from '../common/TextField';
import { useCalculator } from '../../context/CalculatorContext';
import { validateElectricity } from '../../utils/validationUtils.js';
import Tooltip from '../common/Tooltip';

export default function ElectricityStep({ onValid }) {
  const { calculatorData, updateCalculatorData } = useCalculator();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = name === 'renewable'
      ? Math.min(100, Math.max(0, parseInt(value) || 0))
      : parseInt(value) || 0;
    updateCalculatorData('electricity', { [name]: numValue });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateAndContinue = () => {
    const validation = validateElectricity(calculatorData.electricity);
    setErrors(validation);
    if (Object.keys(validation).length === 0 && onValid) {
      onValid();
    }
  };

  return (
    <div className="space-y-6 border border-gray-300 rounded-md shadow-md p-4">
      <div>
        <div className="flex items-center mb-2">
          <label htmlFor="kwh" className="block text-sm font-medium text-gray-700">
            Annual Electricity Usage (kWh)
          </label>
          <Tooltip content={
            <div>
              <p>This is the total electricity consumption for your business over a year.</p>
              <p className="mt-2">You can find this information on your electricity bills or by contacting your utility provider.</p>
              <p className="mt-2">Typical small office (10 employees): 20,000-30,000 kWh/year</p>
              <p>Medium office (50 employees): 90,000-110,000 kWh/year</p>
            </div>
          }>
            <span className="ml-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </Tooltip>
        </div>
        <TextField
          id="kwh"
          name="kwh"
          type="number"
          min="0"
          value={calculatorData.electricity.kwh}
          onChange={handleChange}
          helpText="Total annual electricity consumption in kWh"
          error={errors.kwh}
          hideLabel
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <label htmlFor="renewable" className="block text-sm font-medium text-gray-700">
            Renewable Energy Percentage
          </label>
          <Tooltip content={
            <div>
              <p>The percentage of your electricity that comes from renewable sources like solar, wind, or hydroelectric power.</p>
              <p className="mt-2">This may be specified on your utility bill, or you can contact your provider for this information.</p>
              <p className="mt-2">A higher percentage of renewable energy reduces your carbon footprint.</p>
              <p className="mt-2 font-medium text-gray-700">* These are general estimates - actual usage may vary</p>
            </div>
          }>
            <span className="ml-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </Tooltip>
        </div>
        <TextField
          id="renewable"
          name="renewable"
          type="number"
          min="0"
          max="100"
          value={calculatorData.electricity.renewable}
          onChange={handleChange}
          helpText="Percentage of your electricity from renewable sources (0-100%)"
          error={errors.renewable}
          hideLabel
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Electricity Usage Tips</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Not sure about your electricity consumption? Try one of these methods:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Check your electricity bills for the last 12 months</li>
                <li>Contact your utility provider for a yearly summary</li>
                <li>Use the national average of 6,000 kWh/year per employee for a rough estimate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <button
        type="button"
        className="w-full bg-primary text-white px-4 py-3 rounded font-semibold text-base sm:text-sm"
        onClick={validateAndContinue}
        id="electricity-continue"
      >
        Continue
      </button>
    </div>
  );
}
