import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function DialogForm({ isOpen, onClose, formData, setFormData, errors, onSubmit, title }) {
  const requiredFields = [
    // Define your required fields here
    { field: 'Sr No', headerName: 'Sr No', width: 90 },
        { field: 'Test Code', headerName: 'Test Code', width: 150 },
        { field: 'Test / Profile Name', headerName: 'Test / Profile Name', width: 400 },
        { field: 'Patient Fees(Rs.)', headerName: 'Patient Fees (Rs.)', width: 160 },
        { field: 'Test Schedule', headerName: 'Test Schedule', width: 180 },
        { field: 'Reported On', headerName: 'Reported On', width: 150 },
        { field: 'Method', headerName: 'Method', width: 150 },
        { field: 'Test Status', headerName: 'Test Status', width: 150 },
  ];

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    // Implement your form validation logic here
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field.field]) {
        newErrors[field.field] = `${field.headerName} is required`;
      }
    });
    return newErrors;
  };

  const errorsForFields = validateForm();

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {requiredFields.map((field) => (
          <TextField
            key={field.field}
            label={field.headerName}
            value={formData[field.field]}
            onChange={(e) => handleFieldChange(field.field, e.target.value)}
            fullWidth
            error={errors[field.field]}
            helperText={errorsForFields[field.field] && (
              <span className="error-text">{errorsForFields[field.field]}</span>
            )}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          {title}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
