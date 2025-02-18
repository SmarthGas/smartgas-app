import React from 'react';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { SupplierPriceType } from '../../types/supplier';

interface ClientPricesProps {
  clientId: string;
  clientPrices: any[];
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setSelectedClientPriceIdToDelete: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export const ClientPrices = ({
  clientPrices,
  setModal,
  setSelectedClientPriceIdToDelete,
}: ClientPricesProps) => {
  const collumns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'gasName',
      headerName: 'Tipo de Gás',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'size',
      headerName: 'Tamanho',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'measurementUnit',
      headerName: 'Unidade',
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
      field: 'startDate',
      headerName: 'Data Inicial',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'endDate',
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
    {
      field: 'delete',
      headerName: 'Excluir',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="flex justify-center items-center h-full">
          <Button
            variant="delete"
            icon="trash"
            onClick={() => {
              {
                setSelectedClientPriceIdToDelete(params.row.id);
                setModal({
                  title: 'Excluir Preço',
                  name: 'delete-supplierPrice',
                });
              }
            }}
          />
        </div>
      ),
    },
  ];
  const rows: {
    id: string;
    gasName: string;
    price: number;
    startDate: string;
    endDate: string;
    active: string;
  }[] = clientPrices.map((price: SupplierPriceType) => ({
    id: price.id,
    gasName: price.CylinderType.gasType.gasName,
    size: price.CylinderType.size,

    measurementUnit: price.CylinderType.gasType.measurementUnit,
    price: price.price,
    startDate: price.startDate,
    endDate: price.endDate,
    active: price.active ? 'Sim' : 'Não',
  }));
  return (
    <>
      <DataGridBox rows={rows} columns={collumns} />;
    </>
  );
};
