import React from 'react';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';

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
      headerName: 'ID Tipo de Cilindro',
      flex: 1, // Tamanho da coluna
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
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
  const rows: any[] = supplierPrices || [];
  return (
    <>
      <DataGridBox rows={rows} columns={collumns} />;
    </>
  );
};
