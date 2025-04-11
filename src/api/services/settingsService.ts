
import { SiteConfig, SocialMediaConfig, LandingPageSection, FAQItem, ColorScheme, ContactInfo, StripeConfig } from '@/types/api';
import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";
import { getAuthToken } from "../utils/storageHelpers";

export const settingsService = {
  // Get terms of service
  getTermsOfService: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/terms`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch terms of service');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching terms of service');
    }
  },

  // Update terms of service
  updateTermsOfService: async (content: string) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings/terms?token=${token}`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update terms of service');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating terms of service');
    }
  },

  // Get privacy policy
  getPrivacyPolicy: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/privacy`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch privacy policy');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching privacy policy');
    }
  },

  // Update privacy policy
  updatePrivacyPolicy: async (content: string) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings/privacy?token=${token}`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update privacy policy');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating privacy policy');
    }
  },

  // Get cookie policy
  getCookiePolicy: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/cookies`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch cookie policy');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching cookie policy');
    }
  },

  // Update cookie policy
  updateCookiePolicy: async (content: string) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings/cookies?token=${token}`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update cookie policy');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating cookie policy');
    }
  },

  // Get contact information
  getContactInfo: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/contact`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch contact information');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching contact information');
    }
  },

  // Update contact information
  updateContactInfo: async (contactInfo: Partial<ContactInfo>) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings/contact?token=${token}`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(contactInfo)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update contact information');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating contact information');
    }
  },

  // Get Stripe configuration
  getStripeConfig: async () => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings/stripe?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch Stripe configuration');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching Stripe configuration');
    }
  },

  // Update Stripe configuration
  updateStripeConfig: async (config: Partial<StripeConfig>) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings/stripe?token=${token}`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update Stripe configuration');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating Stripe configuration');
    }
  }
};
