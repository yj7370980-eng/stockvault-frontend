import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';

const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600', '#5850aa', '#ff6384'];

export default function CategoryPieChart({ categories }) {
  console.log("Categories prop:", categories);
  const data = categories?.map(cat => ({
    name: cat._id || cat.name || 'Unknown',
    value: cat.count || cat.value || 0,
  })) || [];
   
  console.log("Pie chart data:", data);

  return (
    <Box sx={{ width: '100%', height: 275, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', py: 1.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, textAlign: 'center', fontSize: 18, letterSpacing: 0.2 }}>
        Product Categories
      </Typography>
      <ResponsiveContainer width="99%" height={170}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={68}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
            stroke="#fff"
            fontSize={13}
          >
            {data.map((entry, idx) => (
              <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ width: "100%", mt: 1, display: 'flex', justifyContent: 'center' }}>
        <Legend layout="horizontal" verticalAlign="bottom" align="center" iconSize={12} wrapperStyle={{ fontSize: 13, padding: 0, marginTop: 0, lineHeight: 1, width: "100%" }} />
      </Box>
    </Box>
  );
}
