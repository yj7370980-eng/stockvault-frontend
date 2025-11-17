import React, { useEffect, useState } from 'react';
import { Card, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch real activity data from backend API if exists
    const fetchActivities = async () => {
      try {
        // Example endpoint - adjust per your backend
        const token = localStorage.getItem('token');
        const response = await fetch('/api/products/activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(!response.ok) throw new Error('Failed to fetch recent activities');
        const data = await response.json();
        setActivities(data.activities || []);
        setError('');
      } catch(err) {
        // Fallback static data or error message
        setError(err.message);
        setActivities([
          { id: '1', text: 'Added new product: "Men\'s Leather Wallet"' },
          { id: '2', text: 'Edited product: "Wool Cardigan"' },
          { id: '3', text: 'Deleted product: "Graphic Sweatshirt"' },
        ]);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Card sx={{ p: 2, height: 256 /* 64 in Tailwind */ }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      {error && (
        <Typography color="error" variant="body2" mb={1}>
          {error}
        </Typography>
      )}
      <Box sx={{ maxHeight: '170px', overflowY: 'auto' }}>
        <List dense>
          {activities.length === 0 ? (
            <ListItem><ListItemText primary="No recent activity." /></ListItem>
          ) : (
            activities.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Card>
  );
}
