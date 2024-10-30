import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { FormEditUser } from './formEditUser';
import { User } from '../../types/user';
import { ConfirmDeleteuser } from './confirmDeleteUser';

export const DataGridTable = () => {
  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [userToEdit, setUserToEdit] = useState<User>();

  const [userToDelete, setUserToDelete] = useState<User>();

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setModal({
      title: 'Editar Usuário',
      name: 'edit-user',
    });
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setModal({
      title: 'Deletar Usuário',
      name: 'delete-user',
    });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'firstName',
      headerName: 'Nome',
      editable: true,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Sobrenome',
      editable: true,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'address',
      headerName: 'Endereço',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <div className="flex h-full justify-center items-center">
          <Button
            variant="primary"
            icon="edit"
            onClick={() => {
              handleEditUser({
                id: String(params.row.id),
                name: params.row.firstName,
                lastName: params.row.lastName,
                email: params.row.email,
                cpf: params.row.cpf,
                address: params.row.address,
              });
            }}
          />
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Deletar',
      sortable: false,
      width: 160,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <div className="flex h-full justify-center items-center">
          <Button
            variant="delete"
            icon="trash"
            onClick={() =>
              handleDeleteUser({
                id: String(params.row.id),
                name: params.row.firstName,
                lastName: params.row.lastName,
                email: params.row.email,
                cpf: params.row.cpf,
                address: params.row.address,
              })
            }
          />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      email: 'JonSnow@winter.com',
      cpf: '123.123.123-12',
      age: 14,
      address: 'Rua dos Bobos, nº 0',
    },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: 'Cersei',
      email: 'Cersei@lannister.com',
      cpf: '123.123.123-12',
      age: 31,
      address: 'Rua dos Bobos, nº 0',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: 'Jaime',
      email: 'jaime@lannister.com',
      cpf: '123.123.123-12',
      age: 31,
      address: 'Rua dos Bobos, nº 0',
    },
  ];

  return (
    <>
      {modal.name === 'edit-user' && (
        <Modal
          title={modal.title}
          closeModal={() =>
            setModal({
              title: '',
              name: '',
            })
          }
        >
          <FormEditUser initialValues={userToEdit} setModal={setModal} />
        </Modal>
      )}
      {modal.name === 'delete-user' && (
        <Modal
          title={modal.title}
          closeModal={() =>
            setModal({
              title: '',
              name: '',
            })
          }
        >
          <ConfirmDeleteuser user={userToDelete} setModal={setModal} />
        </Modal>
      )}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          backgroundColor: 'transparent',
          height: 400,
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
          disableColumnResize
          disableColumnSorting
          sx={{
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none', // Remove a borda de foco
              boxShadow: '0 0 4px 1px #002126',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'transparent',
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

            border: 'solid #8080 1px',
            boxShadow: '0 0 4px 3px #002126',
            fontSize: '12px',
          }}
        />
      </Box>
    </>
  );
};
