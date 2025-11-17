import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';

const categories = ["Men's Clothing", "Women's Clothing", "Kid's Wear", "Accessories"];

export default function EditProductForm({ productData, onSubmit, onCancel }) {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: ''
  });

  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  const handleChange = (field) => (e) => {
    setProduct({ ...product, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.category || !product.price || !product.quantity) {
      alert('Please fill all fields.');
      return;
    }
    onSubmit({
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10)
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Edit Product</Typography>
      <TextField
        label="Product Name"
        value={product.name}
        onChange={handleChange('name')}
        required
        fullWidth
      />
      <TextField
        select
        label="Category"
        value={product.category}
        onChange={handleChange('category')}
        required
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Price (₹)"
        type="number"
        value={product.price}
        onChange={handleChange('price')}
        inputProps={{ min: 0 }}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={product.quantity}
        onChange={handleChange('quantity')}
        inputProps={{ min: 0 }}
        required
      />
      <TextField
        label="Image URL"
        value={product.image}
        onChange={handleChange('image')}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button color="error" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">Update Product</Button>
      </Box>
    </Box>
  );
}
