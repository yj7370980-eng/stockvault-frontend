import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Reporting from './pages/Reporting';
import Support from './pages/Support';
import Profile from './pages/Profile';

const initialOrders = [/* your orders here */];

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [orders, setOrders] = useState(initialOrders);

  const [profile, setProfile] = useState({
    name: 'User',
    email: 'user@gmail.com',
    avatarUrl: null,
    phone: '',
  });

  // Remove all isLoggedIn and token-related logic

  const showSidebar = location.pathname === '/';
  const showTopNav =
    location.pathname !== '/' &&
    location.pathname !== '/login' && // No longer used, but safe to leave
    location.pathname !== '/signup';   // No longer used, but safe to leave

  return (
    <>
      {showTopNav && <TopNavBar />}
      {showSidebar && <Sidebar profile={profile} />}
      <Routes>
        {/* Removed login and signup routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders orders={orders} setOrders={setOrders} />} />
        <Route path="/reporting" element={<Reporting orders={orders} />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile profile={profile} setProfile={setProfile} />} />
      </Routes>
    </>
  );
}

export default function App() {
  const theme = createTheme({ palette: { mode: 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
