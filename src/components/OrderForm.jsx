import React, { useState } from 'react';
import {
  TextField, Button, Box, MenuItem, Typography, IconButton, Divider
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';

const channelOptions = ['Online', 'In-store', 'Wholesale', 'Others'];
const paymentMethods = ['Online', 'COD', 'Card', 'UPI'];

export default function OrderForm({
  initialOrder = {
    customer: '',
    products: [{ name: '', qty: 1, price: 1000 }],
    status: 'Pending',
    channel: 'Online',
    paymentMethod: 'Online',
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: ''
    },
    date: '',
    total: ''
  },
  statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
  onSubmit,
  onCancel
}) {
  const [customer, setCustomer] = useState(initialOrder.customer || '');
  const [products, setProducts] = useState(initialOrder.products);
  const [date, setDate] = useState(initialOrder.date);
  const [total, setTotal] = useState(initialOrder.total || '');
  const [status, setStatus] = useState(initialOrder.status);
  const [channel, setChannel] = useState(initialOrder.channel);
  const [paymentMethod, setPaymentMethod] = useState(initialOrder.paymentMethod);
  const [shippingAddress, setShippingAddress] = useState(initialOrder.shippingAddress);

  const handleProductChange = (idx, field, value) => {
    setProducts(products => {
      const updated = [...products];
      updated[idx][field] = field === 'qty' || field === 'price' ? Number(value) : value;
      return updated;
    });
  };

  const handleAddProduct = () => setProducts([...products, { name: '', qty: 1, price: 1000 }]);
  const handleRemoveProduct = idx => setProducts(products => products.filter((_, i) => i !== idx));
  const handleShippingChange = (field, value) => setShippingAddress({ ...shippingAddress, [field]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      customer,
      products,
      status,
      channel,
      paymentMethod,
      shippingAddress,
      date,
      total
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField label="Customer Name" value={customer} onChange={e => setCustomer(e.target.value)} required />
        <TextField label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
        <TextField select label="Status" value={status} onChange={e => setStatus(e.target.value)}>
          {statusOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </TextField>
        <TextField select label="Channel" value={channel} onChange={e => setChannel(e.target.value)}>
          {channelOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </TextField>
        <TextField select label="Payment Method" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          {paymentMethods.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </TextField>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 1 }}>Shipping Address</Typography>
        <TextField label="Address" value={shippingAddress.address} onChange={e => handleShippingChange('address', e.target.value)} required />
        <TextField label="City" value={shippingAddress.city} onChange={e => handleShippingChange('city', e.target.value)} required />
        <TextField label="Postal Code" value={shippingAddress.postalCode} onChange={e => handleShippingChange('postalCode', e.target.value)} required />
        <TextField label="Country" value={shippingAddress.country} onChange={e => handleShippingChange('country', e.target.value)} required />

        <Divider />
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 1 }}>Products in Order</Typography>

        {products.map((prod, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Product Name" value={prod.name} onChange={e => handleProductChange(i, 'name', e.target.value)} required sx={{ flex: 2 }} />
            <TextField label="Quantity" type="number" value={prod.qty} onChange={e => handleProductChange(i, 'qty', e.target.value)} sx={{ flex: 1 }} required />
            <TextField label="Price (₹)" type="number" value={prod.price} onChange={e => handleProductChange(i, 'price', e.target.value)} sx={{ flex: 1 }} required />
            <IconButton aria-label="delete" onClick={() => handleRemoveProduct(i)} color="error" disabled={products.length === 1}>
              <Delete />
            </IconButton>
          </Box>
        ))}

        <Button type="button" onClick={handleAddProduct} sx={{ width: 180 }}>
          Add Product
        </Button>

        <TextField label="Total Amount (₹)" type="number" value={total} onChange={e => setTotal(e.target.value)} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button type="submit" variant="contained">Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </form>
  );
}
