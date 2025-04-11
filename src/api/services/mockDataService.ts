import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";
import { VideoInfo } from "@/types/api";

export const mockDataService = {
  // Get platform list
  getPlatforms: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/data/platforms`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch platforms');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching platforms');
    }
  },

  // Get features list
  getFeatures: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/data/features`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch features');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching features');
    }
  },

  // Get pricing plans
  getPricingPlans: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/data/pricing-plans`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch pricing plans');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching pricing plans');
    }
  },

  // Get FAQ items
  getFaqItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/data/faq-items`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch FAQ items');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching FAQ items');
    }
  },

  // Generate mock video info
  generateVideoInfo: (url: string): VideoInfo => {
    // This is now just a wrapper around the API-based function
    // We keep it for compatibility with existing code
    console.warn('Direct call to generateVideoInfo is deprecated. Use api.fetchVideoInfo() instead.');
    
    // Generate a basic video info object
    return {
      id: Math.random().toString(36).substring(2, 15),
      title: "Sample Video",
      author: "Sample Author",
      duration: 300,
      thumbnail: "https://example.com/thumbnail.jpg",
      formats: [{
        id: "format-1",
        format: "MP4",
        quality: "720p",
        url: "https://example.com/video.mp4",
        fileSize: "15.2 MB"
      }],
      platform: "YouTube",
      viewCount: 12345
    };
  },

  // Get mock user
  getMockUser: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/data/mock-user`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch mock user');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching mock user');
    }
  }
};
