import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import api from '../../lib/api';
import { CylinderType } from '../../types/cylinder';
import { DataGridBox } from '../../components/Datagrid';
import { useSnackbar } from 'notistack';
import { ModalSelectGasType } from './modalSelectGasType';

export const CreateOrder = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [cilynderTypes, setCilynderTypes] = useState<any[]>([]);

  const [order, setOrder] = useState<any>();

  const [items, setItems] = useState<any[]>([]);

  const getCilynderTypes = async () => {
    const { data: response } = await api.get<{ data: CylinderType[] }>(
      '/cylinder-type'
    );

    const cilynders: any[] = response.data.map((cilynder: any) => {
      return {
        id: cilynder.id,
        name: cilynder.name,
        description: cilynder.description,
        gasType: cilynder.gasType.gasName,
        size: cilynder.size,
        quantity: 1,
      };
    });

    setCilynderTypes(cilynders);
  };

  useEffect(() => {
    getCilynderTypes();
  }, []);

  const [gasTypes, setGastTypes] = useState<any[]>([]);

  const getGasTypes = async () => {
    try {
      const { data } = await api.get<{ data: any[] }>('/gas-type');
      //setGastTypes(data);
    } catch (error) {
      enqueueSnackbar('Erro ao buscar os tipos de gás', { variant: 'error' });
      console.error(error);
    }
  };

  useEffect(() => {
    getGasTypes();
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
    },
    {
      field: 'gasType',
      headerName: 'Tipo de Gás',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      renderCell: (params: any) => {
        return (
          <select
            className="w-full p-2 rounded text-black"
            onChange={(e) => {
              setCilynderTypes((prev) => {
                const newCilynders = [...prev];
                const index = newCilynders.findIndex(
                  (cilynder) => cilynder.id === params.row.id
                );
                newCilynders[index].gasType = e.target.value;
                return newCilynders;
              });
            }}
          >
            {gasTypes?.map((gasType) => (
              <option key={gasType.id} value={gasType.gasName}>
                {gasType.gasName}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      field: 'size',
      headerName: 'Tamanho',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      renderCell: (params: any) => {
        return <select className="w-full p-2 rounded text-black"></select>;
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      renderCell: (params: any) => {
        return (
          <div className="flex gap-3 items-center h-full">
            <Button
              icon="minus"
              onClick={() =>
                setCilynderTypes((prev) => {
                  const newCilynders = [...prev];
                  const index = newCilynders.findIndex(
                    (cilynder) => cilynder.id === params.row.id
                  );
                  if (newCilynders[index].quantity > 0) {
                    newCilynders[index].quantity -= 1;
                  }
                  return newCilynders;
                })
              }
            />
            <input
              type="number"
              className="h-6 rounded p-2 w-20 text-black"
              value={params.row.quantity}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <Button
              icon="plus"
              onClick={() =>
                setCilynderTypes((prev) => {
                  const newCilynders = [...prev];
                  const index = newCilynders.findIndex(
                    (cilynder) => cilynder.id === params.row.id
                  );
                  newCilynders[index].quantity += 1;
                  return newCilynders;
                })
              }
            />
          </div>
        );
      },
    },
  ];

  const rows = cilynderTypes.map((cilynder) => {
    return {
      id: cilynder.id,
      name: cilynder.name,
      description: cilynder.description,
      gasType: cilynder.gasType,
      size: cilynder.size,
      quantity: cilynder.quantity,
    };
  });

  const createOrder = async () => {
    const order = cilynderTypes.map((cilynder) => {
      return {
        id: cilynder.id,
        quantity: cilynder.quantity,
      };
    });


    // try {
    //   await api.post('/order', {
    //     order,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const openAddOrderItemModal = () => {
    setModal({ title: 'Adicionar Item', name: 'add-order-item' });
  };

  return (
    <>
      {modal.name === 'add-order-item' && (
        <ModalSelectGasType
          gasTypes={gasTypes}
          closeModal={() => setModal({ title: '', name: '' })}
          setOrder={setOrder}
        />
      )}
      <Section title="Criar Pedido" backButton>
        <div>
          <div className="flex py-2 justify-end">
            <Button
              label="Adicionar Item"
              icon="plus"
              variant="primary"
              onClick={openAddOrderItemModal}
            />
          </div>
          <div className="text-cream-100">
            <DataGridBox rows={rows} columns={columns} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            label="Criar Pedido"
            icon="check"
            variant="primary"
            onClick={createOrder}
          />
        </div>
      </Section>
    </>
  );
};
