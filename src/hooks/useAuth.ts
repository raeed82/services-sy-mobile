import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/client';

export const useAuth = () => {
  const { user, token, isLoading, error, setUser, setToken, setLoading, setError, logout } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/trpc/auth.login', {
        email,
        password,
      });
      
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'فشل تسجيل الدخول';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setToken, setUser]);

  const register = useCallback(async (data: {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/trpc/auth.register', data);
      
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'فشل التسجيل';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setToken, setUser]);

  const handleLogout = useCallback(async () => {
    try {
      await apiClient.post('/api/trpc/auth.logout');
    } catch (err) {
      console.error('خطأ في تسجيل الخروج:', err);
    } finally {
      logout();
    }
  }, [logout]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await apiClient.get('/api/trpc/auth.me');
      setUser(response.user);
      return response.user;
    } catch (err) {
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, logout]);

  return {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
    checkAuth,
    isAuthenticated: !!user && !!token,
  };
};
