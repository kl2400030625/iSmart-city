// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import Login from './views/Login';
import Signup from './views/Signup';
import AdminDashboard from './views/AdminDashboard';
import CitizenDashboard from './views/CitizenDashboard';

function App() {
    // derive initial view from the current pathname so pages like /signup work directly
    const getViewFromPath = (path) => {
        if (!path) return 'guest';
        const p = path.replace(/\/$/, '');
        if (p === '/signup') return 'signup';
        if (p === '/admin') return 'admin';
        if (p === '/user') return 'user';
        return 'guest';
    };

    const [view, setView] = useState(() => getViewFromPath(window.location.pathname));

    // navigation helper: update view state and push history entry
    const handleNavigate = (nextView) => {
        let path = '/';
        if (nextView === 'signup') path = '/signup';
        else if (nextView === 'admin') path = '/admin';
        else if (nextView === 'user') path = '/user';
        else if (nextView === 'guest') path = '/login';
        else path = '/';

        // avoid duplicate entries
        if (window.location.pathname !== path) {
            window.history.pushState({ view: nextView }, '', path);
        }
        setView(nextView);
    };

    const handleLogout = () => {
        handleNavigate('guest');
    };

    const renderView = () => {
        switch (view) {
            case 'admin':
                return <AdminDashboard onLogout={handleLogout} />;
            case 'user':
                return <CitizenDashboard onLogout={handleLogout} />;
            case 'signup':
                return <Signup onSignup={(role) => handleNavigate(role)} onNavigate={handleNavigate} />;
            case 'guest':
            default:
                return <Login onLogin={(role) => handleNavigate(role)} onNavigate={handleNavigate} />;
        }
    };

    // respond to back/forward browser navigation
    useEffect(() => {
        const onPop = () => {
            setView(getViewFromPath(window.location.pathname));
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    return (
        <ThemeProvider>
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}>
                <CssBaseline />
                {renderView()}
            </Box>
        </ThemeProvider>
    );
}

export default App;