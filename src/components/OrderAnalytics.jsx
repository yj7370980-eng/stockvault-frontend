import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function OrderAnalytics({ orders }) {
  // Aggregate order count by status
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Aggregate monthly revenue
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const monthlyRevenue = months.map((month, i) => {
    const monthNum = i + 1;
 const total = orders.reduce((sum, o) => {
  // Make sure createdAt exists and is a valid date string or object
  const orderDate = new Date(o.createdAt);
  return (orderDate.getFullYear() === currentYear && (orderDate.getMonth() + 1) === monthNum)
    ? sum + o.totalPrice
    : sum;
}, 0);

    return { month, revenue: total };
  });

  const dataStatus = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Order Status Overview</h3>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={dataStatus} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
