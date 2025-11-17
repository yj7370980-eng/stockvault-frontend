import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setProfile(userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setIsLoggedIn(false);
    }
  };

  // Load user profile if token exists on first app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const handleLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await fetchUserProfile(token);
    }
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfile({
      name: 'User',
      email: 'user@gmail.com',
      avatarUrl: null,
      phone: '',
    });
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  const showSidebar = isLoggedIn && location.pathname === '/';
  const showTopNav =
    isLoggedIn &&
    location.pathname !== '/' &&
    location.pathname !== '/login' &&
    location.pathname !== '/signup';

  if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {showTopNav && <TopNavBar onLogout={handleLogout} />}
      {showSidebar && <Sidebar profile={profile} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} setProfile={setProfile} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} setProfile={setProfile} />} />
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
