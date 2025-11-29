// src/services/api.js

/**
 * API Service module for HTTP requests using Fetch API
 * Can be easily extended to use Axios if needed
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Default headers for API requests
 */
const getDefaultHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Handle API response
 * @param {Response} response 
 * @returns {Promise<Object>}
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();
  
  if (!response.ok) {
    const error = {
      status: response.status,
      statusText: response.statusText,
      message: isJson && data.message ? data.message : 'An error occurred',
      data
    };
    throw error;
  }
  
  return data;
};

/**
 * API service object with HTTP methods
 */
const api = {
  /**
   * GET request
   * @param {string} endpoint 
   * @param {string} token - Optional auth token
   * @returns {Promise<Object>}
   */
  get: async (endpoint, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getDefaultHeaders(token)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },

  /**
   * POST request
   * @param {string} endpoint 
   * @param {Object} data 
   * @param {string} token - Optional auth token
   * @returns {Promise<Object>}
   */
  post: async (endpoint, data, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  /**
   * PUT request
   * @param {string} endpoint 
   * @param {Object} data 
   * @param {string} token - Optional auth token
   * @returns {Promise<Object>}
   */
  put: async (endpoint, data, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },

  /**
   * PATCH request
   * @param {string} endpoint 
   * @param {Object} data 
   * @param {string} token - Optional auth token
   * @returns {Promise<Object>}
   */
  patch: async (endpoint, data, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API PATCH Error:', error);
      throw error;
    }
  },

  /**
   * DELETE request
   * @param {string} endpoint 
   * @param {string} token - Optional auth token
   * @returns {Promise<Object>}
   */
  delete: async (endpoint, token = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getDefaultHeaders(token)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
};

export default api;
export { API_BASE_URL, getDefaultHeaders, handleResponse };
