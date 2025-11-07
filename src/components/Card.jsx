import React from 'react';
import {
    Card as MuiCard,
    CardContent,
    Typography,
    Box
} from '@mui/material';

const Card = ({ title, data, highlightClass = 'data-highlight', children }) => {
    return (
        <MuiCard sx={{ height: '100%' }}>
            <CardContent>
                {title && (
                    <Typography variant="h6" component="h2" gutterBottom>
                        {title}
                    </Typography>
                )}
                {data && (
                    <Box sx={{ 
                        mt: 2,
                        color: 'primary.main',
                        fontWeight: 'medium',
                        fontSize: '1.25rem'
                    }}>
                        <Typography variant="h5" component="p">
                            {data}
                        </Typography>
                    </Box>
                )}
                {children}
            </CardContent>
        </MuiCard>
    );
};

export default Card;
