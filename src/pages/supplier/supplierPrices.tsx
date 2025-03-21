import React from 'react';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { SupplierPriceType } from '../../types/supplier';

interface SupplierPricesProps {
  supplierId: string;
  supplierPrices: any[];
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setSelectedSupplierPriceIdToDelete: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export const SupplierPrices = ({
  supplierPrices,
  setModal,
  setSelectedSupplierPriceIdToDelete,
}: SupplierPricesProps) => {
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
                setSelectedSupplierPriceIdToDelete(params.row.id);
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
  }[] = supplierPrices.map((price: SupplierPriceType) => ({
    id: price.id,
    cylinderTypeId: price.cylinderTypeId,
    price: `R$ ${Number(price.price).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    active: price.active ? 'Sim' : 'Não',
  }));
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <DataGridBox rows={rows} columns={collumns} />;
    </div>
  );
};
