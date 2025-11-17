import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

export default function Reporting() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState({
    revenueData: [],
    profitData: [],
    customerPurchaseCount: [],
    productSales: [],
    salesChannels: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch reporting summary from backend API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = `/api/reporting/summary?`;
      if (startDate) url += `startDate=${startDate}&`;
      if (endDate) url += `endDate=${endDate}&`;
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        });
        const json = await res.json();
        setData({
          revenueData: json.revenueData || [],
          profitData: json.profitData || [],
          customerPurchaseCount: json.customerPurchaseCount || [],
          productSales: json.productSales || [],
          salesChannels: json.salesChannels || [],
        });
      } catch (err) {
        setData({
          revenueData: [],
          profitData: [],
          customerPurchaseCount: [],
          productSales: [],
          salesChannels: [],
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [startDate, endDate]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporting Dashboard', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Month', 'Revenue (₹)']],
      body: data.revenueData.map(d => [
        d.month || d.date || "",
        Number(d.revenue).toFixed(2)
      ]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 45,
      head: [['Month', 'Estimated Profit (₹)']],
      body: data.profitData.map(d => [
        d.month || d.date || "",
        Number(d.profit).toFixed(2)
      ]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 65,
      head: [['Customer', 'Purchase Count']],
      body: data.customerPurchaseCount.map(d => [
        d.customer || "",
        d.count || 0
      ]),
    });

    doc.save('Report_Dashboard.pdf');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 600 }}>
        Reporting Dashboard
      </Typography>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Start Date"
          type="month"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <TextField
          label="End Date"
          type="month"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <Button variant="outlined" onClick={exportPDF}>
          Export PDF
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box sx={{ width: 400, height: 300 }}>
          <Typography variant="h6" mb={2} align="center">
            Sales Over Time
          </Typography>
          {loading ? (
            <Typography align="center" mt={10}>Loading...</Typography>
          ) : data.revenueData.length === 0 ? (
            <Typography align="center" color="text.secondary" mt={10}>
              No sales data for this period
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>

        <Box sx={{ width: 400, height: 300 }}>
          <Typography variant="h6" mb={2} align="center">
            Estimated Profit Over Time
          </Typography>
          {loading ? (
            <Typography align="center" mt={10}>Loading...</Typography>
          ) : data.profitData.length === 0 ? (
            <Typography align="center" color="text.secondary" mt={10}>
              No profit data for this period
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>

        <Box sx={{ width: 400, height: 300 }}>
          <Typography variant="h6" mb={2} align="center">
            Customer Purchase Frequency
          </Typography>
          {loading ? (
            <Typography align="center" mt={10}>Loading...</Typography>
          ) : data.customerPurchaseCount.length === 0 ? (
            <Typography align="center" color="text.secondary" mt={10}>
              No customer purchase data
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={data.customerPurchaseCount}
                layout="vertical"
                margin={{ left: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="customer" />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Box>

        <Box sx={{ width: 300, height: 300 }}>
          <Typography variant="h6" mb={2} align="center">
            Inventory Turnover (Sold Qty)
          </Typography>
          {loading ? (
            <Typography align="center" mt={10}>Loading...</Typography>
          ) : data.productSales.length === 0 ? (
            <Typography align="center" color="text.secondary" mt={10}>
              No product sales data
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.productSales}
                  dataKey="sold"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.productSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>

        <Box sx={{ width: 300, height: 300 }}>
          <Typography variant="h6" mb={2} align="center">
            Sales Channel Performance
          </Typography>
          {loading ? (
            <Typography align="center" mt={10}>Loading...</Typography>
          ) : data.salesChannels.length === 0 ? (
            <Typography align="center" color="text.secondary" mt={10}>
              No sales channel data
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.salesChannels}
                  dataKey="count"
                  nameKey="channel"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.salesChannels.map((entry, index) => (
                    <Cell key={`cell-ch${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}
