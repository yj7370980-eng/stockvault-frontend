import React from 'react';
import { Card, Typography, Box, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function SalesSummary({ data = { salesAmount: 0, changePercent: 0 } }) {
  const theme = useTheme();
  const isPositive = data.changePercent >= 0;

  // Ensure salesAmount is a number, fallback to 0
  const salesAmountFormatted = (typeof data.salesAmount === 'number') ? data.salesAmount.toLocaleString() : '0';

  return (
    <Card sx={{
      p: 3,
      borderRadius: 3,
      boxShadow: 3,
      textAlign: "center",
      bgcolor: "#fff",
      height: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 150
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, fontSize: 17, letterSpacing: 0.15 }}>
        Monthly Sales
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        ₹ {salesAmountFormatted}
      </Typography>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 0.5,
        color: isPositive ? theme.palette.success.main : theme.palette.error.main,
        fontWeight: 500,
      }}>
        {isPositive
          ? <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
          : <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />}
        <Typography sx={{ fontWeight: 500 }}>
          {Math.abs(data.changePercent)}% {isPositive ? "increase" : "decrease"} from last month
        </Typography>
      </Box>
    </Card>
  );
}
