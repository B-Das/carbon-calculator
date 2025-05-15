import { electricityFactors, transportationFactors, commutingFactors } from '../data/emissionFactors';

/**
 * Calculate emissions from electricity usage
 * @param {number} kwh - Kilowatt hours consumed
 * @param {string} region - Country code (e.g., 'usa')
 * @param {string} state - State/province code (optional)
 * @param {number} renewablePercentage - Percentage of renewable energy (0-100)
 * @returns {number} - CO2e in kg
 */
export function calculateElectricityEmissions(kwh, region, state, renewablePercentage = 0) {
  if (!kwh || kwh <= 0) return 0;
  
  let emissionFactor;
  
  // Get the appropriate emission factor based on region and state
  if (region === 'usa' && state && electricityFactors.usa.byState[state]) {
    emissionFactor = electricityFactors.usa.byState[state];
  } else if (electricityFactors[region]) {
    emissionFactor = typeof electricityFactors[region] === 'object' 
      ? electricityFactors[region].average 
      : electricityFactors[region];
  } else {
    // Default to US average if region not found
    emissionFactor = electricityFactors.usa.average;
  }
  
  // Apply renewable percentage reduction
  const effectiveEmissionFactor = emissionFactor * (1 - (renewablePercentage / 100));
  
  return kwh * effectiveEmissionFactor;
}

/**
 * Calculate emissions from business travel
 * @param {Object} travelData - Object containing travel distances by type
 * @returns {number} - CO2e in kg
 */
export function calculateTravelEmissions(travelData) {
  let totalEmissions = 0;
  
  // Car travel emissions
  if (travelData.car && travelData.car.distance > 0) {
    const { distance, type } = travelData.car;
    const emissionFactor = transportationFactors.car[type] || transportationFactors.car.medium;
    totalEmissions += distance * emissionFactor;
  }
  
  // Air travel emissions
  if (travelData.air) {
    const { domestic, shortHaul, longHaul } = travelData.air;
    
    if (domestic > 0) {
      totalEmissions += domestic * transportationFactors.air.domestic;
    }
    
    if (shortHaul > 0) {
      totalEmissions += shortHaul * transportationFactors.air.shortHaul;
    }
    
    if (longHaul > 0) {
      totalEmissions += longHaul * transportationFactors.air.longHaul;
    }
  }
  
  // Public transport emissions
  if (travelData.publicTransport) {
    const { bus, train, subway } = travelData.publicTransport;
    
    if (bus > 0) {
      totalEmissions += bus * transportationFactors.publicTransport.bus;
    }
    
    if (train > 0) {
      totalEmissions += train * transportationFactors.publicTransport.train;
    }
    
    if (subway > 0) {
      totalEmissions += subway * transportationFactors.publicTransport.subway;
    }
  }
  
  return totalEmissions;
}

/**
 * Calculate emissions from employee commuting
 * @param {Object} commutingData - Object containing commuting data
 * @param {number} employeeCount - Number of employees
 * @returns {number} - CO2e in kg
 */
export function calculateCommutingEmissions(commutingData, employeeCount) {
  if (!commutingData || !employeeCount || employeeCount <= 0) return 0;
  
  const { averageMiles, modePercentages } = commutingData;
  if (!averageMiles || averageMiles <= 0) return 0;
  
  // Calculate working days per year (assuming 48 working weeks)
  const workingDaysPerYear = 48 * 5;
  
  // Calculate total annual commuting distance
  const totalAnnualMiles = averageMiles * 2 * workingDaysPerYear * employeeCount;
  
  // Calculate emissions based on mode percentages
  let totalEmissions = 0;
  
  // Car emissions (single occupancy)
  if (modePercentages.car > 0) {
    const carMiles = totalAnnualMiles * (modePercentages.car / 100);
    totalEmissions += carMiles * commutingFactors.car;
  }
  
  // Carpool emissions (assuming average of 3 people per car)
  if (modePercentages.carpool > 0) {
    const carpoolMiles = totalAnnualMiles * (modePercentages.carpool / 100);
    totalEmissions += carpoolMiles * commutingFactors.carpool;
  }
  
  // Public transport emissions
  if (modePercentages.publicTransport > 0) {
    const publicTransportMiles = totalAnnualMiles * (modePercentages.publicTransport / 100);
    totalEmissions += publicTransportMiles * commutingFactors.publicTransport;
  }
  
  // Walking and cycling have zero emissions
  
  // Work from home emissions
  if (modePercentages.workFromHome > 0) {
    const wfhPercentage = modePercentages.workFromHome / 100;
    totalEmissions += employeeCount * wfhPercentage * commutingFactors.workFromHome * workingDaysPerYear;
  }
  
  return totalEmissions;
}

/**
 * Calculate total carbon footprint
 * @param {Object} calculatorData - Complete calculator data object
 * @returns {Object} - Emissions breakdown by category and total
 */
export function calculateTotalEmissions(calculatorData) {
  const { businessInfo, electricity, travel, commuting } = calculatorData;
  
  const electricityEmissions = calculateElectricityEmissions(
    electricity.kwh,
    businessInfo.region,
    businessInfo.state,
    electricity.renewable
  );
  
  const travelEmissions = calculateTravelEmissions(travel);
  
  const commutingEmissions = calculateCommutingEmissions(
    commuting,
    businessInfo.employees
  );
  
  const totalEmissions = electricityEmissions + travelEmissions + commutingEmissions;
  
  return {
    electricity: electricityEmissions,
    travel: travelEmissions,
    commuting: commutingEmissions,
    total: totalEmissions
  };
} 