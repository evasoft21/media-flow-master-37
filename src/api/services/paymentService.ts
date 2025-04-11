
import { StripeConfig } from "@/types/api";
import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";
import { getAuthToken } from "../utils/storageHelpers";

export const paymentService = {
  // Create a checkout session
  createCheckoutSession: async (planId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/checkout-session`, {
        method: 'POST',
        headers: getCommonHeaders(),
        body: JSON.stringify({ planId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to create checkout session');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while creating checkout session');
    }
  },
  
  // Get payment session details
  getPaymentSession: async (sessionId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/payment-session/${sessionId}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to get payment session details');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while getting payment session details');
    }
  },
  
  // Get Stripe configuration
  getStripeConfig: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/stripe-config`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to get Stripe configuration');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while getting Stripe configuration');
    }
  },
  
  // Update Stripe configuration
  updateStripeConfig: async (config: Partial<StripeConfig>) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/payments/stripe-config?token=${token}`, {
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
