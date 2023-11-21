// components/Admin/Admin.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Paper, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AdminTable from './AdminTable';
import AdminCreateForm from './AdminCreateForm';

const Admin = () => {
  const [data, setData] = useState([]);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/healthData')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleEdit = (row) => {
    console.log('Edit record:', row);
    // Add logic for editing
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/healthData/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error('Error deleting record:', error));
  };

  const handleCreate = (newData) => {
    axios
      .post('http://localhost:5000/api/healthData', newData)
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error('Error creating record:', error));
  };

  return (
    <Container>
      <Box mt={3} mb={3}>
        <Typography variant="h4" component="div" gutterBottom>
          Admin Panel
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" component="div">
          Health Data Records
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setCreateFormOpen(true)}
        >
          Create
        </Button>
      </Box>

      <Paper elevation={3}>
        <AdminTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      </Paper>

      <AdminCreateForm open={isCreateFormOpen} onClose={() => setCreateFormOpen(false)} onCreate={handleCreate} />
    </Container>
  );
};

export default Admin;
