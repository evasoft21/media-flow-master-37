
import { platforms } from '../data/platforms';
import { features } from '../data/features';
import { pricingPlans } from '../data/pricingPlans';
import { faqItems } from '../data/faqItems';
import { mockUser } from '../data/mockUser';
import { generateMockVideoInfo } from '../utils/videoInfoGenerator';
import { delay, createApiError } from "../utils/apiHelpers";

export const mockDataService = {
  // Get platform list
  getPlatforms: async () => {
    // Simulate API delay
    await delay(300);
    return platforms;
  },

  // Get features list
  getFeatures: async () => {
    // Simulate API delay
    await delay(400);
    return features;
  },

  // Get pricing plans
  getPricingPlans: async () => {
    // Simulate API delay
    await delay(500);
    return pricingPlans;
  },

  // Get FAQ items
  getFaqItems: async () => {
    // Simulate API delay
    await delay(350);
    return faqItems;
  },

  // Generate mock video info
  generateVideoInfo: (url: string) => {
    return generateMockVideoInfo(url);
  },

  // Get mock user
  getMockUser: async () => {
    // Simulate API delay
    await delay(300);
    return mockUser;
  }
};
