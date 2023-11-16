// ViewModal.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ViewModal = ({ isModalOpen, handleCancel, rowData }) => {
  const isDataEmpty = Object.keys(rowData).length === 0;

  return (
    <Dialog open={isModalOpen} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle style={{ backgroundColor: '#2196F3', color: 'white', textAlign: 'center' }}>
        Test Details
      </DialogTitle>
      <DialogContent>
        <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', marginTop:"15px" }}>
          {isDataEmpty ? (
            <Typography variant="body2" align="center" color="textSecondary" paragraph>
              No data found
            </Typography>
          ) : (
            <Table size='small'>
              <TableBody>
                {renderDetailRow("Test Code:", rowData["Test Code"])}
                {renderDetailRow("Test Name:", rowData["Test / Profile Name"])}
                {renderDetailRow("Patient Fees:", rowData["Patient Fees(Rs.)"])}
                {renderDetailRow("Test Schedule:", rowData["Test Schedule"])}
                {renderDetailRow("Reported On:", rowData["Reported On"])}
                {renderDetailRow("Method:", rowData["Method"])}
                {renderDetailRow("Test Status:", rowData["Test Status"])}
                {/* Add more rows for additional details */}
              </TableBody>
            </Table>
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="contained" style={{ backgroundColor: '#FF5722', color: 'white', borderRadius: '5px' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Helper function to render a detail row with two-column layout
const renderDetailRow = (label, value) => (
  <TableRow key={label}>
    <TableCell style={{width:"10rem"}}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray.800', fontSize: 14
    }}>
        {label}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="subtitle2" sx={{ color: 'black', fontSize: 14 }}>
        {value || 'Not Found'}
      </Typography>
    </TableCell>
  </TableRow>
);

export default ViewModal;
