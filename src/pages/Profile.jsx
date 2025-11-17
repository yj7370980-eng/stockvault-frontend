import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function Profile({ profile, setProfile }) {
  const [tempAvatar, setTempAvatar] = useState(null);

  useEffect(() => {
    // Cleanup URL object when component unmounts or tempAvatar changes
    return () => {
      if (tempAvatar) {
        URL.revokeObjectURL(tempAvatar);
      }
    };
  }, [tempAvatar]);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setTempAvatar(fileUrl);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          avatarUrl: tempAvatar || profile.avatarUrl,
        }),
      });
      if (!response.ok) throw new Error('Failed to save profile');
      const data = await response.json();
      setProfile(data);
      setTempAvatar(null);
      alert('Profile saved!');
    } catch (error) {
      console.error(error);
      alert('Failed to save profile');
    }
  };

  const handleReset = () => {
    setProfile({
      name: 'Nirmal Kumar P',
      email: 'nirmalkumar.b01@gmail.com',
      avatarUrl: null,
      phone: '',
      address: '',
    });
    setTempAvatar(null);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: 600 }}>
        User Profile
      </Typography>

      <Box sx={{ mb: 3, position: 'relative' }}>
        <Avatar
          src={tempAvatar || profile.avatarUrl || '/user.png'}
          alt={`${profile.name || 'User'} avatar`}
          sx={{ width: 100, height: 100 }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
          <PhotoCamera />
        </IconButton>
      </Box>

      <TextField
        label="Name"
        value={profile.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        type="email"
        value={profile.email}
        onChange={(e) => handleChange('email', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        value={profile.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      <TextField
        label="Address"
        value={profile.address || ''}
        onChange={(e) => handleChange('address', e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={handleSave} aria-label="Save profile">
          Save
        </Button>
        <Button variant="outlined" onClick={handleReset} aria-label="Reset profile">
          Reset
        </Button>
      </Box>
    </Box>
  );
}
