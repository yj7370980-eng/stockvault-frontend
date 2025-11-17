import React from 'react';
import { Box } from '@mui/material';

import DashboardCards from './DashboardCards';
import OrderStatusBar from './OrderStatusBar';
import SalesSummary from './SalesSummary';
import CategoryPieChart from './CategoryPieChart';
import LowStockAlerts from './LowStockAlerts';
import RecentOrders from './RecentOrders';
import InventoryChart from './InventoryChart';
import ExpenseProfitChart from './ExpenseProfitChart';
import TopStoresChart from './TopStoresChart';

export default function ChartPanel({ stats }) {
  return (
    <Box>
      <DashboardCards stats={stats.summary} />
      <OrderStatusBar orderStatus={stats.orderStatus} />
      <SalesSummary data={stats.salesSummary} />
      <CategoryPieChart categories={stats.categories} />
      <LowStockAlerts products={stats.lowStock} />
      <RecentOrders orders={stats.recentOrders} />
      <InventoryChart data={stats.stockRatio} />
      <ExpenseProfitChart data={stats.expenseProfit} />
      <TopStoresChart stores={stats.topStores} />
    </Box>
  );
}
