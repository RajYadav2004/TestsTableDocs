import React from 'react';
import { DataGrid, Button } from '@mui/material';

function DataTable({ data, handleEdit, handleDelete }) {
    const columns = [
        // Define your columns here
        { field: 'Sr No', headerName: 'Sr No', width: 90 },
        { field: 'Test Code', headerName: 'Test Code', width: 150 },
        { field: 'Test / Profile Name', headerName: 'Test / Profile Name', width: 400 },
        { field: 'Patient Fees(Rs.)', headerName: 'Patient Fees (Rs.)', width: 160 },
        { field: 'Test Schedule', headerName: 'Test Schedule', width: 180 },
        { field: 'Reported On', headerName: 'Reported On', width: 150 },
        { field: 'Method', headerName: 'Method', width: 150 },
        { field: 'Test Status', headerName: 'Test Status', width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 150, sortable: false, renderCell: (params) => {
                <div className='flex space-x-2'>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>

                </div>
            }
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
    );
}

export default DataTable;
