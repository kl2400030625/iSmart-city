import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Link,
  Alert,
  CircularProgress
} from "@mui/material";
import { validateSignupForm } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const Signup = ({ onSignup, onNavigate }) => {
  const { signup, loading, error: authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
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
    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors({});
    
    // Attempt signup
    const result = await signup({
      fullname: formData.fullname,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      role: formData.role === 'admin' ? 'admin' : 'user'
    });
    
    if (result.success) {
      const userRole = result.user?.role === 'admin' ? 'admin' : 'user';
      if (onSignup) onSignup(userRole);
    } else {
      setSubmitError(result.error || 'Registration failed. Please try again.');
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
          Create Account
        </Typography>
        <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3 }}>
          iSmart City Management Portal
        </Typography>

        {(submitError || authError) && (
          <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
            {submitError || authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullname"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
            }}
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
            }}
          />
          <TextField
            label="Username"
            name="username"
            fullWidth
            variant="outlined"
            margin="dense"
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
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            margin="dense"
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
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
            }}
          />
          <TextField
            select
            label="Select Role"
            name="role"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#334155", borderRadius: 6 },
            }}
          >
            <MenuItem value="citizen">Citizen</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="authority">Authority</MenuItem>
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, color: "#94a3b8" }}>
          Already have an account?{" "}
          <Link 
            component="button" 
            onClick={() => onNavigate('guest')} 
            sx={{ color: "#60a5fa", textDecoration: "none" }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
