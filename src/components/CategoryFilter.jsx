import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CategoryFilter({ category, onChange, categories }) {
  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
      <InputLabel>Category</InputLabel>
      <Select label="Category" value={category} onChange={onChange}>
        <MenuItem value="">All Categories</MenuItem>
        {categories.map(cat => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
