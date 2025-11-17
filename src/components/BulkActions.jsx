import React from 'react';
import { Button, Box } from '@mui/material';

export default function BulkActions({ selectedCount, onDelete, onExport }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      {selectedCount > 0 && (
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete {selectedCount} Selected
        </Button>
      )}
      <Button variant="outlined" onClick={onExport}>
        Export CSV
      </Button>
    </Box>
  );
}
