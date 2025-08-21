import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import { i18nManager } from '@/i18n';
import type { User, LoginCredentials } from '@/types';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  refreshUser: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getCurrentUser();
      const isAuth = AuthService.isAuthenticated();
      
      if (isAuth && currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const authResponse = await AuthService.login(credentials);
      setUser(authResponse.user);
      
      toast({
        title: i18nManager.translate('common.success'),
        description: i18nManager.translate('auth.loginSuccess'),
      });
    } catch (error) {
      toast({
        title: i18nManager.translate('common.error'),
        description: error instanceof Error ? error.message : i18nManager.translate('auth.loginError'),
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
      
      toast({
        title: i18nManager.translate('common.success'),
        description: i18nManager.translate('auth.logoutSuccess'),
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Forgot password function
  const forgotPassword = useCallback(async (email: string) => {
    try {
      await AuthService.forgotPassword(email);
      
      toast({
        title: i18nManager.translate('common.success'),
        description: i18nManager.translate('auth.resetEmailSent'),
      });
    } catch (error) {
      toast({
        title: i18nManager.translate('common.error'),
        description: error instanceof Error ? error.message : i18nManager.translate('common.error'),
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Refresh user data
  const refreshUser = useCallback(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return {
    user,
    isAuthenticated: !!user && AuthService.isAuthenticated(),
    isLoading,
    login,
    logout,
    forgotPassword,
    refreshUser,
  };
};