import React, { useState } from 'react';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { ClientPriceType } from '../../types/client';
import { Input } from '../../components/Input';
import { gasNameDictionary } from '../../utils/dictionaries/gasType';

interface ClientPricesProps {
  clientId: string;
  clientPrices: any[];
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setSelectedCylinderTypeIdToDelete: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export const ClientPrices = ({
  clientPrices,
  setModal,
  setSelectedCylinderTypeIdToDelete,
}: ClientPricesProps) => {
  const collumns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'gasName',
      headerName: 'Gás',
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
                setSelectedCylinderTypeIdToDelete(params.row.id);
                setModal({
                  title: 'Excluir Preço',
                  name: 'delete-client-price',
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
    size: string;
    price: number;
    active: string;
  }[] = clientPrices.map((price: ClientPriceType) => ({
    id: price.cylinderTypeId,
    gasName: gasNameDictionary[price.cylinderType.gasType?.gasName],
    size: `${price.cylinderType.size}m³`,
    price: price.price,
    active: price.active,
  }));

  const [filters, setFilters] = useState({
    active: true,
  });

  const formatedRows = rows
    .filter((row) => {
      return filters.active ? row.active : true;
    })
    .map((row) => {
      return {
        ...row,
        active: row.active ? 'Sim' : 'Não',
        price: `R$ ${Number(row.price).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      };
    });

  return (
    <>
      <div className="flex w-fit items-center justify-center gap-2 ">
        <p className="text-xs">Exibir apenas preços ativos</p>
        <span>
          <Input
            type="checkbox"
            onChange={(e) => {
              setFilters({ active: e.target.checked });
            }}
            checked={filters.active}
          />
        </span>
      </div>
      <DataGridBox rows={formatedRows} columns={collumns} />;
    </>
  );
};
