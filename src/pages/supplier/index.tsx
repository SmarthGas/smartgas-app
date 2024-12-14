import React from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../../components/Section';
import { SupplierType } from '../../types/supplier';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';

export const Supplier = () => {
  const { supplierId } = useParams();

  const supplier: SupplierType = {
    id: supplierId || '1',
    name: 'Fornecedor 1',
    email: 'supplier@email.com',
    cnpj: '123.456.789-00',
    cep: '12345-678',
    public_place: 'Rua das Flores',
    number: '123',
    complement: 'Galpão G',
    ddd: '11',
    phone: '12345-6789',
  };

  const supplierNormalized = {
    name: supplier.name,
    email: supplier.email,
    cnpj: supplier.cnpj,
    address: `${supplier.public_place}, ${supplier.number} - ${supplier.complement}`,
    phone: `(${supplier.ddd}) ${supplier.phone}`,
  };

  const supplierFieldsEnum: { [key: string]: string } = {
    id: 'ID',
    name: 'Nome',
    email: 'Email',
    cnpj: 'CNPJ',
    address: 'Endereço',
    phone: 'Telefone',
  };

  const supplierPrices = [
    {
      cilynderType: 'P13',
      gasType: 'Nitrogênio',
      price: 'R$ 100,00',
      initialDate: '01/01/2021',
      finalDate: '31/12/2021',
      active: true,
    },
  ];

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
    <Section>
      <div className="flex flex-col gap-10">
        <div className="flex w-full text-cream-100 gap-10 flex-wrap pt-10">
          {Object.entries(supplierNormalized).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <span className="font-bold text-xs">{`${supplierFieldsEnum[key]}:`}</span>
              <span className="text-xs">{value}</span>
            </div>
          ))}
        </div>
        <DataGridBox rows={rows} columns={collumns} />
      </div>
    </Section>
  );
};
