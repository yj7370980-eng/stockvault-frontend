import React, { useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, 
  TextField, Button, Dialog, DialogTitle, DialogContent
} from '@mui/material';

// Sample customer data
const initialCustomers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "1234567890" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "0987654321" },
];

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);

  // Placeholder for customer add/edit dialogs or features

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Customers</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(cust => (
            <TableRow key={cust.id}>
              <TableCell>{cust.id}</TableCell>
              <TableCell>{cust.name}</TableCell>
              <TableCell>{cust.email}</TableCell>
              <TableCell>{cust.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
