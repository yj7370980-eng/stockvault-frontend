import React, { useState } from 'react';
import {
  TextField, Accordion, AccordionSummary, AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const knowledgeData = [
  {
    category: 'Orders',
    faqs: [
      { q: 'How to create a new order?', a: 'Use the Create New Order button on the orders page.' },
      { q: 'Can I edit an order?', a: 'Yes, click Edit next to the order in the order list.' },
    ],
  },
  {
    category: 'Account',
    faqs: [
      { q: 'How to reset my password?', a: 'Go to Settings > Account and click Reset Password' },
      { q: 'How to update my email?', a: 'In your account settings, you can change your email address.' },
    ],
  },
  {
    category: 'General',
    faqs: [
      { q: 'How to contact support?', a: 'Use the contact form below or email support@stockvault.com' },
    ],
  },
];

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');

  const normalizedSearch = search.toLowerCase();
  const filteredData = knowledgeData
    .map(({ category, faqs }) => ({
      category,
      faqs: faqs.filter(({ q, a }) =>
        q.toLowerCase().includes(normalizedSearch) ||
        a.toLowerCase().includes(normalizedSearch)
      )
    }))
    .filter(({ faqs }) => faqs.length > 0);

  return (
    <>
      <TextField
        fullWidth
        label="Search FAQs & Documentation"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      {filteredData.length === 0 ? <Typography>No results found.</Typography> : filteredData.map(({ category, faqs }) => (
        <div key={category}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{category}</Typography>
          {faqs.map(({ q, a }, i) => (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}
    </>
  );
}
