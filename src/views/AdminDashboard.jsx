// src/views/AdminDashboard.jsx

import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Card,
    CardContent
} from '@mui/material';
import Header from '../components/Header';

const ADMIN_NAV_ITEMS = [
    { text: 'Dashboard', href: '#admin-dashboard', id: 'admin-dashboard' },
    { text: 'Manage City', href: '#city-management', id: 'city-management' },
    { text: 'Complaints', href: '#complaints', id: 'complaints' },
    { text: 'Feedback', href: '#feedback', id: 'feedback' },
    { text: 'Service Updates', href: '#updates', id: 'updates' },
    { text: 'Logout', href: 'index.html', id: 'logout' },
];

const AdminDashboard = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('admin-dashboard');

    const renderSection = () => {
        switch (activeSection) {
            case 'admin-dashboard':
                return (
                    <Box component="section" id="admin-dashboard" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Admin Control Center
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Total Citizens Registered
                                        </Typography>
                                        <Typography variant="h4" color="primary.main">
                                            12,548
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Active Complaints
                                        </Typography>
                                        <Typography variant="h4" color="warning.main">
                                            56
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Pending
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Average Response Time
                                        </Typography>
                                        <Typography variant="h4" color="success.main">
                                            4.2
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            hours
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            City Zones Monitored
                                        </Typography>
                                        <Typography variant="h4" color="info.main">
                                            18
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Active Zones
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            </Grid>

                            <Box sx={{ mt: 6 }}>
                                <Typography variant="h5" gutterBottom>
                                    Real-Time Infrastructure Health
                                </Typography>
                                <Paper 
                                    sx={{ 
                                        p: 3, 
                                        height: 400, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        bgcolor: 'grey.100'
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        Live Data Chart Placeholder (e.g., Complaint Trends, Energy Usage)
                                    </Typography>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                );

            case 'city-management':
                return (
                    <Box component="section" id="city-management" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Manage City Details
                        </Typography>
                        <Paper sx={{ p: 3 }}>
                            <Box component="form" sx={{ '& .MuiFormControl-root': { mb: 3 } }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="update-type-label">Update Type</InputLabel>
                                            <Select
                                                labelId="update-type-label"
                                                id="update-type"
                                                label="Update Type"
                                                defaultValue=""
                                            >
                                                <MenuItem value="infrastructure">Infrastructure Status</MenuItem>
                                                <MenuItem value="traffic">Traffic Management</MenuItem>
                                                <MenuItem value="water">Water Supply</MenuItem>
                                                <MenuItem value="waste">Waste Disposal</MenuItem>
                                                <MenuItem value="energy">Energy Usage</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            id="zone-id"
                                            label="Target Zone ID"
                                            placeholder="e.g., North Zone"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="update-description"
                                            label="Details / Changes"
                                            multiline
                                            rows={4}
                                            placeholder="Enter city management update..."
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                        >
                                            Save Update
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                );
            
            case 'complaints':
                return (
                    <Box component="section" id="complaints" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Citizen Complaints
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="complaints table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Complaint ID</TableCell>
                                        <TableCell>Citizen Name</TableCell>
                                        <TableCell>Issue Type</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>#1012</TableCell>
                                        <TableCell>Riya Sharma</TableCell>
                                        <TableCell>Streetlight Outage</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label="New" 
                                                color="primary" 
                                                size="small" 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="outlined" 
                                                size="small"
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>#1009</TableCell>
                                        <TableCell>Arjun Patel</TableCell>
                                        <TableCell>Pothole</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label="In Progress" 
                                                color="warning" 
                                                size="small" 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="outlined" 
                                                size="small"
                                                color="primary"
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>#1004</TableCell>
                                        <TableCell>Ananya Rao</TableCell>
                                        <TableCell>Waste Management</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label="Resolved" 
                                                color="success" 
                                                size="small" 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="outlined" 
                                                size="small"
                                                color="secondary"
                                            >
                                                Archive
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                );

            case 'feedback':
                return (
                    <Box component="section" id="feedback" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Citizen Feedback
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="body1" gutterBottom sx={{ 
                                            fontStyle: 'italic',
                                            mb: 2
                                        }}>
                                            "Excellent waste management improvement in Sector 5."
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <Box component="span" sx={{ width: 20, borderTop: '2px solid', borderColor: 'primary.main' }} />
                                            Priya Nair
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="body1" gutterBottom sx={{ 
                                            fontStyle: 'italic',
                                            mb: 2
                                        }}>
                                            "Traffic signals need better synchronization during peak hours."
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <Box component="span" sx={{ width: 20, borderTop: '2px solid', borderColor: 'primary.main' }} />
                                            Sameer Khan
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="body1" gutterBottom sx={{ 
                                            fontStyle: 'italic',
                                            mb: 2
                                        }}>
                                            "Great mobile app integration for city updates!"
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <Box component="span" sx={{ width: 20, borderTop: '2px solid', borderColor: 'primary.main' }} />
                                            Kavita Joshi
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                );

            case 'updates':
                return (
                    <Box component="section" id="updates" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Service Updates
                        </Typography>
                        <Paper sx={{ p: 3, mb: 4 }}>
                            <Box component="form" sx={{ display: 'grid', gap: 3 }}>
                                <TextField
                                    id="service-title"
                                    label="Service Title"
                                    placeholder="e.g., Water Supply Interruption"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="service-duration"
                                    label="Duration / Zone"
                                    placeholder="e.g., 8 AM - 12 PM, Sector 5"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="service-details"
                                    label="Update Details"
                                    placeholder="Write service update details here..."
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    size="large"
                                >
                                    Post Update
                                </Button>
                            </Box>
                        </Paper>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Power Maintenance
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Scheduled maintenance in North Zone from 10 AM – 1 PM.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Water Supply Notice
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Temporary disruption due to pipeline repairs in Sector 3.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Header 
                logoText="iSmartCity Admin" 
                navItems={ADMIN_NAV_ITEMS}
                activeView={activeSection}
                onNavigate={setActiveSection}
                onLogout={onLogout}
            />
            <Container sx={{ py: 4 }}>
                {renderSection()}
            </Container>
        </>
    );
};

export default AdminDashboard;