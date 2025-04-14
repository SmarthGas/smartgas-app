import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import api from '../../services/api';
import { OrderType } from '../../types/order';
import { orderStatusDictionary } from '../../utils/dictionaries/orderStatus';
import { dateFormatter } from '../../utils/dateFormatter';
import { Modal } from '../../components/Modal';
import { ModalCreateOrder } from './components/modal_create_order';
import { getClients } from '../../services/requests/client';
import { ClientType } from '../../types/client';
import { getGasTypes } from '../../services/requests/gasType';
import { GasType } from '../../types/gasType';
import { getLending } from '../../services/requests/lending';
import { getCylinderControl } from '../../services/requests/cylinderControl';
import { CylinderControlType } from '../../types/cylinderControl';

export const Orders = () => {
  const [modal, setModal] = useState({
    name: '',
    title: '',
  });

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [clients, setClients] = useState<ClientType[]>([]);
  const [gasTypes, setGasTypes] = useState<GasType[]>([]);
  const [lendings, setLendings] = useState<any[]>([]);
  const [cylinderControl, setCylinderControl] = useState<CylinderControlType[]>(
    []
  );

  const getOrders = async () => {
    try {
      const { data: response } = await api.get<{
        data: any[];
      }>('/order');

      const { data } = response;
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClients = async () => {
    try {
      const clients = await getClients();
      if (clients) {
        setClients(clients);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGasType = async () => {
    try {
      const gasTypes = await getGasTypes();
      if (gasTypes) {
        setGasTypes(gasTypes);
        console.log(gasTypes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLendings = async () => {
    try {
      const lendings = await getLending();
      if (lendings) {
        console.log(lendings);
        setLendings(lendings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCylinderControl = async () => {
    try {
      const cylinderControl = await getCylinderControl({
        params: {
          cylinderStatus: 'stock',
        },
      });
      if (cylinderControl) {
        console.log(cylinderControl);
      }
      setCylinderControl(cylinderControl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    handleClients();
    handleGasType();
    handleLendings();
    handleCylinderControl();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'clientName',
      headerName: 'Cliente',
      flex: 1,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'orderDate',
      headerName: 'Data do Pedido',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    clientName: order.client.name,
    orderStatus: orderStatusDictionary[order.orderStatus],
    orderDate: dateFormatter(order.orderDate),
  }));

  const openCreateOrderModal = () => {
    setModal({
      name: 'create-order',
      title: 'Criar Pedido',
    });
  };

  return (
    <>
      {modal.name === 'create-order' && (
        <Modal
          title="Novo Pedido"
          subtitle="Preencha os dados abaixo para criar um novo pedido"
          closeModal={() => setModal({ name: '', title: '' })}
        >
          <ModalCreateOrder
            clients={clients}
            gasTypes={gasTypes}
            lendings={lendings}
            cylinderControl={cylinderControl}
            setOrders={setOrders}
            closeModal={() => setModal({ name: '', title: '' })}
          />
        </Modal>
      )}
      <Section title="Pedidos">
        {orders && orders.length > 0 ? (
          <>
            <div className="flex w-full justify-end">
              <Button
                label="Adicionar Pedido"
                icon="plus"
                variant="primary"
                onClick={openCreateOrderModal}
              />
            </div>
            <DataGridBox rows={rows} columns={columns} />
          </>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <h1 className="text-cream-100 text-xl">Nenhum pedido encontrado</h1>
            <Button
              label="Adicionar Pedido"
              icon="plus"
              variant="primary"
              onClick={openCreateOrderModal}
            />
          </div>
        )}
      </Section>
    </>
  );
};
