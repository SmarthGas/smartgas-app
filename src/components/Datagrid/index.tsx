import React from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataGridBoxProps {
  rows: any[];
  columns: GridColDef<any>[];
}

export const DataGridBox = ({ rows, columns }: DataGridBoxProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        backgroundColor: 'transparent',
        width: '100%',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSorting
        sx={{
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none', // Remove a borda de foco
            boxShadow: '0 0 4px 1px #002126',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-cell': {
            borderLeft: 'solid #002126 1px',
            borderRight: 'solid #002126 1px',
          },
          '& .MuiDataGrid-cell:hover': {
            backgroundColor: '#002126',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none', // Remove a borda de foco
            boxShadow: '0 0 4px 2px #002126',
          },
          '--DataGrid-containerBackground': '#002126',
          '--DataGrid-rowBorderColor': '#002126',
          '& .MuiDataGrid-row': {
            color: '#e5e5e5', // cor do texto
          },
          '& .MuiDataGrid-footerContainer': {
            border: 'none',
            backgroundColor: '#002126',
            borderTop: 'solid #002126 1px',
            color: '#e5e5e5',
          },
          '& .MuiDataGrid-iconSeparator': {
            color: '#00272D',
          },

          border: 'solid #8080 1px',
          boxShadow: '0 0 4px 3px #002126',
          fontSize: '12px',
        }}
      />
    </Box>
  );
};
