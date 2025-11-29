// src/utils/validation.js

/**
 * Validation utility functions for form validation
 */

export const validators = {
  /**
   * Validate email format
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength (min 6 characters)
   * @param {string} password 
   * @returns {boolean}
   */
  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  /**
   * Check if value is not empty
   * @param {string} value 
   * @returns {boolean}
   */
  isRequired: (value) => {
    return value !== undefined && value !== null && value.toString().trim() !== '';
  },

  /**
   * Validate username (alphanumeric and underscores, min 3 characters)
   * @param {string} username 
   * @returns {boolean}
   */
  isValidUsername: (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
  },

  /**
   * Validate that two values match (for password confirmation)
   * @param {string} value1 
   * @param {string} value2 
   * @returns {boolean}
   */
  doValuesMatch: (value1, value2) => {
    return value1 === value2;
  },

  /**
   * Validate minimum length
   * @param {string} value 
   * @param {number} minLength 
   * @returns {boolean}
   */
  hasMinLength: (value, minLength) => {
    return value && value.length >= minLength;
  }
};

/**
 * Validate login form data
 * @param {Object} data - { username, password }
 * @returns {Object} - { isValid, errors }
 */
export const validateLoginForm = (data) => {
  const errors = {};
  
  if (!validators.isRequired(data.username)) {
    errors.username = 'Username is required';
  } else if (!validators.isValidUsername(data.username)) {
    errors.username = 'Username must be at least 3 characters (alphanumeric)';
  }
  
  if (!validators.isRequired(data.password)) {
    errors.password = 'Password is required';
  } else if (!validators.isValidPassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate signup form data
 * @param {Object} data - { fullname, email, username, password, confirmPassword, role }
 * @returns {Object} - { isValid, errors }
 */
export const validateSignupForm = (data) => {
  const errors = {};
  
  if (!validators.isRequired(data.fullname)) {
    errors.fullname = 'Full name is required';
  } else if (!validators.hasMinLength(data.fullname, 2)) {
    errors.fullname = 'Full name must be at least 2 characters';
  }
  
  if (!validators.isRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validators.isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validators.isRequired(data.username)) {
    errors.username = 'Username is required';
  } else if (!validators.isValidUsername(data.username)) {
    errors.username = 'Username must be at least 3 characters (alphanumeric)';
  }
  
  if (!validators.isRequired(data.password)) {
    errors.password = 'Password is required';
  } else if (!validators.isValidPassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (!validators.isRequired(data.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (!validators.doValuesMatch(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!validators.isRequired(data.role)) {
    errors.role = 'Please select a role';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default validators;
