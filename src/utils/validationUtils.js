// src/utils/validationUtils.js

/**
 * Validates business information fields.
 * @param {Object} businessInfo - The business info object to validate.
 * @returns {Object} errors - An object containing validation errors.
 */
export function validateBusinessInfo(businessInfo) {
  const errors = {};
  // Example validation logic (customize as needed)
  if (!businessInfo.name || businessInfo.name.trim() === "") {
    errors.name = "Business name is required.";
  }
  if (!businessInfo.industry || businessInfo.industry.trim() === "") {
    errors.industry = "Industry is required.";
  }
  // Add more validation as needed
  return errors;
}

/**
 * Validates electricity usage fields.
 * @param {Object} electricityData - The electricity data object to validate.
 * @returns {Object} errors - An object containing validation errors.
 */
export function validateElectricity(electricityData) {
  const errors = {};
  // Example validation logic (customize as needed)
  if (
    !electricityData.kwh ||
    isNaN(Number(electricityData.kwh)) ||
    Number(electricityData.kwh) <= 0
  ) {
    errors.kwh = "Electricity usage (kWh) must be a positive number.";
  }
  // Add more validation as needed
  return errors;
}

/**
 * Validates travel data fields.
 * @param {Object} travelData - The travel data object to validate.
 * @returns {Object} errors - An object containing validation errors.
 */
export function validateTravel(travelData) {
  const errors = {};
  
  if (!travelData.car?.type || travelData.car.type === '') {
    errors.transportType = 'Please select a transportation type.';
  }

  if (travelData.car?.distance === undefined || travelData.car.distance === '') {
    errors.businessMiles = 'Business miles is required.';
  } else if (isNaN(Number(travelData.car.distance)) || Number(travelData.car.distance) < 0) {
    errors.businessMiles = 'Business miles must be a positive number.';
  }

  if (travelData.publicTransport?.bus === undefined || travelData.publicTransport.bus === '') {
    errors.freightMiles = 'Freight miles is required.';
  } else if (isNaN(Number(travelData.publicTransport.bus)) || Number(travelData.publicTransport.bus) < 0) {
    errors.freightMiles = 'Freight miles must be a positive number.';
  }

  return errors;
}

/**
 * Validates commuting data fields.
 * @param {Object} commutingData - The commuting data object to validate.
 * @returns {Object} errors - An object containing validation errors.
 */
export function validateCommuting(commutingData) {
  const errors = {};
  
  // Validate average miles
  if (commutingData.averageMiles === undefined || commutingData.averageMiles === '') {
    errors.averageMiles = 'Average commute miles is required.';
  } else if (isNaN(Number(commutingData.averageMiles)) || Number(commutingData.averageMiles) < 0) {
    errors.averageMiles = 'Average commute miles must be a positive number.';
  }
  
  // Validate mode percentages
  if (commutingData.modePercentages) {
    const totalPercentage = Object.values(commutingData.modePercentages).reduce((sum, v) => sum + (Number(v) || 0), 0);
    
    // Only validate total if any percentages were entered
    if (totalPercentage > 0 && totalPercentage !== 100) {
      errors.totalPercentage = 'Commuting method percentages must add up to 100%.';
    }
  }
  
  return errors;
}
