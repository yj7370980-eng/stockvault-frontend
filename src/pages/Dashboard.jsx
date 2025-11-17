import React, { useEffect, useState } from 'react';
import { Box, Typography, Card } from '@mui/material';

import DashboardCards from '../components/DashboardCards';
import OrderStatusBar from '../components/OrderStatusBar';
import SalesSummary from '../components/SalesSummary';
import CategoryPieChart from '../components/CategoryPieChart';
import LowStockAlerts from '../components/LowStockAlerts';
import RecentOrders from '../components/RecentOrders';
import InventoryChart from '../components/InventoryChart';
import ExpenseProfitChart from '../components/ExpenseProfitChart';
import TopStoresChart from '../components/TopStoresChart';

import axios from '../api/axiosSetup';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [orderStatus, setOrderStatus] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesSummary, setSalesSummary] = useState({});
  const [stockRatio, setStockRatio] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topStores, setTopStores] = useState([]);
  const [expenseProfit, setExpenseProfit] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          statsRes,
          orderStatusRes,
          lowStockRes,
          recentOrdersRes,
          salesSummaryRes,
          stockRatioRes,
          categoriesRes,
          topStoresRes,
          expenseProfitRes,
        ] = await Promise.all([
          axios.get('/dashboard/stats'),
          axios.get('/dashboard/order-status'),
          axios.get('/dashboard/low-stock'),
          axios.get('/dashboard/recent-orders'),
          axios.get('/dashboard/sales-summary'),
          axios.get('/dashboard/stock-ratio'),
          axios.get('/dashboard/categories'),
          axios.get('/dashboard/top-stores'),
          axios.get('/dashboard/expense-profit'),
        ]);
        setStats(statsRes.data);
        setOrderStatus(orderStatusRes.data);
        setLowStock(lowStockRes.data);
        setRecentOrders(recentOrdersRes.data);
        setSalesSummary(salesSummaryRes.data);
        setStockRatio(stockRatioRes.data);
        setCategories(categoriesRes.data);
        setTopStores(topStoresRes.data);
        setExpenseProfit(expenseProfitRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6fafd', marginLeft: '220px', px: { xs: 1, md: 4 }, py: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Welcome to StockVault!
      </Typography>

      {/* Summary Cards - stacked vertical */}
      <DashboardCards stats={stats} />

      {/* Order Status Bar */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", px: 3, py: 2, mb: 3 }}>
        <OrderStatusBar orderStatus={orderStatus} />
      </Card>

      {/* Total Customers */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, mb: 3 }}>
        <Typography variant="h3" fontWeight={700}>{stats.totalCustomers ?? 0}</Typography>
        <Typography variant="body1" color="text.secondary">Total Customers</Typography>
      </Card>

      {/* Monthly Sales */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", p: 3, mb: 3 }}>
        <SalesSummary data={salesSummary} />
      </Card>

      {/* Stock Ratio Chart */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", p: 3, mb: 3 }}>
        <InventoryChart data={stockRatio} />
      </Card>

      {/* Low Stock Alerts (yellow) */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fffbe9", width: "100%", p: 3, mb: 3 }}>
        <LowStockAlerts products={lowStock} />
      </Card>

      {/* Expenses vs Profit */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", p: 3, mb: 3 }}>
        <ExpenseProfitChart data={expenseProfit} />
      </Card>

      {/* Recent Orders table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", p: 3, mb: 3 }}>
        <RecentOrders orders={recentOrders} />
      </Card>

      {/* Product Categories */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", p: 3, mb: 3 }}>
        <CategoryPieChart categories={categories} />
      </Card>

      {/* Top Stores chart */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#fff", width: "100%", p: 3, mb: 3 }}>
        <TopStoresChart stores={topStores} />
      </Card>
    </Box>
  );
}
