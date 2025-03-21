import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { DataGridBox } from '../../components/Datagrid';
import { Section } from '../../components/Section';
import api from '../../lib/api';
import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';
import { FormCreateClient } from './formCreateClient';
import { ConfirmDeleteClient } from './confirmDeleteClient';
import { FormEditClient } from './formEditClient';
import { ClientType } from '../../types/client';
import { useNavigate } from 'react-router-dom';

export const Clients = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [clients, setClients] = useState<ClientType[]>([]);

  const [clientToEdit, setClientToEdit] = useState<ClientType>();

  const [clientToDelete, setClientToDelete] = useState<string>('');

  const deleteClient = async (clientId: String) => {
    try {
      await api.delete(`/client/${clientId}`);
      setClients((prev) => prev.filter((s) => s.id !== clientId));
      enqueueSnackbar('Cliente deletado com sucesso', {
        variant: 'success',
      });
      setModal({
        title: '',
        name: '',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao deletar cliente', { variant: 'error' });
    }
  };

  const getClients = async () => {
    try {
      const { data: response } = await api.get<{
        pagination: any;
        data: ClientType[];
      }>('/client');
      const { data: clients } = response;

      setClients(clients);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao buscar clientes', { variant: 'error' });
    }
  };

  useEffect(() => {
    getClients();
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
      field: 'cnpj',
      headerName: 'CNPJ',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'zipcode',
      headerName: 'CEP',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'street',
      headerName: 'Logradouro',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'streetNumber',
      headerName: 'Número',
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
      field: 'cellphone',
      headerName: 'Contato',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'see-prices',
      headerName: 'Preços',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
      renderCell: (params) => (
        <div className="flex h-full justify-center items-center">
          <Button
            variant="primary"
            icon="dollar"
            onClick={() => {
              navigate(`/client/${params.row.id}`);
            }}
            label="Ver Preços"
          />
        </div>
      ),
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
              setClientToEdit({
                id: params.row.id,
                name: params.row.name,
                email: params.row.email,
                zipcode: params.row.zipcode,
                cnpj: params.row.cnpj,
                street: params.row.street,
                streetNumber: params.row.streetNumber,
                complement: params.row.complement,
                ddd: params.row.ddd,
                cellphone: params.row.cellphone,
              });
              setModal({
                title: 'Editar Cliente',
                name: 'edit-client',
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
            onClick={() => {
              setClientToDelete(params.row.id);
              setModal({
                title: 'Deletar Cliente',
                name: 'delete-client',
              });
            }}
          />
        </div>
      ),
    },
  ];

  const rows = clients.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    cnpj: client.cnpj,
    zipcode: client.zipcode,
    street: client.street,
    streetNumber: client.streetNumber,
    complement: client.complement,
    ddd: client.ddd,
    cellphone: client.cellphone,
  }));

  return (
    <>
      <Section title="Clientes">
        {modal.name === 'add-client' && (
          <Modal
            title={modal.title}
            closeModal={() =>
              setModal({
                title: '',
                name: '',
              })
            }
          >
            <FormCreateClient setClients={setClients} setModal={setModal} />
          </Modal>
        )}
        {modal.name === 'edit-client' && (
          <Modal
            title={modal.title}
            closeModal={() =>
              setModal({
                title: '',
                name: '',
              })
            }
          >
            {clientToEdit && (
              <FormEditClient
                setClients={setClients}
                selectedClient={clientToEdit}
                setModal={setModal}
              />
            )}
          </Modal>
        )}
        {modal.name === 'delete-client' && (
          <Modal
            title={modal.title}
            closeModal={() =>
              setModal({
                title: '',
                name: '',
              })
            }
          >
            <ConfirmDeleteClient
              clientToDelete={clientToDelete}
              setModal={setModal}
              deleteClient={deleteClient}
            />
          </Modal>
        )}
        <div className="flex w-full justify-end">
          <Button
            variant="primary"
            label="Adicionar Cliente"
            icon="plus"
            onClick={() => {
              setModal({
                title: 'Adicionar Cliente',
                name: 'add-client',
              });
            }}
          />
        </div>
        <DataGridBox rows={rows} columns={columns} />
      </Section>
    </>
  );
};
