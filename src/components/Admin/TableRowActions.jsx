// components/admin/TableRowActions.jsx
import React from 'react';
import { Button } from '@mui/material';

const TableRowActions = ({ onEdit, onDelete }) => (
  <>
    <Button variant="outlined" color="primary" onClick={onEdit}>
      Edit
    </Button>
    <Button variant="outlined" color="secondary" onClick={onDelete}>
      Delete
    </Button>
  </>
);

export default TableRowActions;
