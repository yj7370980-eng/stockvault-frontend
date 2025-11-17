import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Card } from '@mui/material';

export default function ExpenseProfitChart({ data }) {
  return (
    <Card sx={{ width: "100%", height: 250, p: 2.5, pt: 2, bgcolor: "#fff", boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, letterSpacing: 0.2, textAlign: "center", fontSize: 18 }}>
        Expense vs Profit
      </Typography>
      <Box sx={{ width: "100%", height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} dy={6} padding={{ left: 8, right: 8 }} />
            <YAxis fontSize={12} width={30} />
            <Tooltip />
            <Legend verticalAlign="top" iconSize={12} wrapperStyle={{ top: -8, left: 0, fontSize: 13, lineHeight: 1.2 }} />
            <Line type="monotone" dataKey="expense" stroke="#e53e3e" name="Expense" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="profit" stroke="#38a169" name="Profit" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
