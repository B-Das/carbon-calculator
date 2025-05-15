import { useState } from 'react';
import TextField from '../common/TextField';
import { useCalculator } from '../../context/CalculatorContext';
import { validateCommuting } from '../../utils/validationUtils.js';

export default function CommutingStep({ onValid }) {
  const { calculatorData, updateCalculatorData } = useCalculator();
  const [errors, setErrors] = useState({});

  const handleMileChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    updateCalculatorData('commuting', { averageMiles: value });
    setErrors((prev) => ({ ...prev, averageMiles: undefined }));
  };

  const handleModeChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    updateCalculatorData('commuting', {
      modePercentages: {
        ...calculatorData.commuting.modePercentages,
        [name]: numValue
      }
    });
    setErrors((prev) => ({ ...prev, [`mode.${name}`]: undefined }));
  };

  const validateForm = () => {
    const validation = validateCommuting(calculatorData.commuting);
    setErrors(validation);
    if (Object.keys(validation).length === 0 && onValid) {
      onValid();
    }
    return Object.keys(validation).length === 0;
  };

  // Expose validation function for parent component
  if (typeof window !== 'undefined') {
    window.validateCommutingForm = validateForm;
  }

  const modePercentages = calculatorData.commuting.modePercentages || {};
  const totalPercentage = Object.values(modePercentages).reduce((sum, v) => sum + v, 0);
  const isInvalidTotal = totalPercentage !== 100 && totalPercentage !== 0;

  return (
    <div className="space-y-6 border border-gray-300 rounded-md shadow-md p-4">
      <div>
        <TextField
          label="Average One-Way Commute Distance"
          id="averageMiles"
          name="averageMiles"
          type="number"
          min="0"
          value={calculatorData.commuting.averageMiles || ''}
          onChange={handleMileChange}
          helpText="Average one-way distance in miles that employees travel to work"
          error={errors.averageMiles}
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <div className="font-semibold text-gray-700 mb-4">Commuting Methods (%)</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['car', 'carpool', 'publicTransport', 'walking', 'cycling', 'workFromHome'].map((mode) => (
            <TextField
              key={mode}
              label={mode.charAt(0).toUpperCase() + mode.slice(1).replace(/([A-Z])/g, ' $1')}
              id={mode}
              name={mode}
              type="number"
              min="0"
              max="100"
              value={modePercentages[mode] || ''}
              onChange={handleModeChange}
              helpText={`Percentage of employees using ${mode.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              error={errors[`mode.${mode}`]}
              className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ))}
        </div>
        <div className={`mt-4 font-medium text-sm sm:text-base ${isInvalidTotal ? 'text-red-600' : 'text-gray-700'}`}>
          Total: {totalPercentage}%
          {isInvalidTotal && totalPercentage > 0 && (
            <span className="block text-xs sm:text-sm font-normal mt-1">
              The total should equal 100%. Please adjust your percentages.
            </span>
          )}
        </div>
      </div>
      
      {/* Continue button removed as it's redundant with the "Generate Results" button */}
      <div id="commuting-continue" className="hidden"></div>
    </div>
  );
}
