// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authStorage, usersStorage } from '../services/storage';

const AuthContext = createContext(null);

/**
 * Authentication Provider component
 * Manages user authentication state, login, signup, and logout
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from storage on mount
  useEffect(() => {
    const storedUser = authStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Login user
   * @param {string} username 
   * @param {string} password 
   * @returns {Object} - { success, user, error }
   */
  const login = useCallback(async (username, password) => {
    setError(null);
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Find user in storage (mock database)
      const foundUser = usersStorage.findByUsername(username);

      if (!foundUser) {
        const err = 'Invalid username or password';
        setError(err);
        setLoading(false);
        return { success: false, error: err };
      }

      // Check password (in real app, this would be done server-side)
      if (foundUser.password !== password) {
        const err = 'Invalid username or password';
        setError(err);
        setLoading(false);
        return { success: false, error: err };
      }

      // Create user session (exclude password)
      const sessionUser = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        fullname: foundUser.fullname,
        role: foundUser.role
      };

      // Save to storage and state
      authStorage.saveUser(sessionUser);
      authStorage.saveToken(`mock-token-${Date.now()}`);
      setUser(sessionUser);
      setLoading(false);

      return { success: true, user: sessionUser };
    } catch (error) {
      // Log error for debugging in development
      if (import.meta.env.DEV) {
        console.error('Login error:', error);
      }
      const errorMsg = 'An error occurred during login';
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  }, []);

  /**
   * Register new user
   * @param {Object} userData - { fullname, email, username, password, role }
   * @returns {Object} - { success, user, error }
   */
  const signup = useCallback(async (userData) => {
    setError(null);
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if username already exists
      if (usersStorage.findByUsername(userData.username)) {
        const err = 'Username already exists';
        setError(err);
        setLoading(false);
        return { success: false, error: err };
      }

      // Check if email already exists
      if (usersStorage.findByEmail(userData.email)) {
        const err = 'Email already registered';
        setError(err);
        setLoading(false);
        return { success: false, error: err };
      }

      // Create new user
      // NOTE: Demo only - in production, passwords should be hashed server-side
      const newUser = {
        id: Date.now().toString(),
        fullname: userData.fullname,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        role: userData.role || 'user',
        createdAt: new Date().toISOString()
      };

      // Save to storage
      usersStorage.add(newUser);

      // Create user session (exclude password)
      const sessionUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullname: newUser.fullname,
        role: newUser.role
      };

      // Auto-login after signup
      authStorage.saveUser(sessionUser);
      authStorage.saveToken(`mock-token-${Date.now()}`);
      setUser(sessionUser);
      setLoading(false);

      return { success: true, user: sessionUser };
    } catch (error) {
      // Log error for debugging in development
      if (import.meta.env.DEV) {
        console.error('Signup error:', error);
      }
      const errorMsg = 'An error occurred during registration';
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    authStorage.removeUser();
    setUser(null);
    setError(null);
  }, []);

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  const isAuthenticated = useCallback(() => {
    return user !== null;
  }, [user]);

  /**
   * Get user role
   * @returns {string|null}
   */
  const getRole = useCallback(() => {
    return user?.role || null;
  }, [user]);

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated,
    getRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {Object} auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
