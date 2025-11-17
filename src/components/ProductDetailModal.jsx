import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';

export default function ProductDetailModal({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <img src={product.image || '/placeholder.png'} alt={product.name} width={200} style={{ borderRadius: 8 }} />
          <Typography variant="body1"><b>Category:</b> {product.category}</Typography>
          <Typography variant="body1"><b>Price:</b> ₹{product.price}</Typography>
          <Typography variant="body1"><b>Quantity:</b> {product.quantity}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Detailed product description or specifications can be shown here.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
