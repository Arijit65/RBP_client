import React, { createContext, useContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();

// Configure API base URL
const API_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin`;

export const ApiProvider = ({ children }) => {
  // Create axios instance
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add auth token to requests
  api.interceptors.request.use(
    (config) => {
      // Check for admin token first, then regular token
      const adminToken = localStorage.getItem('adminToken');
      const token = localStorage.getItem('token');
      const authToken = adminToken || token;
      
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle response errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid - clear both tokens
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        
        // Redirect based on current path
        if (window.location.pathname.includes('/admin')) {
          window.location.href = '/admin/login';
        } else {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  // Property API methods
  const propertyApi = {
    // Create a new property
    createProperty: async (propertyData) => {
      try {
        const res = await api.post('/', propertyData);
        return { success: true, data: res.data };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to create property' 
        };
      }
    },

    // Get all properties from all locations
    getAllLocationsProperties: async (params = {}) => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/properties/all-locations${queryParams ? '?' + queryParams : ''}`;
        console.log('📡 Calling:', url);
        const res = await axios.get(url);
        console.log('📡 Response:', res.data);
        return res.data;
      } catch (error) {
        console.error('📡 Error:', error.response?.data || error.message);
        return { 
          success: false, 
          error: error.response?.data?.error || error.message || 'Failed to fetch properties' 
        };
      }
    },

    // Get properties by location
    getPropertiesByLocation: async (location, params = {}) => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/properties/properties/${location}${queryParams ? '?' + queryParams : ''}`;
        console.log('📡 Calling:', url);
        const res = await axios.get(url);
        console.log('📡 Response:', res.data);
        return res.data;
      } catch (error) {
        console.error('📡 Error:', error.response?.data || error.message);
        return { 
          success: false, 
          error: error.response?.data?.error || error.message || 'Failed to fetch properties' 
        };
      }
    },

    // Get all properties (admin)
    getAllProperties: async () => {
      try {
        const res = await api.get('/properties');
        return { success: true, data: res.data };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to fetch properties' 
        };
      }
    },

    // Get single property by ID (public route)
    getPropertyById: async (propertyId) => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/properties/property/${propertyId}`;
        console.log('📡 Fetching property:', url);
        const res = await axios.get(url);
        console.log('📡 Property response:', res.data);
        return res.data;
      } catch (error) {
        console.error('📡 Error:', error.response?.data || error.message);
        return { 
          success: false, 
          error: error.response?.data?.error || error.message || 'Failed to fetch property' 
        };
      }
    },

    // Approve property
    approveProperty: async (propertyId) => {
      try {
        const res = await api.put(`/properties/${propertyId}/approve`);
        return { success: true, data: res.data };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to approve property' 
        };
      }
    },

    // Reject property
    rejectProperty: async (propertyId) => {
      try {
        const res = await api.put(`/properties/${propertyId}/reject`);
        return { success: true, data: res.data };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to reject property' 
        };
      }
    },

    // Delete property
    deleteProperty: async (propertyId) => {
      try {
        const res = await api.delete(`/properties/${propertyId}`);
        return { success: true, data: res.data };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to delete property' 
        };
      }
    },

    // Search properties
    searchProperties: async (query) => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/properties/search?query=${encodeURIComponent(query)}`;
        console.log('🔍 Searching:', url);
        const res = await axios.get(url);
        console.log('🔍 Search results:', res.data);
        return res.data;
      } catch (error) {
        console.error('🔍 Error:', error.response?.data || error.message);
        return { 
          success: false, 
          error: error.response?.data?.error || error.message || 'Search failed' 
        };
      }
    }
  };

  const value = {
    api,
    propertyApi
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;
