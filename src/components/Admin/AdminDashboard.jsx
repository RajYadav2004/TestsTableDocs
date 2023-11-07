import React, { useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Page, Text, View, StyleSheet, Document } from '@react-pdf/renderer';
import { CSVLink } from 'react-csv';
import { Button } from '@mantine/core';
import { jsPDF } from 'jspdf'; // or use your library of choice here
import autoTable from 'jspdf-autotable';
import { IconDownload } from '@tabler/icons-react';

const data = require('../../API/HealthCare-API.json');

const AdminDashboard = () => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState([]);

  const handleExportRows = (row) => {
    const doc = new jsPDF();
    const tableData = row.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save('examples.pdf');
  };

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'Sr No',
        header: 'Sr No',
      },
      {
        accessorKey: 'Test Code',
        header: 'Test Code',
      },
      {
        accessorKey: 'Test / Profile Name',
        header: 'Test / Profile Name',
      },
      {
        accessorKey: 'Patient Fees(Rs.)',
        header: 'Patient Fees (Rs.)',
      },
      {
        accessorKey: 'Test Schedule',
        header: 'Test Schedule',
      },
      {
        accessorKey: 'Reported On',
        header: 'Reported On',
      },
      {
        accessorKey: 'Method',
        header: 'Method',
      },
      {
        accessorKey: 'Test Status',
        header: 'Test Status',
      },
    ];
  }, []);

  const handleSort = (accessorKey, ascending) => {
    const sorted = data.slice().sort((a, b) => {
      if (a[accessorKey] < b[accessorKey]) {
        return ascending ? -1 : 1;
      }
      if (a[accessorKey] > b[accessorKey]) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  };

  const filteredData = sortedData.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
    );
  });

  const table = useMantineReactTable({
    columns,
    data: filteredData.length > 0 ? filteredData : data,
    enableRowSelection: true,
    rowVirtualizerProps: { overscan: 8 },
    mantineTableContainerProps: { sx: { maxHeight: '800px' } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
  });

  const PdfDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.pdfTitle}>Test Report</Text>
          <View style={styles.table}>
            {selectedRows.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                {columns.map((column, columnIndex) => (
                  <Text key={columnIndex} style={styles.cell}>
                    {item[column.accessorKey]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    pdfTitle: {
      fontSize: 20,
      marginBottom: 10,
    },
    table: {
      width: '100%',
      border: '1px solid #000',
    },
    tableRow: {
      flexDirection: 'row',
    },
    cell: {
      padding: 5,
      border: '1px solid #000',
      textAlign: 'center',
    },
  });

  const handleSelectRow = (row) => {
    const rowIndex = selectedRows.findIndex((item) => item['Sr No'] === row['Sr No']);
    if (rowIndex === -1) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows([...selectedRows.slice(0, rowIndex), ...selectedRows.slice(rowIndex + 1)]);
    }
  };

  return (
    <div className="p-4">
      <MantineReactTable
        table={table}
        onSort={handleSort}
        className="mb-4"
        rowProps={(row) => ({
          onClick: () => handleSelectRow(row),
          style: {
            backgroundColor: selectedRows.find((selectedRow) => selectedRow['Sr No'] === row['Sr No'])
              ? 'inherit'
              : 'lightblue',
          },
        })}
        columns={[
          ...columns,
          {
            header: 'Select',
            cell: (row) => (
              <input
                type="checkbox"
                checked={selectedRows.some((selectedRow) => selectedRow['Sr No'] === row['Sr No'])}
                onChange={() => handleSelectRow(row)}
              />
            ),
          },
        ]}
      />
      <div className="flex">
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Rows
        </Button>
        <CSVLink
          data={filteredData.length > 0 ? filteredData : data}
          filename="test_data.csv"
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Download CSV
        </CSVLink>
        <input
          type="text"
          placeholder="Search by keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-2 p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
