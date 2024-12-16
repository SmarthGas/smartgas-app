/* eslint-disable no-unused-vars */
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

export const Suppliers = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);

  const [supplierToEdit, setSupplierToEdit] = useState<SupplierType>();

  const [supplierToDelete, setSupplierToDelete] = useState<SupplierType>();

  const handleEditSupplier = ({ supplierId }: { supplierId: string }) => {
    // setSupplierToEdit(supplier);
    console.log(supplierId);
    setModal({
      title: 'Editar Fornecedor',
      name: 'edit-supplier',
    });
  };

  const handleDeleteSupplier = (supplier: SupplierType) => {
    setSupplierToDelete(supplier);
    setModal({
      title: 'Deletar Fornecedor',
      name: 'delete-supplier',
    });
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
      field: 'address',
      headerName: 'Endereço',
      sortable: false,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
      flex: 2,
    },
    {
      field: 'phone',
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
    // {
    //   field: 'edit',
    //   headerName: 'Editar',
    //   sortable: false,
    //   headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
    //   headerAlign: 'center',
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div className="flex h-full justify-center items-center">
    //       <Button
    //         variant="primary"
    //         icon="edit"
    //         onClick={() => {
    //           handleEditSupplier({
    //             supplierId: String(params.row.id),
    //           });
    //         }}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   field: 'delete',
    //   headerName: 'Deletar',
    //   sortable: false,
    //   width: 160,
    //   headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
    //   headerAlign: 'center',
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div className="flex h-full justify-center items-center">
    //       <Button
    //         variant="delete"
    //         icon="trash"
    //         onClick={() =>
    //           handleDeleteSupplier({
    //             id: String(params.row.id),
    //             name: params.row.name,
    //             email: params.row.email,
    //             cnpj: params.row.cnpj,
    //             complement: params.row.complement,
    //             cep: params.row.cep,
    //             ddd: params.row.ddd,
    //             phone: params.row.phone,
    //             number: params.row.number,
    //             public_place: params.row.public_place,
    //             rolesType: [],
    //           })
    //         }
    //       />
    //     </div>
    //   ),
    // },
  ];

  const rows = suppliers.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    email: supplier.email,
    cnpj: supplier.cnpj,
    //address with cep, public_place, number and complement
    address: `${supplier.zipcode}, ${supplier.street}, ${supplier.streetNumber}, ${supplier.complement}`,
    phone: `(${supplier.ddd}) ${supplier.cellphone}`,
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
            <FormCreateSupplier setSuppliers={setSuppliers} />
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
            {supplierToEdit && <></>}
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
            <></>{' '}
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
