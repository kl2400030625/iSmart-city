// src/components/Header.jsx

import React from 'react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Tabs,
    Tab,
    useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const Header = ({ logoText, navItems, activeView, onNavigate, onLogout }) => {
    const { theme, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

    const handleNavChange = (event, newValue) => {
        if (newValue === 'logout') {
            onLogout();
        } else {
            onNavigate(newValue);
        }
    };

    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: { xs: 1, md: 0 }, mr: 4 }}
                >
                    {logoText}
                </Typography>

                <Box sx={{ 
                    display: { xs: isMobile ? 'none' : 'flex', md: 'flex' }, 
                    flexGrow: 1,
                    alignItems: 'center'
                }}>
                    <Tabs
                        value={activeView}
                        onChange={handleNavChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                        sx={{ '& .MuiTab-root': { minWidth: 'auto' } }}
                    >
                        {navItems.filter(item => item.id !== 'logout').map((item) => (
                            <Tab
                                key={item.id}
                                label={item.text}
                                value={item.id}
                                sx={{ color: 'inherit' }}
                            />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        color="inherit"
                        onClick={toggleTheme}
                        sx={{ ml: 1 }}
                    >
                        {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>

                    <Button
                        color="inherit"
                        onClick={onLogout}
                        sx={{ ml: 1 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;