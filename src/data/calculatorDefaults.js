export const initialCalculatorData = {
  businessInfo: {
    name: '',
    industry: '',
    employees: 0,
    region: 'usa',
    state: '',
  },
  electricity: {
    kwh: 0,
    renewable: 0, // Percentage of renewable energy
  },
  travel: {
    car: {
      distance: 0,
      type: 'medium',
    },
    air: {
      domestic: 0,
      shortHaul: 0,
      longHaul: 0,
    },
    publicTransport: {
      bus: 0,
      train: 0,
      subway: 0,
    }
  },
  commuting: {
    averageMiles: 0,
    modePercentages: {
      car: 0,
      carpool: 0,
      publicTransport: 0,
      walking: 0,
      cycling: 0,
      workFromHome: 0,
    }
  }
}; 