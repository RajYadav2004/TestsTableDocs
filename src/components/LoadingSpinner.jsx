import React from 'react';
import { CircularProgress, Paper } from '@mui/material';

function LoadingSpinner() {
  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <div className="flex justify-center items-center h-96">
        <CircularProgress />
      </div>
    </Paper>
  );
}

export default LoadingSpinner;
