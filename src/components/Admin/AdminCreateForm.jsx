// components/admin/AdminCreateForm.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const AdminCreateForm = ({ open, onClose, onCreate }) => {
  const initialFormData = {
    SrNo: "",
    TestCode: "",
    TestProfileName: "",
    PatientFees: "",
    TestSchedule: "",
    ReportedOn: "",
    Method: "",
    TestStatus: "",
    // ... other fields
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = () => {
    if (!formData.TestProfileName || !formData.PatientFees) {
      console.error("Validation failed. Required fields are missing.");
      return;
    }

    onCreate(formData);
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <DialogTitle id="form-dialog-title">Create New Record</DialogTitle>
      <DialogContent>
        <TextField
          label="Sr No"
          variant="filled"
          name="SrNo"
          value={formData.SrNo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Test Code"
          variant="filled"
          name="TestCode"
          value={formData.TestCode}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Test Name"
          variant="filled"
          name="TestProfileName"
          value={formData.TestProfileName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Patient Fees"
          variant="filled"
          name="PatientFees"
          value={formData.PatientFees}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Test Schedule"
          variant="filled"
          name="TestSchedule"
          value={formData.TestSchedule}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Reported On"
          variant="filled"
          name="ReportedOn"
          value={formData.ReportedOn}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Method"
          variant="filled"
          name="Method"
          value={formData.Method}
          onChange={handleChange}
          fullWidth
        />
        {/* <TextField
          label="Test Status"
          variant="filled"
          name="TestStatus"
          value={formData.TestStatus}
          onChange={handleChange}
          fullWidth
        /> */}

        <Select
        label="Test Status"
        name="TestStatus"
        value={formData.TestStatus}
        onChange={handleChange}
        fullWidth
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">In Active</MenuItem>

        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminCreateForm;
