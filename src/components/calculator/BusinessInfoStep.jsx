import { useState } from 'react';
import TextField from '../common/TextField';
import Select from '../common/Select';
import { useCalculator } from '../../context/CalculatorContext';
import { validateBusinessInfo } from '../../utils/validationUtils.js';

const industryOptions = [
  { value: '', label: 'Select industry', disabled: true },
  { value: 'retail', label: 'Retail' },
  { value: 'office', label: 'Office / Professional Services' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology / IT' },
  { value: 'other', label: 'Other' },
];

const regionOptions = [
  { value: '', label: 'Select region', disabled: true },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
];

const usStateOptions = [
  { value: '', label: 'Select state', disabled: true },
  { value: 'california', label: 'California' },
  { value: 'texas', label: 'Texas' },
  { value: 'newyork', label: 'New York' },
  { value: 'florida', label: 'Florida' },
];

export default function BusinessInfoStep({ onValid }) {
  const { calculatorData, updateCalculatorData } = useCalculator();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCalculatorData('businessInfo', { [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleEmployeeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    updateCalculatorData('businessInfo', { employees: value });
    setErrors((prev) => ({ ...prev, employees: undefined }));
  };

  const validateAndContinue = () => {
    const validation = validateBusinessInfo(calculatorData.businessInfo);
    setErrors(validation);
    if (Object.keys(validation).length === 0 && onValid) {
      onValid();
    }
  };

  return (
    <div className="space-y-6 border border-gray-300 rounded-md shadow-md p-4">
      <div>
        <TextField
          label="Business Name"
          id="name"
          name="name"
          value={calculatorData.businessInfo.name}
          onChange={handleChange}
          placeholder="Enter your business name"
          error={errors.name}
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <Select
          label="Industry"
          id="industry"
          name="industry"
          value={calculatorData.businessInfo.industry}
          onChange={handleChange}
          options={industryOptions}
          error={errors.industry}
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <TextField
          label="Number of Employees"
          id="employees"
          name="employees"
          type="number"
          min="1"
          value={calculatorData.businessInfo.employees}
          onChange={handleEmployeeChange}
          helpText="Full-time equivalent employees"
          error={errors.employees}
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <Select
          label="Region"
          id="region"
          name="region"
          value={calculatorData.businessInfo.region}
          onChange={handleChange}
          options={regionOptions}
          error={errors.region}
          className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      {calculatorData.businessInfo.region === 'usa' && (
        <div>
          <Select
            label="State"
            id="state"
            name="state"
            value={calculatorData.businessInfo.state}
            onChange={handleChange}
            options={usStateOptions}
            error={errors.state}
            className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      )}
      
      <button
        type="button"
        className="w-full bg-primary text-white px-4 py-3 rounded font-semibold text-base sm:text-sm"
        onClick={validateAndContinue}
        id="business-info-continue"
      >
        Continue
      </button>
    </div>
  );
}