import React, { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { 
    Container, 
    Grid, 
    Typography, 
    Box, 
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Card as MuiCard,
    CardContent,
    CardHeader
} from '@mui/material';

const USER_NAV_ITEMS = [
    { text: 'Dashboard', href: '#dashboard', id: 'dashboard' },
    { text: 'Report Issue', href: '#report', id: 'report' },
    { text: 'City Services', href: '#services', id: 'services' },
    { text: 'Mobility', href: '#transit', id: 'transit' },
    { text: 'Profile', href: '#profile', id: 'profile' },
    { text: 'Logout', href: '#', id: 'logout' },
];

const CitizenDashboard = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return (
                    <Box component="section" id="dashboard" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>Welcome, Citizen!</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card title="Real-Time Air Quality" data="AQI: 45 (Good)" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card title="Live Traffic Status" data="Low Congestion" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card title="Next Public Bus" data="Route 5B: 5 mins" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card title="My Reported Issues" data="2 Open | 5 Resolved" />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom>City News & Alerts</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <MuiCard>
                                        <CardContent>
                                            <Typography variant="h6">Scheduled Water Maintenance</Typography>
                                            <Typography color="text.secondary">
                                                Disruption expected in Sector 4 on Friday, 9 AM - 1 PM.
                                            </Typography>
                                        </CardContent>
                                    </MuiCard>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiCard>
                                        <CardContent>
                                            <Typography variant="h6">Community Cleanup Drive</Typography>
                                            <Typography color="text.secondary">
                                                Join us this Saturday at Central Park at 10 AM. Gloves provided!
                                            </Typography>
                                        </CardContent>
                                    </MuiCard>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiCard>
                                        <CardContent>
                                            <Typography variant="h6">Road Closure Alert</Typography>
                                            <Typography color="text.secondary">
                                                Road 101 near the stadium is closed until further notice.
                                            </Typography>
                                        </CardContent>
                                    </MuiCard>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom>Local Traffic & Incident Overview</Typography>
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
                                <Typography variant="body1" color="text.secondary">
                                    Interactive Map/Heatmap Placeholder for Local Incidents
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>
                );
            case 'report':
                return (
                    <Box component="section" id="report" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>Report an Issue or Provide Feedback</Typography>
                        <Paper sx={{ p: 3 }}>
                            <Box component="form" sx={{ '& .MuiFormControl-root': { mb: 3 } }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="issue-type-label">Type of Issue</InputLabel>
                                            <Select
                                                labelId="issue-type-label"
                                                id="issue-type"
                                                label="Type of Issue"
                                                defaultValue=""
                                            >
                                                <MenuItem value="pothole">Pothole</MenuItem>
                                                <MenuItem value="streetlight">Streetlight Outage</MenuItem>
                                                <MenuItem value="waste">Waste Management</MenuItem>
                                                <MenuItem value="safety">Public Safety Concern</MenuItem>
                                                <MenuItem value="feedback">General Feedback</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            id="address-text"
                                            label="Street Address"
                                            placeholder="e.g., 456 Main St"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>Location (drag pin on map)</Typography>
                                        <Paper 
                                            sx={{ 
                                                height: 200, 
                                                bgcolor: 'grey.100',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 2
                                            }}
                                        >
                                            <Typography color="text.secondary">Interactive Map Placeholder</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            placeholder="Provide details..."
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            sx={{ mb: 2 }}
                                        >
                                            Upload Photo
                                            <input
                                                type="file"
                                                hidden
                                                id="upload-photo"
                                                accept="image/*"
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 3 }}>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        color="primary" 
                                        size="large"
                                    >
                                        Submit Report
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                );
            case 'services':
                return (
                    <Box component="section" id="services" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>City Services & Information Hub</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <MuiCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Utility Payments</Typography>
                                        <Typography color="text.secondary">Pay your water and electricity bills online.</Typography>
                                    </CardContent>
                                </MuiCard>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <MuiCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Emergency Contacts</Typography>
                                        <Typography color="text.secondary">Quick access to police, fire, and medical services.</Typography>
                                    </CardContent>
                                </MuiCard>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <MuiCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Permits & Licenses</Typography>
                                        <Typography color="text.secondary">Apply for building permits and business licenses.</Typography>
                                    </CardContent>
                                </MuiCard>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <MuiCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Community Centers</Typography>
                                        <Typography color="text.secondary">Find events and book facilities.</Typography>
                                    </CardContent>
                                </MuiCard>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 'transit':
                return (
                    <Box component="section" id="transit" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>Public Transit & Mobility</Typography>
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
                            <Typography variant="body1" color="text.secondary">
                                Live Transit Map Placeholder
                            </Typography>
                        </Paper>
                    </Box>
                );
            case 'profile':
                return (
                    <Box component="section" id="profile" sx={{ py: 3 }}>
                        <Typography variant="h4" gutterBottom>My Profile</Typography>
                        <Paper sx={{ p: 3, maxWidth: 600 }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <Box component="span" sx={{ fontWeight: 'bold' }}>Name:</Box> Upendra
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    <Box component="span" sx={{ fontWeight: 'bold' }}>Email:</Box> upendra.doe@email.com
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    <Box component="span" sx={{ fontWeight: 'bold' }}>Address:</Box> 123 gandhi nagar, iSmart City
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary">
                                Edit Profile
                            </Button>
                        </Paper>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <>
                <Header
                logoText="iSmartCity"
                navItems={USER_NAV_ITEMS}
                activeView={activeSection}
                onNavigate={setActiveSection}
                onLogout={onLogout}
            />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {renderSection()}
            </Container>
        </>
    );
};

export default CitizenDashboard;
