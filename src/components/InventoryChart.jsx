import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Box, Card } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F'];

export default function InventoryChart({ data }) {
  return (
    <Card sx={{ width: "100%", height: 210, p: 2.5, pt: 2, bgcolor: "#fff", boxShadow: 3, borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, fontSize: 17, textAlign: 'center', letterSpacing: 0.2 }}>
        Stock Ratio
      </Typography>
      <ResponsiveContainer width="100%" height={130}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={56}
            fill="#8884d8"
            dataKey="value"
            stroke="#fff"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            fontSize={12}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" iconSize={12} wrapperStyle={{ fontSize: 13, margin: 0, padding: 0, lineHeight: 1.2 }} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
