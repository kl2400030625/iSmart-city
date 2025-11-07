import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Link,
} from "@mui/material";

const Signup = ({ onSignup, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Send to backend in a real app
    if (onSignup) onSignup(formData.role || 'user');
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

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullname"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.fullname}
            onChange={handleChange}
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
            Sign Up
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
