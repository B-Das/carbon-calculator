import { useState } from 'react';
import TextField from '../common/TextField';
import Select from '../common/Select';
import { useCalculator } from '../../context/CalculatorContext';
import { validateTravel } from '../../utils/validationUtils.js';

const transportOptions = [
  { value: '', label: 'Select transportation type', disabled: true },
  { value: 'small', label: 'Car/Van (Small)' },
  { value: 'medium', label: 'Car/Van (Medium)' },
  { value: 'large', label: 'Car/Van (Large)' },
  { value: 'electric', label: 'Electric Vehicle' },
  { value: 'hybrid', label: 'Hybrid Vehicle' },
  { value: 'public', label: 'Public Transport' },
  { value: 'air', label: 'Air Travel' }
];

export default function TravelStep({ onValid }) {
  const { calculatorData, updateCalculatorData } = useCalculator();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let update = {};

    if (name === 'businessMiles') {
      update = {
        car: {
          ...calculatorData.travel.car,
          distance: parseInt(value) || 0,
        }
      };
    } else if (name === 'freightMiles') {
      update = {
        publicTransport: {
          ...calculatorData.travel.publicTransport,
          bus: parseInt(value) || 0,
        }
      };
    } else if (name === 'transportType') {
      update = {
        car: {
          ...calculatorData.travel.car,
          type: value,
        }
      };
    }

    updateCalculatorData('travel', update);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateAndContinue = () => {
    const validation = validateTravel(calculatorData.travel);
    setErrors(validation);
    if (Object.keys(validation).length === 0 && onValid) {
      onValid();
    }
  };

  return (
    <div className="space-y-6 border border-gray-300 rounded-md shadow-md p-4">
      <div className="grid grid-cols-1 gap-8">
        <div>
          <TextField
            label="Annual Business Miles Traveled"
            id="businessMiles"
            name="businessMiles"
            type="number"
            min="0"
            value={calculatorData.travel.car?.distance || ''}
            onChange={handleChange}
            error={errors['businessMiles']}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Select
            label="Primary Transportation Type"
            id="transportType"
            name="transportType"
            value={calculatorData.travel.car?.type || 'medium'}
            onChange={handleChange}
            options={transportOptions}
            error={errors['transportType']}
            className="w-full sm:p-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-describedby={errors['transportType'] ? "transport-error" : undefined}
          />
        </div>
        
        <div>
          <TextField
            label="Annual Shipping/Freight Miles"
            id="freightMiles"
            name="freightMiles"
            type="number"
            min="0"
            value={calculatorData.travel.publicTransport?.bus || ''}
            onChange={handleChange}
            error={errors['freightMiles']}
            className="w-full"
            required
          />
        </div>
      </div>
      
      <button
        type="button"
        className="w-full bg-primary text-white px-4 py-3 rounded font-semibold text-base sm:text-sm"
        onClick={validateAndContinue}
        id="travel-continue"
      >
        Continue
      </button>
    </div>
  );
}
