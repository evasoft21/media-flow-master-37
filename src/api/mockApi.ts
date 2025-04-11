
import { authService } from './services/authService';
import { videoService } from './services/videoService';
import { adminService } from './services/adminService';
import { configService } from './services/configService';
import { legalService } from './services/legalService';
import { paymentService } from './services/paymentService';
import { mockDataService } from './services/mockDataService';
import { settingsService } from './services/settingsService';
import { isAuthenticated } from './utils/storageHelpers';
import { useApiRequest } from './hooks/useApiRequest';

// Combine all services into a single API object
export const api = {
  // Video and download services
  ...videoService,
  
  // Authentication services
  ...authService,
  
  // Admin services
  ...adminService,
  
  // Configuration services
  ...configService,
  
  // Legal services
  ...legalService,
  
  // Payment services
  ...paymentService,
  
  // Settings services
  ...settingsService,
  
  // Mock data services (these now connect to the real API)
  getPlatforms: mockDataService.getPlatforms,
  getFeatures: mockDataService.getFeatures,
  getPricingPlans: mockDataService.getPricingPlans,
  getFaqItems: mockDataService.getFaqItems,
  getMockUser: mockDataService.getMockUser,
  generateVideoInfo: mockDataService.generateVideoInfo,
  
  // Utility functions
  isAuthenticated
};

export { useApiRequest };
