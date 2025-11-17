import React, { useState, useMemo, useEffect } from 'react';
import {
  Box, Button, Chip, Dialog, DialogContent, DialogTitle, Table, TableHead, TableRow,
  TableCell, TableBody, TablePagination, TextField, Typography, Snackbar, Alert,

} from '@mui/material';
import { saveAs } from 'file-saver';

import OrderForm from '../components/OrderForm';
import OrderNotifications from '../components/OrderNotifications';
import OrderAnalytics from '../components/OrderAnalytics';
import { exportInventoryPdf } from '../utils/exportPdf';
import axios from '../api/axiosSetup';

const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

function statusColor(status) {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Shipped': return 'info';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');
        setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const lowerSearch = searchText.toLowerCase();
    return orders.filter(order => {
      const matchesSearch = (order.customer && order.customer.toLowerCase().includes(lowerSearch)) ||
        (order._id && order._id.toString().includes(lowerSearch)) ||
        (order.orderItems?.[0]?.name && order.orderItems[0].name.toLowerCase().includes(lowerSearch));

      const matchesStartDate = startDate ? new Date(order.createdAt) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(order.createdAt) <= new Date(endDate) : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    });
  }, [orders, searchText, startDate, endDate]);

  const handleCreateSubmit = async (newOrder) => {
  try {
    const orderItems = newOrder.products.map(p => ({
      product: null,
      name: p.name,
      qty: Number(p.qty),
      price: Number(p.price)
    }));

    const itemsPrice = orderItems.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const taxPrice = itemsPrice * 0.1;
    const shippingPrice = 50;
    const totalPrice = newOrder.total ? Number(newOrder.total) : itemsPrice + taxPrice + shippingPrice;

    const orderPayload = {
      orderItems,
      shippingAddress: newOrder.shippingAddress,
      paymentMethod: newOrder.paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: newOrder.status || "Pending",
      createdAt: new Date(newOrder.date),
      customer: newOrder.customer || ''
    };

    console.log('Submitting order payload:', JSON.stringify(orderPayload, null, 2));

    const response = await axios.post('/orders', orderPayload);
    setOrders(prev => [...prev, response.data]);
    setSnackbarMsg("New order created.");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setOpenCreate(false);
  } catch (error) {
    console.error('Failed to create order:', error);
    setSnackbarMsg("Failed to create order.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  }
};

  const exportCSV = () => {
    if (!filteredOrders || !filteredOrders.length) {
      alert("No orders to export.");
      return;
    }
    const header = ['ID', 'Customer', 'Product Name', 'Date', 'Total', 'Status'];
    const rows = filteredOrders.map(o =>
      [o._id, o.customer, o.orderItems?.map(i => i.name).join(", "), o.createdAt, o.totalPrice, o.status]
    );
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, 'orders.csv');
  };

  const exportPDF = () => {
    if (!filteredOrders || filteredOrders.length === 0) {
      alert("No orders to export.");
      return;
    }
    exportInventoryPdf(filteredOrders.map(order => ({
      id: order._id,
      name: order.orderItems?.map(i => i.name).join(", "),
      category: new Date(order.createdAt).toLocaleDateString(),
      price: order.totalPrice,
      stock: order.status,
    })));
  };

  const toggleSelectId = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredOrders.map(order => order._id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 600 }}>Orders</Typography>
      <OrderNotifications orders={orders} />
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Search (customer or product name)"
          size="small"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          sx={{ minWidth: 250 }}
        />
        <TextField
          label="Start Date"
          type="date"
          size="small"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="outlined" onClick={exportCSV}>Export CSV</Button>
        <Button variant="outlined" onClick={exportPDF}>Export PDF</Button>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>Create New Order</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <input
                type="checkbox"
                checked={selectedIds.size === filteredOrders.length && filteredOrders.length > 0}
                ref={el => {
                  if (el) el.indeterminate = selectedIds.size > 0 && selectedIds.size < filteredOrders.length;
                }}
                onChange={handleSelectAll}
                style={{ cursor: 'pointer' }}
              />
            </TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total Amount (₹)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
            <TableRow key={order._id}>
              <TableCell padding="checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.has(order._id)}
                  onChange={() => toggleSelectId(order._id)}
                  style={{ cursor: 'pointer' }}
                />
              </TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.orderItems?.map(i => i.name).join(", ")}</TableCell>
              <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell><Chip label={order.status} color={statusColor(order.status)} size="small" /></TableCell>
              <TableCell><Button size="small">Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent>
          <OrderForm
            statusOptions={statusOptions}
            onSubmit={handleCreateSubmit}
            onCancel={() => setOpenCreate(false)}
          />
        </DialogContent>
      </Dialog>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>Order Analytics Overview</Typography>
        <OrderAnalytics orders={orders} />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
