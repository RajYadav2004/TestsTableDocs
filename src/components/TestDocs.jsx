import { useState } from 'react';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import jsonData from '../API/HealthCare-API.json';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Test Code', headerName: 'Test Code', width: 150 },
  { field: 'Test / Profile Name', headerName: 'Test / Profile Name', width: 400 },
  { field: 'Patient Fees(Rs.)', headerName: 'Patient Fees(Rs.)', width: 160 },
  { field: 'Test Schedule', headerName: 'Test Schedule', width: 180 },
  { field: 'Reported On', headerName: 'Reported On', width: 150 },
  { field: 'Method', headerName: 'Method', width: 150 },
  { field: 'Test Status', headerName: 'Test Status', width: 150 },
];

function TestDocs() {
  // eslint-disable-next-line no-unused-vars
  const [density, setDensity] = useState('standard');
  // eslint-disable-next-line no-unused-vars
  const [fullScreen, setFullScreen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [columnsState, setColumnsState] = useState(columns.map((column) => ({ ...column, checked: true })));
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(jsonData);

  // eslint-disable-next-line no-unused-vars
  const toggleColumn = (field) => {
    setColumnsState((prevColumnsState) =>
      prevColumnsState.map((column) =>
        column.field === field ? { ...column, checked: !column.checked } : column
      )
    );
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    const filtered = jsonData.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className='container m-auto'>
        {/* Header Section */}
        <div className="bg-slate-200 p-4 text-white">
          <div className="container mx-auto flex justify-center items-center">
            <div className='text-sm font-extrabold text-red-600 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'>
              Metro Diagnostics Center
            </div>
          </div>
        </div>

        {/* Search and Toolbar Section */}
        <div className="p-4 space-x-2 bg-gray-100">
          <div className="container mx-auto flex justify-end items-center">
            <TextField
              label="Search"
              size="small"
              variant="outlined"
              value={searchText}
              color='success'
              fullWidth={true}
              placeholder='Search Anything Here'
              onInput={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        {/* DataGrid Section */}
        <div className="p-4 h-screen">
          <DataGrid
            rows={filteredData.map((row, index) => ({ ...row, id: index + 1 }))}
            columns={columnsState.filter((column) => column.checked)}

            checkboxSelection
            showCellVerticalBorder={true}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              }
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            density={density}
            isFullWidth={fullScreen}
          />
        </div>
      </div>
    </>
  );
}

export default TestDocs;
