import { useCallback, useEffect } from 'react';
import { useServicesStore } from '../store/servicesStore';
import apiClient from '../api/client';

export const useServices = () => {
  const {
    services,
    filteredServices,
    isLoading,
    error,
    selectedService,
    searchQuery,
    selectedCategory,
    selectedLocation,
    setServices,
    setLoading,
    setError,
    setSelectedService,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLocation,
  } = useServicesStore();

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get('/api/trpc/services.list');
      setServices(response.services || []);
    } catch (err: any) {
      const errorMessage = err.message || 'فشل تحميل الخدمات';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [setServices, setLoading, setError]);

  const getServiceDetails = useCallback(async (serviceId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get(`/api/trpc/services.getById?id=${serviceId}`);
      setSelectedService(response.service);
      return response.service;
    } catch (err: any) {
      const errorMessage = err.message || 'فشل تحميل تفاصيل الخدمة';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [setSelectedService, setLoading, setError]);

  const searchServices = useCallback((query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const filterByCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  const filterByLocation = useCallback((location: string | null) => {
    setSelectedLocation(location);
  }, [setSelectedLocation]);

  const createService = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/trpc/services.create', data);
      setServices([...services, response.service]);
      return response.service;
    } catch (err: any) {
      const errorMessage = err.message || 'فشل إنشاء الخدمة';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services, setServices, setLoading, setError]);

  const updateService = useCallback(async (serviceId: string, data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.put(`/api/trpc/services.update`, {
        id: serviceId,
        ...data,
      });
      
      const updated = services.map(s => s.id === serviceId ? response.service : s);
      setServices(updated);
      return response.service;
    } catch (err: any) {
      const errorMessage = err.message || 'فشل تحديث الخدمة';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services, setServices, setLoading, setError]);

  const deleteService = useCallback(async (serviceId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiClient.delete(`/api/trpc/services.delete?id=${serviceId}`);
      const filtered = services.filter(s => s.id !== serviceId);
      setServices(filtered);
    } catch (err: any) {
      const errorMessage = err.message || 'فشل حذف الخدمة';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services, setServices, setLoading, setError]);

  // جلب الخدمات عند تحميل المكون
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    filteredServices,
    isLoading,
    error,
    selectedService,
    searchQuery,
    selectedCategory,
    selectedLocation,
    
    // Methods
    fetchServices,
    getServiceDetails,
    searchServices,
    filterByCategory,
    filterByLocation,
    createService,
    updateService,
    deleteService,
  };
};
