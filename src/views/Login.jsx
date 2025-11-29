import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Link,
    Alert,
    CircularProgress
} from '@mui/material';
import { validateLoginForm } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const Login = ({ onLogin, onNavigate }) => {
    const { login, loading, error: authError, clearError } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (submitError) setSubmitError('');
        if (authError) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        
        // Validate form
        const validation = validateLoginForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }
        
        setErrors({});
        
        // Attempt login
        const result = await login(formData.username, formData.password);
        
        if (result.success) {
            // Use the role from the authenticated user, or fallback to form selection
            const userRole = result.user?.role === 'admin' ? 'admin' : 'user';
            if (onLogin) onLogin(userRole);
        } else {
            setSubmitError(result.error || 'Login failed. Please try again.');
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

                {(submitError || authError) && (
                    <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
                        {submitError || authError}
                    </Alert>
                )}

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
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
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
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputLabelProps={{ style: { color: "#94a3b8" } }}
                        InputProps={{
                            style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
                        }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Select Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
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

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
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
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
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