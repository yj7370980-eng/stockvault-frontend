import axios from './axiosSetup';

export const fetchDashboardStats = () => axios.get('/dashboard/stats');

export const fetchLowStock = () => axios.get('/dashboard/low-stock');

export const fetchOutOfStock = () => axios.get('/dashboard/out-of-stock');

export const fetchOrderStatus = () => axios.get('/dashboard/order-status');

export const fetchRecentOrders = () => axios.get('/dashboard/recent-orders');

export const fetchSalesSummary = () => axios.get('/dashboard/sales-summary');

export const fetchStockRatio = () => axios.get('/dashboard/stock-ratio');

export const fetchCategories = () => axios.get('/dashboard/categories');

export const fetchTopStores = () => axios.get('/dashboard/top-stores');

export const fetchExpenseProfit = () => axios.get('/dashboard/expense-profit');
