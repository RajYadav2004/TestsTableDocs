// components/admin/AdminEditForm.jsx
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import ErrorSnackbar from '../ErrorSnackbar';

const AdminEditForm = ({ selectedRow, onClose, onSave }) => {
  const [editedData, setEditedData] = useState(selectedRow);
  const [errors, setErrors] = useState({});
  const [isErrorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Add validation logic here
    if (!editedData.TestProfileName) {
      newErrors.TestProfileName = 'Test Name is required';
    }

    if (!editedData.PatientFees || isNaN(editedData.PatientFees)) {
      newErrors.PatientFees = 'Valid Patient Fees is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(editedData);
      setErrorSnackbarOpen(false);
      onClose();
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <>
      <TextField
        label="Test Code"
        variant="filled"
        name="TestCode"
        value={editedData.TestCode}
        onChange={handleChange}
        fullWidth
        error={!!errors.TestCode}
        helperText={errors.TestCode}
      />
      <TextField
        label="Test Name"
        variant="filled"
        name="TestProfileName"
        value={editedData.TestProfileName}
        onChange={handleChange}
        fullWidth
        error={!!errors.TestProfileName}
        helperText={errors.TestProfileName}
      />
      <TextField
        label="Patient Fees"
        variant="filled"
        name="PatientFees"
        type="number"
        value={editedData.PatientFees}
        onChange={handleChange}
        fullWidth
        error={!!errors.PatientFees}
        helperText={errors.PatientFees}
      />
      <TextField
        label="Test Schedule"
        variant="filled"
        name="TestSchedule"
        type="text"
        value={editedData.TestSchedule}
        onChange={handleChange}
        fullWidth
        error={!!errors.TestSchedule}
        helperText={errors.TestSchedule}
      />
      <TextField
        label="Reported On"
        variant="filled"
        name="ReportedOn"
        type="text"
        value={editedData.ReportedOn}
        onChange={handleChange}
        fullWidth
        error={!!errors.ReportedOn}
        helperText={errors.ReportedOn}
      />
      <TextField
        label="Method"
        variant="filled"
        name="Method"
        type="text"
        value={editedData.Method}
        onChange={handleChange}
        fullWidth
          error={!!errors.Method}
        helperText={errors.Method}
      />
      <TextField
        label="Test Status"
        variant="filled"
        name="TestStatus"
        type="text"
        value={editedData.TestStatus}
        onChange={handleChange}
        fullWidth
        error={!!errors.TestStatus}
        helperText={errors.TestStatus}
      />
      {/* Add other fields here */}
      <ErrorSnackbar
        open={isErrorSnackbarOpen}
        onClose={handleSnackbarClose}
        message="Validation failed. Please check the form for errors."
      />
    </>
  );
};

export default AdminEditForm;
