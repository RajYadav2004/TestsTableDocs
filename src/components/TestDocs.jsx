import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Button, Modal } from "antd";
import jsonData from "../API/HealthCare-API.json";


// const ViewModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//   <>
//   <Button 
//   type="primary"
//   onClick={showModal}
//   >
//     View
//   </Button>
//   <Modal
//     title="View"
//     visible={isModalOpen}
//     onOk={handleOk}
//     open={showModal}
//     onCancel={handleCancel}
//     footer={[
//       <Button key="back" onClick={handleCancel}>
//         Cancel
//       </Button>
//     ]}>
//       <pre>
//         {jsonData}
//       </pre>

//     </Modal>
//   </>
//   );
// };


const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "Test Code", headerName: "Test Code", width: 150 },
  {
    field: "Test / Profile Name",
    headerName: "Test / Profile Name",
    width: 400,
  },
  { field: "Patient Fees(Rs.)", headerName: "Patient Fees(Rs.)", width: 160 },
  { field: "Test Schedule", headerName: "Test Schedule", width: 180 },
  { field: "Reported On", headerName: "Reported On", width: 150 },
  { field: "Method", headerName: "Method", width: 150 },
  { field: "Test Status", headerName: "Test Status", width: 150 },
  {
    field: "View Data Info",
    headerName: "View Data Info",
    width: 150,
    renderCell: () => {
      
      return (
        
        <>
          <Button type="primary" onClick={true}>
            View
          </Button>
          <Modal
            title="View Data Info"
            open={false}
            onOk={false}
            onCancel={false}
          >
            <div className="bg-sky-300 text-cyan-700 ">
              <div className="p-4">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        Patient Name
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>params.row.Patient_Name</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        Patient ID
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>params.row.Patient_ID</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      );
    },
  },
];

function TestDocs() {
  const [columnsState, setColumnsState] = useState(
    columns.map((column) => ({ ...column, checked: true }))
  );
  const [searchText, setSearchText] = useState("");

  const [filteredData, setFilteredData] = useState(jsonData);

  // eslint-disable-next-line no-unused-vars
  const toggleColumn = (field) => {
    setColumnsState((prevColumnsState) =>
      prevColumnsState.map((column) =>
        column.field === field
          ? { ...column, checked: !column.checked }
          : column
      )
    );
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    const filtered = jsonData.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="container m-auto">
        {/* Header Section */}
        <div className="pt-1 bg-[#d9d9d9]">
          <div className="container mx-auto inline-flex justify-center items-center">
            <a href="/">
              <img
                src="https://i.ibb.co/txwCqmt/flex-2-1.png"
                alt="Metro Diagnostics Center"
                className="h-auto"
              />
            </a>
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
              color="success"
              fullWidth={true}
              placeholder="Search Anything Here"
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
            editMode="row"
            showCellVerticalBorder={true}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TestDocs;
