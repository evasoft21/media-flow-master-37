
import { type VideoInfo } from "@/types/api";
import { API_BASE_URL, ApiError, getCommonHeaders } from "../types";
import { getAuthToken } from "../utils/storageHelpers";

export const videoService = {
  // Fetch video information from a URL
  fetchVideoInfo: async (url: string): Promise<VideoInfo> => {
    if (!url) {
      throw new ApiError(400, 'URL is required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/videos/fetch-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch video information');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching video information');
    }
  },

  // Download a video
  downloadVideo: async (videoId: string, formatId: string) => {
    const token = getAuthToken();
    
    try {
      const response = await fetch(`${API_BASE_URL}/videos/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ videoId, formatId, token })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Download failed');
      }

      const data = await response.json();
      
      // In a real app this would trigger file download
      // For now, we'll just return the data
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred during download');
    }
  },

  // Get user downloads
  getUserDownloads: async () => {
    const token = getAuthToken();
    
    if (!token) {
      throw new ApiError(401, 'Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/videos/history?token=${token}`, {
        headers: getCommonHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.status, errorData.detail || 'Failed to fetch download history');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'An unexpected error occurred while fetching download history');
    }
  }
};
