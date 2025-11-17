import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Login({ onLogin, setProfile }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try { 
      // Replace with your API URL
      const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        // Store token and invoke success handler
        localStorage.setItem('token', data.token);
        if (setProfile && data) {
            setProfile({
                name: data.name,
                email: data.email,
                avatarUrl: data.avatarUrl || '/user.png',
                phone: data.phone || '',
            });
        }

        if (onLogin) onLogin(data); // Parent can handle redirect/auth state
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err){
      console.error('Login error:', err);  
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <Box minHeight="100vh" bgcolor="#f6fafd" display="flex" alignItems="center" justifyContent="center">
      <Card sx={{ p: 4, width: 340, boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
          Login to StockVault
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, height: 40 }}
            disabled={loading}
            aria-label="Login button"
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}
