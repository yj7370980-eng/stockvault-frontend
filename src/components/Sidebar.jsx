import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link, useLocation } from 'react-router-dom';



const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Inventory', icon: <InventoryIcon />, path: '/products' },
  { label: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { label: 'Reporting', icon: <AssessmentIcon />, path: '/reporting' },
  { label: 'Support', icon: <SupportAgentIcon />, path: '/support' },
  { label: 'Profile', icon: <Avatar sx={{ width: 24, height: 24 }}>P</Avatar>, path: '/profile' },
];

export default function Sidebar({ profile = {}, onLogout}) {
  const location = useLocation();
  // Ensure default values to avoid errors if profile is undefined
  const name = profile.name || "User";
  const email = profile.email || "user@gmail.com";
  const avatarUrl = profile.avatarUrl || "/user.png";

  console.log('Sidebar received profile:', profile);

   return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box', bgcolor: '#203047', color: '#fff' },
      }}
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Avatar sx={{ mx: "auto", mb: 1, width: 54, height: 54 }} src={avatarUrl} />
        <Box fontWeight="bold" fontSize={16}>{name}</Box>
        <Box fontSize={13} color="#DEE1E6">{email}</Box>
      </Box>
        <List>
        {menuItems.map(({ label, icon, path }) => (
          <ListItem
            key={label}
            component={Link}
            to={path}
            selected={location.pathname === path}
            sx={{
              color: "#fff",
              borderLeft: location.pathname === path ? "4px solid #4f8bc9" : "4px solid transparent",
              bgcolor: location.pathname === path ? '#233252' : 'inherit',
              "&:hover": { bgcolor: '#202e43' },
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ textAlign: "center", p: 2, mt: 'auto', mb: 2}}>
        <Button variant="contained" color="error" fullWidth onClick={onLogout}>
          LOGOUT
        </Button>
      </Box>
    </Drawer>
  );
}



  