import React from 'react';
import { Box, Typography, Card } from '@mui/material';

export default function OrderStatusBar({ orderStatus }) {
  const totalOrders = orderStatus.reduce((total, item) => total + item.count, 0);

  return (
    <Card elevation={0} sx={{ p: 2, bgcolor: "#f7fafd", boxShadow: 0, borderRadius: 3, mb: 1, width: "100%" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, fontSize: 16, letterSpacing: 0.1 }}>
        Order Status Overview
      </Typography>
      <Box sx={{ display: "flex", height: 28, borderRadius: 4, overflow: "hidden", boxShadow: 1 }}>
        {orderStatus.map(({ status, count, color }, index) => {
          const widthPercent = (count / totalOrders) * 100;
          const borderRadius = {
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderBottomLeftRadius: index === 0 ? 8 : 0,
            borderTopRightRadius: index === orderStatus.length - 1 ? 8 : 0,
            borderBottomRightRadius: index === orderStatus.length - 1 ? 8 : 0,
          };
          return (
            <Box key={status} sx={{ width: `${widthPercent}%`, minWidth: 40, bgcolor: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 13, whiteSpace: 'nowrap', ...borderRadius }} title={`${count} orders ${status}`}>
              {status} ({count})
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
