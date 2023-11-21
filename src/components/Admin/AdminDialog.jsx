// AdminDialog.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { Add } from '@mui/icons-material';

const initialFormData = {
  TestCode: '',
  TestProfileName: '',
  PatientFees: '',
  TestSchedule: '',
  Method: '',
  TestStatus: '',
  ReportedOn: '',
  SrNo: '',
};

const AdminDialog = ({ fetchData }) => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(initialFormData);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const requiredFields = ['TestCode', 'TestProfileName', 'PatientFees'];

  const validateForm = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      axios
        .post('http://localhost:5000/api/healthapi', formData)
        .then(() => {
          fetchData(); // Refresh data after creating a new item
          setCreateDialogOpen(false);
        })
        .catch((error) => {
          console.log('Error creating a new item: ', error);
        });
    }
  };

  return (
    <>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Create
        </Button>
      </Grid>
      <Dialog open={isCreateDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create Row</DialogTitle>
        <DialogContent>
          {/* ... Input fields for the form ... */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" color="primary" className="ml-2">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDialog;
