import { createContext, useContext, useEffect, useState } from 'react';
import { initialCalculatorData } from '../data/calculatorDefaults';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateTotalEmissions } from '../utils/calculationUtils';

const CalculatorContext = createContext();

export function CalculatorProvider({ children }) {
  // Load calculator data from localStorage or use defaults
  const [calculatorData, setCalculatorData] = useLocalStorage(
    'carbon-calculator-data',
    initialCalculatorData
  );
  
  // State for results of calculations
  const [results, setResults] = useState({
    electricity: 0,
    travel: 0,
    commuting: 0,
    total: 0
  });
  
  // Update results whenever calculator data changes
  useEffect(() => {
    const newResults = calculateTotalEmissions(calculatorData);
    setResults(newResults);
  }, [calculatorData]);
  
  // Function to update a specific section of calculator data
  const updateCalculatorData = (section, data) => {
    setCalculatorData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };
  
  // Function to reset calculator data to defaults
  const resetCalculatorData = () => {
    setCalculatorData(initialCalculatorData);
  };
  
  // Context value
  const contextValue = {
    calculatorData,
    results,
    updateCalculatorData,
    resetCalculatorData
  };
  
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}

// Custom hook to use the calculator context
export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
} 