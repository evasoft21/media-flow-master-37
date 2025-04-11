
// Basic API response type
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// API configuration
export const API_BASE_URL = "http://localhost:8000/api";

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Functions to handle API errors
export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = "ApiError";
  }
}

// Common headers for API requests
export const getCommonHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};
