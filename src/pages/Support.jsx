import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Link, Rating, Snackbar, Alert
} from '@mui/material';
import KnowledgeBase from '../components/KnowledgeBase';

export default function Support() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [rating, setRating] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Contact form API submission
  const handleSubmit = async e => {
    e.preventDefault();
    // API integration – replace with your error handling as needed
    try {
      const res = await fetch('/api/support/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setFeedbackMsg('Failed to send message. Please try again.');
        setOpenSnackbar(true);
      }
    } catch {
      setFeedbackMsg('Network error. Please try again.');
      setOpenSnackbar(true);
    }
  };

  // Feedback rating API submission
const handleFeedbackSubmit = async () => {
  if (!rating) {
    setFeedbackMsg('Please provide a rating before submitting.');
    setOpenSnackbar(true);
    return;
  }
  try {
    const res = await fetch('/api/support/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    if (!res.ok) {
      setFeedbackMsg(`Failed to submit feedback: ${data.message || 'Unknown error'}`);
    } else {
      setFeedbackMsg('Thank you for your feedback!');
    }
    setRating(null);
  } catch {
    setFeedbackMsg('Network error. Please try again.');
  }
  setOpenSnackbar(true);
};

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 600 }}>Support Center</Typography>

      <Typography variant="h6" mb={1}>Knowledge Base</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <KnowledgeBase />
      </Paper>

      <Typography variant="h6" mb={1}>Contact Support</Typography>
      {submitted ? (
        <Paper sx={{ p: 3, backgroundColor: '#e6ffe6', mb: 4 }}>
          <Typography variant="body1" color="success.main">
            Thank you, your message has been received. We will get back to you shortly.
          </Typography>
        </Paper>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField label="Message" name="message" multiline rows={4} fullWidth margin="normal" value={formData.message} onChange={handleChange} required />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send Message</Button>
        </form>
      )}

      <Typography variant="h6" mt={6} mb={1}>Support Hotline & Email</Typography>
      <Typography>
        Phone: <Link href="tel:+919699944585" underline="hover">9699944585</Link><br />
        Email: <Link href="mailto:yj7370980@gmail.com" underline="hover">yj7370980@gmail.com</Link><br />
        Office Hours: 9am - 6pm Mon-Fri
      </Typography>


      <Typography variant="h6" mt={6} mb={1}>Feedback & Rating</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Rating
          name="feedback-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
        />
        <Button variant="outlined" onClick={handleFeedbackSubmit}>Submit Feedback</Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="info" sx={{ width: '100%' }}>{feedbackMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
