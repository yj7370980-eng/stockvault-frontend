import React, { StrictMode } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Card } from '@mui/material';

export default function TopStoresChart({ stores }) {
  return (
    <Card sx={{ width: '100%', height: 320, p: 2.5, bgcolor: "#fff", borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, fontSize: 17, letterSpacing: 0.15 }}>
        Top Stores by Sales
      </Typography>
      <Box sx={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stores} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis type="number" fontSize={13} />
            <YAxis dataKey="store" type="category" width={110} fontSize={13} />
            <Bar dataKey="sales" fill="#4f8bc9" barSize={16} radius={[6, 6, 6, 6]} />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
