import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { OrderType } from '../../types/order';
import { orderStatusDictionary } from '../../utils/dictionaries/orderStatus';
import { dateFormatter } from '../../utils/dateFormatter';

export const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderType[]>([]);

  const getOrders = async () => {
    try {
      const { data: response } = await api.get<{
        data: any[];
      }>('/order');

      const { data } = response;

      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
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

  return (
    <Section title="Pedidos">
      <div className="flex w-full justify-end">
        <Button
          label="Adicionar Pedido"
          icon="plus"
          variant="primary"
          onClick={() => navigate('/create-order')}
        />
      </div>
      <DataGridBox rows={rows} columns={columns} />
    </Section>
  );
};
