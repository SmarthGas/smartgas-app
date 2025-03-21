import React from 'react';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { ClientPriceType } from '../../types/client';

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
      field: 'cylinderTypeId',
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
    cylinderTypeId: string;
    price: number;
    active: string;
  }[] = clientPrices.map((price: ClientPriceType) => ({
    id: price.id,
    cylinderTypeId: price.cylinderTypeId,
    price: price.price,
    active: price.active,
  }));

  return (
    <>
      <DataGridBox rows={rows} columns={collumns} />;
    </>
  );
};
