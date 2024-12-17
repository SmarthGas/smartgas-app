import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { DataGridBox } from '../../components/Datagrid';
import { Section } from '../../components/Section';
import api from '../../lib/api';
import { useSnackbar } from 'notistack';
import { SupplierType } from '../../types/supplier';
import { useNavigate } from 'react-router-dom';
import { FormCreateSupplier } from './formCreateSupplier';
import { ConfirmDeleteSupplier } from './confirmDeleteSupplier';
import { FormEditSupplier } from './formEditSupplier';

export const Suppliers = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);

  const [supplierToEdit, setSupplierToEdit] = useState<SupplierType>();

  const [supplierToDelete, setSupplierToDelete] = useState<string>('');

  const deleteSupplier = async (supplierId: String) => {
    try {
      await api.delete(`/supplier/${supplierId}`);
      setSuppliers((prev) => prev.filter((s) => s.id !== supplierId));
      enqueueSnackbar('Fornecedor deletado com sucesso', {
        variant: 'success',
      });
      setModal({
        title: '',
        name: '',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao deletar fornecedor', { variant: 'error' });
    }
  };

  const getSuppliers = async () => {
    try {
      const { data: response } = await api.get<{
        pagination: any;
        data: SupplierType[];
      }>('/supplier');
      const { data: suppliers } = response;
      console.log(suppliers);

      setSuppliers(suppliers);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao buscar usuários', { variant: 'error' });
    }
  };

  useEffect(() => {
    getSuppliers();
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
      field: 'prices',
      headerName: 'Preços',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
      renderCell: (params) => (
        <div className="flex h-full justify-center items-center">
          <Button
            variant="primary"
            label="Ver preços"
            icon="dollar"
            onClick={() => {
              navigate(`/supplier/${params.row.id}`);
            }}
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
              setSupplierToEdit({
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
                title: 'Editar Fornecedor',
                name: 'edit-supplier',
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
              setSupplierToDelete(params.row.id);
              setModal({
                title: 'Deletar Fornecedor',
                name: 'delete-supplier',
              });
            }}
          />
        </div>
      ),
    },
  ];

  const rows = suppliers.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    email: supplier.email,
    cnpj: supplier.cnpj,
    zipcode: supplier.zipcode,
    street: supplier.street,
    streetNumber: supplier.streetNumber,
    complement: supplier.complement,
    ddd: supplier.ddd,
    cellphone: supplier.cellphone,
  }));

  return (
    <>
      <Section title="Fornecedores">
        {modal.name === 'add-supplier' && (
          <Modal
            title={modal.title}
            closeModal={() =>
              setModal({
                title: '',
                name: '',
              })
            }
          >
            <FormCreateSupplier
              setSuppliers={setSuppliers}
              setModal={setModal}
            />
          </Modal>
        )}
        {modal.name === 'edit-supplier' && (
          <Modal
            title={modal.title}
            closeModal={() =>
              setModal({
                title: '',
                name: '',
              })
            }
          >
            {supplierToEdit && (
              <FormEditSupplier
                setSuppliers={setSuppliers}
                selectedSupplier={supplierToEdit}
                setModal={setModal}
              />
            )}
          </Modal>
        )}
        {modal.name === 'delete-supplier' && (
          <Modal
            title={modal.title}
            closeModal={() =>
              setModal({
                title: '',
                name: '',
              })
            }
          >
            <ConfirmDeleteSupplier
              supplierToDelete={supplierToDelete}
              setModal={setModal}
              deleteSupplier={deleteSupplier}
            />
          </Modal>
        )}
        <div className="flex w-full justify-end">
          <Button
            variant="primary"
            label="Adicionar Fornecedor"
            icon="plus"
            onClick={() => {
              setModal({
                title: 'Adicionar Fornecedor',
                name: 'add-supplier',
              });
            }}
          />
        </div>
        <DataGridBox rows={rows} columns={columns} />
      </Section>
    </>
  );
};
