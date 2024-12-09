import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { FormEditUser } from './formEditUser';
import { User } from '../../types/user';
import { ConfirmDeleteuser } from './confirmDeleteUser';
import { DataGridBox } from '../../components/Datagrid';
import { Section } from '../../components/Section';
import api from '../../lib/api';
import { useSnackbar } from 'notistack';

export const Users = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [users, setUsers] = useState<User[]>([]);

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

  const getUsers = async () => {
    try {
      const { data: response } = await api.get<{
        pagination: any;
        data: User[];
      }>('/user');
      const { data: users } = response;
      console.log(users);

      setUsers(users);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao buscar usuários', { variant: 'error' });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'name',
      headerName: 'Nome',
      editable: true,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      editable: true,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'cep',
      headerName: 'CEP',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'public_place',
      headerName: 'Logradouro',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'number',
      headerName: 'Nº',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'complement',
      headerName: 'Complemento',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'ddd',
      headerName: 'DDD',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
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
                name: params.row.name,
                rolesType: [],
                email: params.row.email,
                cep: params.row.cep,
                cpf: params.row.cpf,
                public_place: params.row.public_place,
                number: params.row.number,
                complement: params.row.complement,
                ddd: params.row.ddd,
                phone: params.row.phone,
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
                name: params.row.name,
                email: params.row.email,
                cpf: params.row.cpf,
                complement: params.row.complement,
                cep: params.row.cep,
                ddd: params.row.ddd,
                phone: params.row.phone,
                number: params.row.number,
                public_place: params.row.public_place,
                rolesType: [],
              })
            }
          />
        </div>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    cep: user.cep,
    public_place: user.public_place,
    number: user.number,
    complement: user.complement,
    ddd: user.ddd,
    phone: user.phone,
  }));

  return (
    <>
      <Section title="Usuários">
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
            {userToEdit && (
              <FormEditUser
                setUsers={setUsers}
                selectedUser={userToEdit}
                setModal={setModal}
              />
            )}
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
        <DataGridBox rows={rows} columns={columns} />
      </Section>
    </>
  );
};
