// src/services/storage.js

/**
 * Storage service for Local Storage and Session Storage operations
 */

const STORAGE_KEYS = {
  USER: 'isc_user',
  AUTH_TOKEN: 'isc_auth_token',
  COMPLAINTS: 'isc_complaints',
  SERVICES: 'isc_services',
  USERS: 'isc_users'
};

/**
 * Local Storage operations
 */
export const localStorage = {
  /**
   * Get item from localStorage
   * @param {string} key 
   * @returns {*} parsed value or null
   */
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key 
   * @param {*} value 
   * @returns {boolean} success status
   */
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key 
   * @returns {boolean} success status
   */
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   * @returns {boolean} success status
   */
  clear: () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

/**
 * Session Storage operations
 */
export const sessionStorage = {
  /**
   * Get item from sessionStorage
   * @param {string} key 
   * @returns {*} parsed value or null
   */
  get: (key) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  },

  /**
   * Set item in sessionStorage
   * @param {string} key 
   * @param {*} value 
   * @returns {boolean} success status
   */
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
      return false;
    }
  },

  /**
   * Remove item from sessionStorage
   * @param {string} key 
   * @returns {boolean} success status
   */
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  },

  /**
   * Clear all sessionStorage
   * @returns {boolean} success status
   */
  clear: () => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }
};

/**
 * Auth storage helpers (using localStorage for persistence)
 */
export const authStorage = {
  /**
   * Save user data to storage
   * @param {Object} userData 
   */
  saveUser: (userData) => {
    localStorage.set(STORAGE_KEYS.USER, userData);
  },

  /**
   * Get user data from storage
   * @returns {Object|null}
   */
  getUser: () => {
    return localStorage.get(STORAGE_KEYS.USER);
  },

  /**
   * Remove user data from storage
   */
  removeUser: () => {
    localStorage.remove(STORAGE_KEYS.USER);
    localStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Save auth token
   * @param {string} token 
   */
  saveToken: (token) => {
    localStorage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Get auth token
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.get(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return localStorage.get(STORAGE_KEYS.USER) !== null;
  }
};

/**
 * Users storage (for demo/mock purposes - simulates user database)
 */
export const usersStorage = {
  /**
   * Get all registered users
   * @returns {Array}
   */
  getAll: () => {
    return localStorage.get(STORAGE_KEYS.USERS) || [];
  },

  /**
   * Add a new user
   * @param {Object} user 
   * @returns {boolean}
   */
  add: (user) => {
    const users = usersStorage.getAll();
    users.push(user);
    return localStorage.set(STORAGE_KEYS.USERS, users);
  },

  /**
   * Find user by username
   * @param {string} username 
   * @returns {Object|undefined}
   */
  findByUsername: (username) => {
    const users = usersStorage.getAll();
    return users.find(u => u.username === username);
  },

  /**
   * Find user by email
   * @param {string} email 
   * @returns {Object|undefined}
   */
  findByEmail: (email) => {
    const users = usersStorage.getAll();
    return users.find(u => u.email === email);
  }
};

export { STORAGE_KEYS };
export default { localStorage, sessionStorage, authStorage, usersStorage, STORAGE_KEYS };
