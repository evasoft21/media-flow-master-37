
import { type LoginRequest, type SignupRequest, type AuthResponse, type User } from "@/types/api";
import { saveAuthToken, saveCurrentUser, getCurrentUser, getAuthToken, clearAuthToken } from "../utils/storageHelpers";
import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";

export const authService = {
  // Login user
  loginUser: async (credentials: LoginRequest): Promise<AuthResponse> => {
    if (!credentials.email || !credentials.password) {
      throw new ApiError(400, 'Email and password are required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Save auth data
      saveAuthToken(data.token, credentials.rememberMe);
      saveCurrentUser(data.user);

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred during login');
    }
  },

  // Signup user
  signupUser: async (signupData: SignupRequest): Promise<AuthResponse> => {
    if (!signupData.email || !signupData.password || !signupData.confirmPassword) {
      throw new ApiError(400, 'All fields are required');
    }

    if (signupData.password !== signupData.confirmPassword) {
      throw new ApiError(400, 'Passwords do not match', {
        confirmPassword: ['Passwords do not match']
      });
    }

    if (signupData.password.length < 6) {
      throw new ApiError(400, 'Password must be at least 6 characters', {
        password: ['Password must be at least 6 characters']
      });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      
      // Save auth data
      saveAuthToken(data.token);
      saveCurrentUser(data.user);

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred during registration');
    }
  },

  // Logout user
  logoutUser: async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getCommonHeaders()
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear token regardless of API response
      clearAuthToken();
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const token = getAuthToken();
    
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to get user information');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching user data');
    }
  }
};
