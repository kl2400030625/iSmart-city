// src/context/ThemeContext.jsx

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeContext = createContext();

// Define theme settings
const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light mode
                primary: {
                    main: '#0284c7', // More subtle blue
                    light: '#38bdf8',
                    dark: '#0369a1',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#0d9488', // Teal
                    light: '#2dd4bf',
                    dark: '#0f766e',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#f0f9ff', // Subtle blue tint
                    paper: '#ffffff',
                },
                text: {
                    primary: '#0f172a', // Darker text for better contrast
                    secondary: '#475569',
                },
                success: {
                    main: '#16a34a',
                    light: '#4ade80',
                    dark: '#15803d',
                },
                warning: {
                    main: '#d97706',
                    light: '#fbbf24',
                    dark: '#b45309',
                },
                error: {
                    main: '#e11d48',
                    light: '#fb7185',
                    dark: '#be123c',
                },
            }
            : {
                // Dark mode
                primary: {
                    main: '#3b82f6', // Bright blue
                    light: '#60a5fa',
                    dark: '#2563eb',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#10b981', // Vibrant green
                    light: '#34d399',
                    dark: '#059669',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#0f172a',
                    paper: '#1e293b',
                },
                text: {
                    primary: '#f8fafc',
                    secondary: '#cbd5e1',
                },
                success: {
                    main: '#10b981',
                    light: '#34d399',
                    dark: '#059669',
                },
                warning: {
                    main: '#f97316',
                    light: '#fb923c',
                    dark: '#ea580c',
                },
                error: {
                    main: '#ef4444',
                    light: '#f87171',
                    dark: '#dc2626',
                },
            }),
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    padding: '8px 20px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.9375rem',
                },
                contained: {
                    boxShadow: mode === 'light' 
                        ? '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
                        : 'none',
                    '&:hover': {
                        boxShadow: mode === 'light'
                            ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
                            : '0 4px 8px rgba(0, 0, 0, 0.25)',
                        transform: 'translateY(-1px)',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                        backgroundColor: mode === 'light' 
                            ? 'rgba(2, 132, 199, 0.04)'
                            : 'rgba(56, 189, 248, 0.04)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    boxShadow: mode === 'light' 
                        ? '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                    border: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'light'
                            ? '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)'
                            : '0 6px 8px -1px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
                    backgroundImage: 'none',
                    borderRadius: '0.75rem',
                },
                elevation1: {
                    boxShadow: mode === 'light'
                        ? '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
                        : '0 1px 3px rgba(0, 0, 0, 0.2)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'light' 
                        ? '#ffffff'
                        : 'rgba(30, 41, 59, 0.8)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: mode === 'light'
                        ? '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
                        : '0 1px 3px rgba(0, 0, 0, 0.2)',
                    borderBottom: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)'}`,
                    '& .MuiToolbar-root': {
                        color: mode === 'light' ? '#0f172a' : '#ffffff',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.6)',
                        '&:hover': {
                            backgroundColor: mode === 'light' ? '#ffffff' : 'rgba(30, 41, 59, 0.8)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: mode === 'light' ? '#ffffff' : 'rgba(30, 41, 59, 0.8)',
                        },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    fontWeight: 500,
                    '&.MuiChip-filled': {
                        backgroundColor: mode === 'light' ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.08)',
                    },
                },
                filledPrimary: {
                    backgroundColor: mode === 'light' ? 'rgba(2, 132, 199, 0.12)' : 'rgba(56, 189, 248, 0.12)',
                    color: mode === 'light' ? '#0284c7' : '#38bdf8',
                },
                filledSecondary: {
                    backgroundColor: mode === 'light' ? 'rgba(13, 148, 136, 0.12)' : 'rgba(45, 212, 191, 0.12)',
                    color: mode === 'light' ? '#0d9488' : '#2dd4bf',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
                    padding: '16px',
                },
                head: {
                    fontWeight: 600,
                    backgroundColor: mode === 'light' ? 'rgba(2, 132, 199, 0.02)' : 'rgba(56, 189, 248, 0.02)',
                    color: mode === 'light' ? '#0f172a' : '#f8fafc',
                },
            },
        },

    },
});

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark');

    // Update the theme only if the mode changes
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    useEffect(() => {
        localStorage.setItem('theme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);