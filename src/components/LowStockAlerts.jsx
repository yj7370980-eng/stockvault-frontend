import React from 'react';
import { Typography, Box, Card } from '@mui/material';

export default function LowStockAlerts({ products }) {
  return (
    <Card sx={{ width: "100%", p: 2.5, bgcolor: "#fff", boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, fontSize: 17 }}>
        Low Stock Alerts
      </Typography>
      {products?.map(({ name, remaining }, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography>{name}</Typography>
          <Typography color="error" sx={{ fontSize: 14 }}>Remaining: {remaining}</Typography>
        </Box>
      ))}
    </Card>
  );
}
