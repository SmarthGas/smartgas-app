import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../../components/Section';
import { SupplierType } from '../../types/supplier';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import api from '../../lib/api';

export const Supplier = () => {
  const { supplierId } = useParams();

  const [supplier, setSupplier] = useState<SupplierType>();

  const supplierFieldsEnum: { [key: string]: string } = {
    id: 'ID',
    name: 'Nome',
    email: 'Email',
    cnpj: 'CNPJ',
    street: 'Rua',
    streetNumber: 'Número',
    complement: 'Complemento',
    zipcode: 'CEP',
    ddd: 'DDD',
    cellphone: 'Celular',
  };

  const collumns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'cilynderType',
      headerName: 'Tipo de Cilindro',
      flex: 1, // Tamanho da coluna
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
    },
    {
      field: 'gasType',
      headerName: 'Tipo de Gás',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: 'Preço',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'initialDate',
      headerName: 'Data Inicial',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'finalDate',
      headerName: 'Data Final',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'active',
      headerName: 'Ativo',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
  ];

  const getSupplier = async () => {
    try {
      const { data } = await api.get<SupplierType>(`/supplier/${supplierId}`);
      console.log(data);
      setSupplier({
        id: data.id,
        name: data.name,
        email: data.email,
        cnpj: data.cnpj,
        street: data.street,
        streetNumber: data.streetNumber,
        zipcode: data.zipcode,
        ddd: data.ddd,
        cellphone: data.cellphone,
        complement: data.complement,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSupplier();
  }, []);

  const rows: any[] = [
    {
      id: '1',
      cilynderType: 'P13',
      gasType: 'Nitrogênio',
      price: 'R$ 100,00',
      initialDate: '01/01/2021',
      finalDate: '31/12/2021',
      active: 'Sim',
    },
  ];

  return (
    <Section title="Fornecedor" backButton>
      <div className="flex flex-col gap-10">
        <div className="flex w-full text-cream-100 gap-10 flex-wrap pt-10">
          {supplier &&
            Object.entries(supplier).map(
              ([key, value]) =>
                key &&
                value && (
                  <div key={key} className="flex gap-2">
                    <span className="font-bold text-xs">{`${supplierFieldsEnum[key]}:`}</span>
                    <span className="text-xs">{value}</span>
                  </div>
                )
            )}
        </div>
        <DataGridBox rows={rows} columns={collumns} />
      </div>
    </Section>
  );
};
