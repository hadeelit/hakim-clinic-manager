import { apiClient } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/constants';
import type { LoginCredentials, AuthResponse, User, ApiResponse } from '@/types';

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials);
      
      if (response.success && response.data) {
        // Store authentication data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
        
        // Store remember me preference
        if (credentials.rememberMe) {
          localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
        } else {
          localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
          // Set session storage instead for temporary login
          sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
          sessionStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
        }
        
        return response.data;
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      // Even if API call fails, clear local data
      console.error('Logout API call failed:', error);
    } finally {
      // Clear all authentication data
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || 
                 sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  }

  // Get current user data
  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA) || 
                      sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get authentication token
  static getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || 
           sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Refresh authentication token
  static async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<{ token: string; refreshToken: string }>(
        API_ENDPOINTS.REFRESH,
        { refreshToken }
      );

      if (response.success && response.data) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
        return response.data.token;
      }

      throw new Error(response.message || 'Token refresh failed');
    } catch (error) {
      // If refresh fails, logout user
      await this.logout();
      throw new Error(error instanceof Error ? error.message : 'Token refresh failed');
    }
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<void> {
    try {
      const response = await apiClient.post<void>(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to send reset email');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to send reset email');
    }
  }

  // Reset password
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await apiClient.post<void>(API_ENDPOINTS.RESET_PASSWORD, { 
        token, 
        password: newPassword 
      });
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to reset password');
    }
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<User>(API_ENDPOINTS.USER_PROFILE, userData);
      
      if (response.success && response.data) {
        // Update stored user data
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data));
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update profile');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  }
}