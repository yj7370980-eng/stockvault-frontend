import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function OrderNotifications({ orders }) {
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const count = orders.filter(o => o.status === 'Pending').length;
    if (count !== newOrderCount && count > 0) {
      setNewOrderCount(count);
      setOpen(true);
    }
  }, [orders, newOrderCount]);

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={() => setOpen(false)} severity="info" sx={{ width: '100%' }}>
        {newOrderCount === 1
          ? `You have 1 pending new order.`
          : `You have ${newOrderCount} pending new orders.`}
      </Alert>
    </Snackbar>
  );
}
