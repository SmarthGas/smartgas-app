import React, { useState } from 'react';
import { Section } from '../../components/Section';
import { DataGridBox } from '../../components/Datagrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export const Orders = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState<any[]>([
    {
      id: 1,
      clientName: 'João',
      status: 'Em andamento',
      total: 100,
      createdAt: '2021-10-10',
    },
    {
      id: 2,
      clientName: 'Maria',
      status: 'Finalizado',
      total: 200,
      createdAt: '2021-10-11',
    },
    {
      id: 3,
      clientName: 'José',
      status: 'Cancelado',
      total: 300,
      createdAt: '2021-10-12',
    },
  ]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'font-bold text-cream-100', // Estilo para cabeçalho
      headerAlign: 'center',
    },
    {
      field: 'clientName',
      headerName: 'Cliente',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Data de Criação',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
      headerAlign: 'center',
    },
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    clientName: order.clientName,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
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
