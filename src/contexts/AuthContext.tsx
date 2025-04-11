
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/api/mockApi';
import { type User } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signup: (email: string, password: string, confirmPassword: string, name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in (token exists)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (api.isAuthenticated()) {
          const currentUser = await api.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // If token is invalid or expired, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        // For development, we can use the mock user
        if (process.env.NODE_ENV === 'development') {
          // Add mock user data for development purposes
          const mockUser: User = {
            id: 'mock-user-1',
            name: 'Demo User',
            email: 'user@example.com',
            role: 'user',
            plan: 'Pro',
            avatarUrl: null,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          
          // Save mock user to localStorage
          localStorage.setItem('currentUser', JSON.stringify(mockUser));
          localStorage.setItem('authToken', 'mock-token-for-development');
          
          setUser(mockUser);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.loginUser({ email, password, rememberMe });
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: (error as any)?.message || 'An error occurred during login',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    confirmPassword: string,
    name?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.signupUser({ email, password, confirmPassword, name });
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: (error as any)?.message || 'An error occurred during signup',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await api.logoutUser();
      setUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An error occurred during logout',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
