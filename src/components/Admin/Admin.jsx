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
  { field: 'actions', headerName: 'Actions', width: 150, sortable: false },
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
  'Actions': '',
};

function Admin() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [requiredFields, setRequiredFields] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setRequiredFields(columns.map((col) => col.field));
    // setRequiredRows([...columns]);
  };

  const handleOpenEditDialog = (row) => {
    setFormData(row);
    setSelectedRowId(row.id);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
    setErrors({});
    setSelectedRowId(null);
  };

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
      // const id = data.length === 0 ? 1 : Math.max(...data.map((row) => row.id)) + 1;
      // setData([...data, { id, ...formData }]);
      const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      const newData = [...data, { id: newId, ...formData }];
      setData(newData);
      setCreateDialogOpen(false);
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedData = data.map((item) => (item.id === selectedRowId ? formData : item));
      setData(updatedData);
      setEditDialogOpen(false);
    }
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  }

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
    <div className='container mx-auto'>
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
                    <InputAdornment position="end">
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
            // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <div className='flex justify-center items-center h-96'>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={data.map((row) => ({
                ...row,
                actions: (
                  <div className='flex space-x-2'>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={() => handleOpenEditDialog(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )
              }))}
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
          {requiredFields.map((column) => (
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

      <Dialog open={isEditDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {columns.map((col) => (
            <TextField
              key={col.field}
              label={col.headerName}
              value={formData[col.field]}
              onChange={(e) => setFormData({ ...formData, [col.field]: e.target.value })}
              fullWidth
              error={errors[col.field]}
              helperText={errors[col.field] && (
                <Typography variant='caption' className='text-red-500'>
                  {errors[col.field]}
                </Typography>
              )}
            >
            </TextField>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant='contained' color='primary'>Save</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Admin;
