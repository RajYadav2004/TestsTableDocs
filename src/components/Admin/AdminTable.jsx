// components/admin/AdminTable.jsx
import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import TableRowActions from './TableRowActions';
import AdminEditForm from './AdminEditForm';


const AdminTable = ({ data, handleEdit, handleDelete }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const openEditDialog = (row) => {
    setSelectedRow(row);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedRow(null);
    setEditDialogOpen(false);
  };

  const updateSelectedRow = (field, value) => {
    setSelectedRow((prevRow) => ({ ...prevRow, [field]: value }));
  };

  const saveEditedRow = () => {
    handleEdit(selectedRow);
    closeEditDialog();
  };

  const columns = [
    { field: 'SrNo', headerName: 'Sr No', width: 90 },
    { field: 'TestCode', headerName: 'Test Code' },
    { field: 'TestProfileName', headerName: 'Test Name', width: 300 },
    { field: 'PatientFees', headerName: 'Patient Fees(Rs.)', width: 150 },
    { field: 'TestSchedule', headerName: 'Test Schedule', width: 150 },
    { field: 'ReportedOn', headerName: 'Reported On', width: 150 },
    { field: 'Method', headerName: 'Method', width: 150 },
    { field: 'TestStatus', headerName: 'TestStatus', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <TableRowActions onEdit={() => openEditDialog(params.row)} onDelete={() => handleDelete(params.row._id)} />
      ),
    },
  ];

  const getRowId = (row) => row._id;

  return (
    <div className='min-h-[400px] w-full'>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        getRowId={getRowId}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
            <AdminEditForm
            selectedRow={selectedRow}
            onClose={closeEditDialog}
            onsave={saveEditedRow}
            />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveEditedRow} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminTable;

// Base this file name you can create components with in your project
// AdminPanel.jsx
// AdminTable.jsx
// AdminEditForm.jsx
// ErrorSnackbar.jsx