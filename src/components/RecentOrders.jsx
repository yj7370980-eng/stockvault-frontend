import React from 'react';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function RecentOrders({ orders }) {
  return (
    <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: 3, height: "100%", minHeight: 180, bgcolor: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, fontSize: 17, letterSpacing: 0.2 }}>
        Recent Orders
      </Typography>
      <TableContainer sx={{ maxHeight: 140, minHeight: 120 }}>
        <Table size="small" stickyHeader aria-label="recent orders table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 14 }}>Order ID</TableCell>
              <TableCell sx={{ fontSize: 14 }}>Product</TableCell>
              <TableCell sx={{ fontSize: 14 }}>Qty</TableCell>
              <TableCell sx={{ fontSize: 14 }}>Status</TableCell>
              <TableCell sx={{ fontSize: 14 }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(({ orderId, product, quantity, status, date }) => (
              <TableRow key={orderId}>
                <TableCell sx={{ fontSize: 14 }}>{orderId}</TableCell>
                <TableCell sx={{ fontSize: 14 }}>{product}</TableCell>
                <TableCell sx={{ fontSize: 14 }}>{quantity}</TableCell>
                <TableCell sx={{ fontSize: 14 }}>{status}</TableCell>
                <TableCell sx={{ fontSize: 14 }}>{date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
