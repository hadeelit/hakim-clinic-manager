import { API_CONFIG, STORAGE_KEYS } from '@/constants';
import type { ApiResponse } from '@/types';

// Base API configuration
const API_BASE_URL = `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`;

// API Client class for centralized HTTP requests
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  // Get authentication token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Create headers with authentication
  private createHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Base fetch method with error handling
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
        headers: this.createHeaders(options.headers as Record<string, string>),
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Handle API response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to parse response');
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params 
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;
    
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
    });
    
    return this.handleResponse<T>(response);
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'DELETE',
    });
    
    return this.handleResponse<T>(response);
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  // Upload file
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, string>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await this.fetchWithTimeout(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
    
    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export for custom instances if needed
export { ApiClient };