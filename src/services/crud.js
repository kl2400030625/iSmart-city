// src/services/crud.js

/**
 * CRUD Operations Service
 * Generic CRUD operations that work with API or local storage
 */

import api from './api';
import { localStorage, STORAGE_KEYS } from './storage';

/**
 * Create a CRUD service for a specific resource
 * @param {string} resourceName - Name of the resource (e.g., 'complaints', 'services')
 * @param {boolean} useLocalStorage - Whether to use local storage instead of API
 * @returns {Object} CRUD operations object
 */
export const createCrudService = (resourceName, useLocalStorage = true) => {
  const storageKey = `isc_${resourceName}`;
  const apiEndpoint = `/${resourceName}`;

  return {
    /**
     * Get all items
     * @param {string} token - Optional auth token for API calls
     * @returns {Promise<Array>}
     */
    getAll: async (token = null) => {
      if (useLocalStorage) {
        return localStorage.get(storageKey) || [];
      }
      return api.get(apiEndpoint, token);
    },

    /**
     * Get item by ID
     * @param {string|number} id 
     * @param {string} token - Optional auth token for API calls
     * @returns {Promise<Object|undefined>}
     */
    getById: async (id, token = null) => {
      if (useLocalStorage) {
        const items = localStorage.get(storageKey) || [];
        return items.find(item => item.id === id);
      }
      return api.get(`${apiEndpoint}/${id}`, token);
    },

    /**
     * Create new item
     * @param {Object} data 
     * @param {string} token - Optional auth token for API calls
     * @returns {Promise<Object>}
     */
    create: async (data, token = null) => {
      if (useLocalStorage) {
        const items = localStorage.get(storageKey) || [];
        const newItem = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        items.push(newItem);
        localStorage.set(storageKey, items);
        return newItem;
      }
      return api.post(apiEndpoint, data, token);
    },

    /**
     * Update existing item
     * @param {string|number} id 
     * @param {Object} data 
     * @param {string} token - Optional auth token for API calls
     * @returns {Promise<Object>}
     */
    update: async (id, data, token = null) => {
      if (useLocalStorage) {
        const items = localStorage.get(storageKey) || [];
        const index = items.findIndex(item => item.id === id);
        if (index === -1) {
          throw new Error('Item not found');
        }
        items[index] = {
          ...items[index],
          ...data,
          updatedAt: new Date().toISOString()
        };
        localStorage.set(storageKey, items);
        return items[index];
      }
      return api.put(`${apiEndpoint}/${id}`, data, token);
    },

    /**
     * Delete item
     * @param {string|number} id 
     * @param {string} token - Optional auth token for API calls
     * @returns {Promise<boolean>}
     */
    delete: async (id, token = null) => {
      if (useLocalStorage) {
        const items = localStorage.get(storageKey) || [];
        const filteredItems = items.filter(item => item.id !== id);
        localStorage.set(storageKey, filteredItems);
        return true;
      }
      await api.delete(`${apiEndpoint}/${id}`, token);
      return true;
    },

    /**
     * Clear all items
     * @returns {boolean}
     */
    clearAll: () => {
      if (useLocalStorage) {
        localStorage.remove(storageKey);
        return true;
      }
      return false;
    }
  };
};

// Pre-configured CRUD services for common resources
export const complaintsService = createCrudService('complaints', true);
export const servicesService = createCrudService('city_services', true);
export const updatesService = createCrudService('updates', true);

export default { createCrudService, complaintsService, servicesService, updatesService };
