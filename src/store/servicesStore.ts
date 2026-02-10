import { create } from 'zustand';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price?: number;
  location: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
  };
  images?: string[];
  rating?: number;
  reviews?: number;
  createdAt: string;
}

interface ServicesStore {
  services: Service[];
  filteredServices: Service[];
  isLoading: boolean;
  error: string | null;
  selectedService: Service | null;
  
  // Filters
  searchQuery: string;
  selectedCategory: string | null;
  selectedLocation: string | null;
  
  // Actions
  setServices: (services: Service[]) => void;
  setFilteredServices: (services: Service[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedService: (service: Service | null) => void;
  
  // Filter actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedLocation: (location: string | null) => void;
  
  // Helper methods
  filterServices: () => void;
  reset: () => void;
}

export const useServicesStore = create<ServicesStore>((set, get) => ({
  services: [],
  filteredServices: [],
  isLoading: false,
  error: null,
  selectedService: null,
  
  searchQuery: '',
  selectedCategory: null,
  selectedLocation: null,
  
  setServices: (services) => {
    set({ services });
    get().filterServices();
  },
  
  setFilteredServices: (services) => set({ filteredServices: services }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedService: (service) => set({ selectedService: service }),
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterServices();
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().filterServices();
  },
  
  setSelectedLocation: (location) => {
    set({ selectedLocation: location });
    get().filterServices();
  },
  
  filterServices: () => {
    const { services, searchQuery, selectedCategory, selectedLocation } = get();
    
    let filtered = services;
    
    // البحث بالكلمات المفتاحية
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // التصفية حسب الفئة
    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    // التصفية حسب الموقع
    if (selectedLocation) {
      filtered = filtered.filter(service => service.location === selectedLocation);
    }
    
    set({ filteredServices: filtered });
  },
  
  reset: () => set({
    services: [],
    filteredServices: [],
    isLoading: false,
    error: null,
    selectedService: null,
    searchQuery: '',
    selectedCategory: null,
    selectedLocation: null,
  }),
}));
