// TestsDocs.jsx
import React, { useState } from "react";
import jsonData from "../../API/HealthCare-API.json";
import SearchBar from "./SearchBar";
import TestGrid from "./TestGrid";
import ViewModal from "./ViewModal";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "Test Code", headerName: "Test Code", width: 150 },
  {
    field: "Test / Profile Name",
    headerName: "Test / Profile Name",
    width: 500,
  },
  { field: "Patient Fees(Rs.)", headerName: "Patient Fees(Rs.)", width: 160 },
  { field: "Test Schedule", headerName: "Test Schedule", width: 180 },
  { field: "Reported On", headerName: "Reported On", width: 150 },
  { field: "Method", headerName: "Method", width: 150 },
  { field: "Test Status", headerName: "Test Status", width: 150 },
  {
    field: "View Status",
    headerName: "View Status",
    width: 100,
    renderCell: (params) => {
      const handleViewClick = () => {
        // Handle view button clicks
        console.log("View button clicked", params.row);
        // You can show a modal or update the state to display information
      };
      return (
        <div>
          <Button type="button" onClick={handleViewClick}>
            View
          </Button>
        </div>
      );
    },
  },
];

function TestsDocs() {
  const [columnsState, setColumnsState] = useState(
    columns.map((column) => ({ ...column, checked: true }))
  );
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(jsonData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});

  // const [apiData, setApiData] = useState([]);

  // useEffect(() => {
  //     // Fetch data from the api endpoint
  //     fetch('http://localhost:5000/api/healthapi')
  //         .then(response => response.json())
  //         .then(data => setApiData(data))
  //         .catch(error => console.error('Error fetching data: ', error));
  // }, []);

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

  const handleViewClick = (params) => {
    setSelectedRowData(params.row);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container m-auto">
        {/* Header Section */}
        <div className="pt-1 bg-[#d9d9d9]">
          <div className="container mx-auto flex items-center justify-center">
            <div>
              <img
                src="https://i.ibb.co/Bwk1x6q/flex-2-1.png"
                alt="Metro Diagnostics Center"
              />
            </div>
          </div>
        </div>

        {/* Search and Toolbar Section */}
        <SearchBar searchText={searchText} handleSearch={handleSearch} />

        {/* DataGrid Section  */}
        <TestGrid
          // filteredData={apiData}
          filteredData={filteredData}
          columnsState={columnsState}
          handleViewClick={handleViewClick}
        />

        {/* Modal for Viewing Data Info */}
        <ViewModal
          isModalOpen={isModalOpen}
          handleOk={handleModalOk}
          handleCancel={handleModalCancel}
          rowData={selectedRowData}
        />
      </div>
    </>
  );
}

export default TestsDocs;
