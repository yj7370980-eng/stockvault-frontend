import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function SignUp({ onSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  if (password !== confirmPassword) {
    return setError('Passwords do not match');
  }

  setLoading(true);

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {  // Fix URL here
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setSuccess('Registration successful! Please log in.');
      // Optionally reset form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      if (onSignUp) onSignUp(); // Notify parent component
    } else {
      setError(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Signup error:', err);
    setError('Network error');
  }

  setLoading(false);
};


  return (
    <Box
      minHeight="100vh"
      bgcolor="#f6fafd"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ p: 4, width: 360, boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
          Create a New Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            aria-label="Full Name"
          />
          <TextField
            label="Email"
            fullWidth
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            aria-label="Email"
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            aria-label="Password"
          />
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            aria-label="Confirm Password"
          />
          {error && (
            <Alert severity="error" sx={{ my: 1 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ my: 1 }}>
              {success}
            </Alert>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ my: 2, height: 40 }}
            disabled={loading}
            aria-label="Sign Up"
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </form>
      </Card>
    </Box>
  );
}
