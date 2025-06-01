import { ArtCultureFinancialData, TourismData } from './types'

export interface CategorizedData {
  art: {
    [state: string]: {
      financial: ArtCultureFinancialData[];
      tourism: TourismData[];
    }
  };
  culture: {
    [state: string]: {
      financial: ArtCultureFinancialData[];
      tourism: TourismData[];
    }
  };
  tourism: {
    [state: string]: {
      financial: ArtCultureFinancialData[];
      tourism: TourismData[];
    }
  };
}

export function categorizeAndGroupData(
  financialData: ArtCultureFinancialData[],
  tourismData: TourismData[]
): CategorizedData {
  const result: CategorizedData = {
    art: {},
    culture: {},
    tourism: {}
  };

  // Helper function to initialize state data if it doesn't exist
  const initStateData = (category: keyof CategorizedData, state: string) => {
    if (!result[category][state]) {
      result[category][state] = {
        financial: [],
        tourism: []
      };
    }
  };

  // Process financial data
  financialData.forEach(record => {
    const state = record.STATE_UT.toLowerCase();
    
    // Add to art category
    initStateData('art', state);
    result.art[state].financial.push(record);
    
    // Add to culture category
    initStateData('culture', state);
    result.culture[state].financial.push(record);
  });

  // Process tourism data
  tourismData.forEach(record => {
    const state = record.STATE.toLowerCase();
    
    // Add to art category if state has art
    if (record.HAS_ART) {
      initStateData('art', state);
      result.art[state].tourism.push(record);
    }
    
    // Add to culture category if state has culture
    if (record.HAS_CULTURE) {
      initStateData('culture', state);
      result.culture[state].tourism.push(record);
    }
    
    // Add to tourism category if state has tourism
    if (record.HAS_TOURISM) {
      initStateData('tourism', state);
      result.tourism[state].tourism.push(record);
    }
  });

  return result;
}

// Helper function to get state statistics
export function getStateStatistics(categorizedData: CategorizedData) {
  const statistics: { [state: string]: { art: boolean; culture: boolean; tourism: boolean } } = {};

  // Process each category
  Object.entries(categorizedData).forEach(([category, states]) => {
    Object.keys(states).forEach(state => {
      if (!statistics[state]) {
        statistics[state] = { art: false, culture: false, tourism: false };
      }
      statistics[state][category as keyof typeof statistics[string]] = true;
    });
  });

  return statistics;
}

// Helper function to get category statistics
export function getCategoryStatistics(categorizedData: CategorizedData) {
  return {
    art: {
      totalStates: Object.keys(categorizedData.art).length,
      states: Object.keys(categorizedData.art)
    },
    culture: {
      totalStates: Object.keys(categorizedData.culture).length,
      states: Object.keys(categorizedData.culture)
    },
    tourism: {
      totalStates: Object.keys(categorizedData.tourism).length,
      states: Object.keys(categorizedData.tourism)
    }
  };
} 