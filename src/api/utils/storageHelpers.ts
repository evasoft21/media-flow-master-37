import { User } from "@/types/api";

// Get current user from local storage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Save user to local storage
export const saveCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Mock auth token for session management
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export const saveAuthToken = (token: string, rememberMe: boolean = false): void => {
  // If remember me is checked, store in localStorage (persists across browser sessions)
  // Otherwise, store in sessionStorage (cleared when browser is closed)
  if (rememberMe) {
    localStorage.setItem('authToken', token);
  } else {
    sessionStorage.setItem('authToken', token);
  }
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
