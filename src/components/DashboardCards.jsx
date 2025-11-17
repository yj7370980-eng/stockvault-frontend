import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function DashboardCards({ stats }) {
  const data = [
    { label: "Total Products", value: stats.totalProducts || 0, bg: "#eaf3fc", icon: <InventoryIcon />, iconBg: "#3b71ca", textColor: "#29497d" },
    { label: "Orders", value: stats.totalOrders || 0, bg: "#e9faef", icon: <ShoppingCartIcon />, iconBg: "#38a169", textColor: "#25643b" },
    { label: "Total Stock", value: stats.totalStock || 0, bg: "#eaf2fe", icon: <StoreIcon />, iconBg: "#3182ce", textColor: "#27496b" },
    { label: "Out of Stock", value: stats.outOfStock || 0, bg: "#fdecec", icon: <ReportProblemIcon />, iconBg: "#e53e3e", textColor: "#a21010" },
  ];

  return (
    <Grid container direction="column" spacing={3} sx={{ width: "100%", mb: 2 }}>
      {data.map((item) => (
        <Grid item xs={12} key={item.label}>
          <Card sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: 4,
            bgcolor: item.bg,
            minHeight: 110,
            py: 3,
            px: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Centers horizontally
            transition: "box-shadow 0.2s",
            '&:hover': { boxShadow: 8 },
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centers contents vertically
              justifyContent: "center",
              width: "100%", // Fill parent horizontally, needed for grid centering
            }}>
              <Box sx={{
                bgcolor: item.iconBg,
                color: "#fff",
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                mb: 1.5,
              }}>
                {item.icon}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: item.textColor }}>
                {item.value}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.88, fontWeight: 500, fontSize: 17, color: item.textColor }}>
                {item.label}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
