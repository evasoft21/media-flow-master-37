
import { SiteConfig, SocialMediaConfig, LandingPageSection, FAQItem, ColorScheme } from '@/types/api';
import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";

export const configService = {
  // Get the full site configuration
  getSiteConfig: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/config/site`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch site configuration');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching site configuration');
    }
  },

  // Update site configuration
  updateSiteConfig: async (config: Partial<SiteConfig>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/config/site`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update site configuration');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating site configuration');
    }
  },

  // Update social media settings
  updateSocialMedia: async (socialMedia: SocialMediaConfig[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/config/social-media`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(socialMedia)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update social media settings');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating social media settings');
    }
  },

  // Update landing page sections
  updateLandingSections: async (sections: LandingPageSection[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/config/landing-sections`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(sections)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update landing page sections');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating landing page sections');
    }
  },

  // Update FAQ items
  updateFAQs: async (items: FAQItem[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/config/faqs`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(items)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update FAQ items');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating FAQ items');
    }
  },

  // Update color scheme
  updateColorScheme: async (colorScheme: ColorScheme) => {
    try {
      const response = await fetch(`${API_BASE_URL}/config/color-scheme`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(colorScheme)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update color scheme');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating color scheme');
    }
  },
};
