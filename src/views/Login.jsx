import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Box,
    Link,
    Alert
} from '@mui/material';

// Demo credentials - In production, use proper backend authentication
// User (Citizen): username: 'user', password: 'user123'
// Admin (Administrator): username: 'admin', password: 'admin123'
const CREDENTIALS = {
    user: { username: 'user', password: 'user123' },
    admin: { username: 'admin', password: 'admin123' }
};

const Login = ({ onLogin, onNavigate }) => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        const role = formData.get('role-selector');

        // Validate credentials based on selected role
        const expectedCredentials = CREDENTIALS[role];
        if (expectedCredentials && 
            username === expectedCredentials.username && 
            password === expectedCredentials.password) {
            setError('');
            if (onLogin) onLogin(role);
        } else {
            setError('Invalid username or password for the selected role');
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    p: 5,
                    borderRadius: 3,
                    width: 400,
                    backgroundColor: "#1e293b",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" sx={{ color: "#fff", mb: 1 }}>
                    Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3 }}>
                    iSmart City Management Portal
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        variant="outlined"
                        margin="dense"
                        autoComplete="username"
                        autoFocus
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        InputProps={{
                            style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
                        }}
                    />
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        variant="outlined"
                        margin="dense"
                        autoComplete="current-password"
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        InputProps={{
                            style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
                        }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Select Role"
                        name="role-selector"
                        defaultValue="user"
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        InputProps={{
                            style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
                        }}
                    >
                        <MenuItem value="user">Citizen</MenuItem>
                        <MenuItem value="admin">Administrator</MenuItem>
                    </TextField>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.2,
                            backgroundColor: "#2563eb",
                            "&:hover": { backgroundColor: "#1d4ed8" },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Login
                    </Button>

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                            Don't have an account?{" "}
                            <Link
                                component="button"
                                onClick={() => onNavigate('signup')}
                                sx={{ color: "#60a5fa", textDecoration: "none" }}
                            >
                                Sign up here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;