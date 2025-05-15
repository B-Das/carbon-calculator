// Electricity emission factors (kg CO2e per kWh)
export const electricityFactors = {
  usa: {
    average: 0.417,
    byState: {
      california: 0.229,
      texas: 0.424,
      newyork: 0.255,
      florida: 0.382,
      // Additional states would be included
    }
  },
  uk: 0.233,
  canada: 0.120,
  australia: 0.790,
  // Additional countries would be included
};

// Transportation emission factors (kg CO2e per mile)
export const transportationFactors = {
  car: {
    small: 0.29,
    medium: 0.41,
    large: 0.56,
    electric: 0.06,
    hybrid: 0.19,
  },
  publicTransport: {
    bus: 0.105,
    train: 0.041,
    subway: 0.028,
  },
  air: {
    domestic: 0.255,
    shortHaul: 0.156,
    longHaul: 0.151,
  }
};

// Commuting emission factors
export const commutingFactors = {
  car: 0.41, // Same as medium car
  carpool: 0.14, // Assumes 3 people per car
  publicTransport: 0.073, // Average of bus and train
  walking: 0,
  cycling: 0,
  workFromHome: 0.2, // kg CO2e per day (estimated)
}; 