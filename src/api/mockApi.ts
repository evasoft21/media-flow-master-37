
import React from 'react';
import { authService } from './services/authService';
import { videoService } from './services/videoService';
import { adminService } from './services/adminService';
import { configService } from './services/configService';
import { legalService } from './services/legalService';
import { paymentService } from './services/paymentService';
import { mockDataService } from './services/mockDataService';
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
  
  // Mock data services (previously direct imports)
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
