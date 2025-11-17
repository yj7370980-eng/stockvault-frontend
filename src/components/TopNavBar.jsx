import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const pages = [
  { label: 'Dashboard', path: '/' },
  { label: 'Inventory', path: '/products' },
  { label: 'Orders', path: '/orders' },
  { label: 'Reporting', path: '/reporting' },
  { label: 'Support', path: '/support' },
  { label: 'Profile', path: '/profile' }, // Profile link
];

export default function TopNavBar() {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          StockVault
        </Typography>
        <Box>
          {pages.map((page) => (
            <Button
              key={page.path}
              component={Link}
              to={page.path}
              color="inherit"
              sx={{ textDecoration: location.pathname === page.path ? 'underline' : 'none' }}
            >
              {page.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
