// components/admin/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import AdminTable from './AdminTable';
// import AdminCreateForm from './AdminCreateForm';
import AdminEditForm from './AdminEditForm'; // Import the new edit form component

const AdminPanel = () => {
  const [data, setData] = useState([]);
//   const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
    setSelectedRow(row);
    setEditFormOpen(true);
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

  const handleSaveEdit = (editedData) => {
    // Logic to save edited data
    console.log('Save edited data:', editedData);
    setEditFormOpen(false);
    fetchData(); // Refresh data after save
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
    setSelectedRow(null);
  };

  const handleEditFormSubmit = (editedData) => {
    // Add logic to submit edited data
    axios
      .put(`http://localhost:5000/api/healthData/${selectedRow._id}`, editedData)
      .then(() => {
        fetchData();
        handleEditFormClose();
      })
      .catch((error) => console.error('Error updating record:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Admin Panel
      </Typography>
      {/* <Button variant="contained" color="primary" onClick={() => setCreateFormOpen(true)}> */}
      <Button variant="contained" color="primary" onClick={() => setEditFormOpen(true)}>
        Create
      </Button>
      <AdminTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      {/* <AdminCreateForm open={isCreateFormOpen} onClose={() => setCreateFormOpen(false)} onCreate={handleCreate} /> */}
      <AdminEditForm
        open={isEditFormOpen}
        onClose={() => setEditFormOpen(false)}
        onSubmit={handleEditFormSubmit}
        selectedRow={selectedRow}
      />
    </Container>
  );
};

export default AdminPanel;
