
import { type User, type SubscriptionPlan, type Invoice, type DownloadRecord, type AdminStats } from "@/types/api";
import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";
import { getAuthToken } from "../utils/storageHelpers";

export const adminService = {
  // Get admin dashboard statistics
  getAdminStats: async (): Promise<AdminStats> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch admin statistics');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching admin statistics');
    }
  },

  // Get list of users (with pagination)
  getUsers: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users?page=${page}&limit=${limit}&token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch users');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching users');
    }
  },

  // Get a single user by ID
  getUserById: async (userId: string): Promise<User> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'User not found');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching user details');
    }
  },
  
  // Add a new user
  addUser: async ({ name, email, plan }: { name: string; email: string; plan: "Free" | "Pro" | "Unlimited" }): Promise<User> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: getCommonHeaders(),
        body: JSON.stringify({ name, email, plan })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to add user');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while adding user');
    }
  },
  
  // Delete a user
  deleteUser: async (userId: string): Promise<{ success: boolean }> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}?token=${token}`, {
        method: 'DELETE',
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to delete user');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while deleting user');
    }
  },
  
  // Get all subscription plans
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/plans?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch subscription plans');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching subscription plans');
    }
  },
  
  // Get a single plan by ID
  getPlanById: async (planId: string): Promise<SubscriptionPlan> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Plan not found');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching plan details');
    }
  },
  
  // Create a new plan
  createPlan: async (planData: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<SubscriptionPlan> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/plans`, {
        method: 'POST',
        headers: getCommonHeaders(),
        body: JSON.stringify(planData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to create plan');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while creating plan');
    }
  },
  
  // Update an existing plan
  updatePlan: async (planId: string, planData: Partial<Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SubscriptionPlan> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}`, {
        method: 'PUT',
        headers: getCommonHeaders(),
        body: JSON.stringify(planData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to update plan');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while updating plan');
    }
  },
  
  // Delete a plan
  deletePlan: async (planId: string): Promise<{ success: boolean }> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}?token=${token}`, {
        method: 'DELETE',
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to delete plan');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while deleting plan');
    }
  },
  
  // Get invoice history (with pagination)
  getInvoices: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/invoices?page=${page}&limit=${limit}&token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch invoices');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching invoices');
    }
  },
  
  // Get download records (with pagination)
  getDownloads: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/downloads?page=${page}&limit=${limit}&token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch downloads');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching downloads');
    }
  },

  // Get a single invoice by ID
  getInvoiceById: async (invoiceId: string): Promise<Invoice> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/invoices/${invoiceId}?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Invoice not found');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching invoice details');
    }
  },

  // Get a single download by ID
  getDownloadById: async (downloadId: string): Promise<DownloadRecord> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/downloads/${downloadId}?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Download record not found');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching download details');
    }
  },

  // Export downloads data
  exportDownloads: async (format: 'csv' | 'json' = 'csv'): Promise<Blob> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      // This would be a real API call in a production app
      // For now, we'll create a simple blob with mock data
      let content: string;
      let mimeType: string;
      
      if (format === 'csv') {
        content = "id,userId,userName,videoUrl,downloadDate,fileSize,resolution,format\n";
        content += "dl-001,user-1,John Doe,https://example.com/video1,2023-05-05T08:30:00Z,35.4 MB,1080p,MP4\n";
        mimeType = 'text/csv';
      } else {
        content = JSON.stringify([{
          id: "dl-001",
          userId: "user-1",
          userName: "John Doe",
          videoUrl: "https://example.com/video1",
          downloadDate: "2023-05-05T08:30:00Z",
          fileSize: "35.4 MB",
          resolution: "1080p",
          format: "MP4"
        }], null, 2);
        mimeType = 'application/json';
      }
      
      return new Blob([content], { type: mimeType });
    } catch (error) {
      throw new ApiError(500, 'An unexpected error occurred while exporting download data');
    }
  },

  // Export invoice data
  exportInvoice: async (invoiceId: string, format: 'pdf' | 'csv' | 'json' = 'pdf'): Promise<Blob> => {
    const token = getAuthToken();
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      // This would be a real API call in a production app
      // For now, we'll create a simple blob with mock data
      let content: string;
      let mimeType: string;
      
      if (format === 'pdf') {
        content = `INVOICE #${invoiceId}\n\nDate: 2023-05-01T10:30:00Z\nCustomer: John Doe\nEmail: john.doe@example.com\nPlan: Pro\nAmount: $9.99\nStatus: Paid`;
        mimeType = 'application/pdf';
      } else if (format === 'csv') {
        content = "id,userId,userName,userEmail,planName,amount,currency,createdAt,status\n";
        content += `${invoiceId},user-1,John Doe,john.doe@example.com,Pro,9.99,USD,2023-05-01T10:30:00Z,Paid\n`;
        mimeType = 'text/csv';
      } else {
        content = JSON.stringify({
          id: invoiceId,
          userId: "user-1",
          userName: "John Doe",
          userEmail: "john.doe@example.com",
          planName: "Pro",
          amount: 9.99,
          currency: "USD",
          createdAt: "2023-05-01T10:30:00Z",
          status: "Paid"
        }, null, 2);
        mimeType = 'application/json';
      }
      
      return new Blob([content], { type: mimeType });
    } catch (error) {
      throw new ApiError(500, 'An unexpected error occurred while exporting invoice data');
    }
  }
};
