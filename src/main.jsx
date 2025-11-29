// src/main.jsx (or src/index.jsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './App.css'; // Global CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* FIX: THEMEPROVIDER MUST WRAP THE APP HERE */}
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);