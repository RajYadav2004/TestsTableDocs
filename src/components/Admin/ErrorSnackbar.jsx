// ErrorSnackbar.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ErrorSnackbar = ({ open, onClose, message }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
