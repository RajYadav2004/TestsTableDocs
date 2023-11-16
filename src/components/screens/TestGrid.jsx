  // TestGrid.jsx
  import React from "react";
  import { Button } from "@mui/material";
  import { DataGrid, GridToolbar } from "@mui/x-data-grid";

  const TestGrid = ({ filteredData, columnsState, handleViewClick }) => {
    const columnsWithCustomRenderers = columnsState.map((column) => {
      if (column.field === "View Status") {
        return {
          ...column,
          renderCell: (params) => (
            <div style={{ textAlign: "center", margin:"auto" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  borderRadius: "14px",
                  padding: "5px",
                  fontSize: "14px",
                  backgroundColor: "#3f51b5",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                onClick={() => handleViewClick(params)}
              >
                View
              </Button>
            </div>
          ),
        };
      }
      return column;
    });

    return (
      <div className="p-4 h-screen m-2">
        <DataGrid
          rows={filteredData.map((row, index) => ({ ...row, id: index + 1 }))}
          columns={columnsWithCustomRenderers.filter((column) => column.checked)}
          checkboxSelection
          getRowHeight={() => 'auto'}
          editMode="row"
          showCellVerticalBorder={true}
          slots={{
            toolbar:GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          
        />
      </div>
    );
  };

  export default TestGrid;
