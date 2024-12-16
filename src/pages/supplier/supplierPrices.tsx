import React, { useEffect, useState } from 'react';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import api from '../../lib/api';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { AddCylinderPriceModal } from './addCilynderPriceModal';

interface SupplierPricesProps {
  supplierId: string;
}

export const SupplierPrices = ({ supplierId }: SupplierPricesProps) => {
  const [modal, setModal] = useState({
    title: '',
    name: '',
  });
  const [supplierPrices, setSupplierPrices] = useState<any[]>();

  const [selectedSupplierPriceIdToDelete, setSelectedSupplierPriceIdToDelete] =
    useState<string>();

  const getSupplierPrices = async () => {
    console.log('getSupplierPrices');
    try {
      const { data: response } = await api.get<{
        data: any[];
      }>('/supplierPrice', {
        params: {
          supplierId,
        },
      });

      console.log(response.data);
      const cylinderPrices = response.data.map((cylinderSupplier: any) => ({
        id: cylinderSupplier.id,
        cylinderTypeId: cylinderSupplier.cylinderTypeId,
        price: cylinderSupplier.price,
        startDate: cylinderSupplier.startDate,
        endDate: cylinderSupplier.endDate,
        active: cylinderSupplier.active ? 'Sim' : 'Não',
      }));

      console.log(cylinderPrices);
      setSupplierPrices(cylinderPrices);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSupplierPrice = async (id: string) => {
    try {
      await api.delete(`/supplierPrice/${id}`);
      getSupplierPrices();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSupplierPrices();
  }, []);

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
      {modal.name === 'delete-supplierPrice' && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <h1>Você tem ctz?</h1>
          <Button
            label="Excluir"
            icon="trash"
            variant="delete"
            onClick={() => {
              if (selectedSupplierPriceIdToDelete) {
                deleteSupplierPrice(selectedSupplierPriceIdToDelete);
                setModal({ title: '', name: '' });
              } else {
                setModal({ title: '', name: '' });
              }
            }}
          />
        </Modal>
      )}
      {modal.name === 'add-cilynder-price' && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <AddCylinderPriceModal supplierId={supplierId} setModal={setModal} />
        </Modal>
      )}
      <div className="flex w-full justify-end">
        <Button
          label="Adicionar Cilindro"
          icon="plus"
          variant="primary"
          onClick={() =>
            setModal({
              title: 'Adicionar Preço de Cilindro',
              name: 'add-cilynder-price',
            })
          }
        />
      </div>
      <DataGridBox rows={rows} columns={collumns} />;
    </>
  );
};
