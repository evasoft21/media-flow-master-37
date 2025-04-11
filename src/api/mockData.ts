
// This file is kept for backward compatibility
// It re-exports the data from the new service-based approach
// In the future, direct imports from this file should be replaced with API calls

import { mockDataService } from './services/mockDataService';

// Re-export the mock data values for backward compatibility
// These should eventually be replaced with API calls in components
export const generateMockVideoInfo = mockDataService.generateVideoInfo;

// Export synchronous versions of the data for backward compatibility
// These will be loaded immediately without the delay simulation
import { platforms } from './data/platforms';
import { features } from './data/features';
import { pricingPlans } from './data/pricingPlans';
import { faqItems } from './data/faqItems';
import { mockUser } from './data/mockUser';

export {
  platforms,
  features,
  pricingPlans,
  faqItems,
  mockUser
};

// Add a console warning to encourage migration to the API
console.warn(
  'Direct imports from mockData.ts are deprecated. ' +
  'Please use the api object instead (e.g., api.getPlatforms(), api.getFeatures(), etc.).'
);
