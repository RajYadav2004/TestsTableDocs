import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  InputAdornment,
  Typography,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'Sr No', headerName: 'Sr No', width: 90 },
  { field: 'Test Code', headerName: 'Test Code', width: 150 },
  { field: 'Test / Profile Name', headerName: 'Test / Profile Name', width: 400 },
  { field: 'Patient Fees(Rs.)', headerName: 'Patient Fees (Rs.)', width: 160 },
  { field: 'Test Schedule', headerName: 'Test Schedule', width: 180 },
  { field: 'Reported On', headerName: 'Reported On', width: 150 },
  { field: 'Method', headerName: 'Method', width: 150 },
  { field: 'Test Status', headerName: 'Test Status', width: 150 },
  { field: 'actions', headerName: 'Actions', width: 150, sortable:false },
];

const initialFormData = {
  'Sr No': '',
  'Test Code': '',
  'Test / Profile Name': '',
  'Patient Fees(Rs.)': '',
  'Test Schedule': '',
  'Reported On': '',
  'Method': '',
  'Test Status': '',
};

function Admin() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [requiredRows, setRequiredRows] = useState([]);
  const [loading, setLoading ]= useState(true);

  useEffect(() => {
    // Load data from an API when the component mounts
    axios
      .get('http://localhost:5000/healthapi') // Replace with your API endpoint
      .then((response) => {
        // Assign a unique id to each row
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1, // You can use a different logic to generate unique IDs
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  const handleOpenCreateDialog = () => {
    setFormData(initialFormData);
    setCreateDialogOpen(true);
    setRequiredRows([...columns]);
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    requiredRows.forEach((column) => {
      if (!formData[column.field]) {
        newErrors[column.field] = `${column.headerName} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      const id = data.length === 0 ? 1 : Math.max(...data.map((row) => row.id)) + 1;
      setData([...data, { id, ...formData }]);
      setCreateDialogOpen(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setData(filtered);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchText}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenCreateDialog}
              >
                Create
              </Button>
            </Grid>
          </Grid>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={data}
              columns={columns.map((column) => ({
                ...column,
                renderCell: (params) => (
                  <div>
                    {params.value}
                  </div>
                ),
              }))}
            />
          )}
        </Paper>
      </Grid>
      <Dialog open={isCreateDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Create Row</DialogTitle>
        <DialogContent>
          {requiredRows.map((column) => (
            <TextField
              key={column.field}
              label={column.headerName}
              value={formData[column.field]}
              onChange={(e) => setFormData({ ...formData, [column.field]: e.target.value })}
              fullWidth
              error={errors[column.field]}
              helperText={errors[column.field] && <Typography variant="caption">{errors[column.field]}</Typography>}
            />
          ))}
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleCreate} variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default Admin;
