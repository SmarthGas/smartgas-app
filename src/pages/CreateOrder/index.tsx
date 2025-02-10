import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import api from '../../lib/api';
import { CylinderType } from '../../types/cylinder';
import { DataGridBox } from '../../components/Datagrid';

export const CreateOrder = () => {
  const [cilynderTypes, setCilynderTypes] = useState<any[]>([]);

  const getCilynderTypes = async () => {
    const { data: response } = await api.get<{ data: CylinderType[] }>(
      '/cylindersType'
    );

    console.log('response', response.data);

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

    console.log('cilynders', cilynders);

    setCilynderTypes(cilynders);
  };

  useEffect(() => {
    getCilynderTypes();
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
    },
    {
      field: 'size',
      headerName: 'Tamanho',
      flex: 1,
      headerClassName: 'font-bold text-cream-100',
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

  return (
    <Section title="Criar Pedido" backButton>
      <div>
        <div className="text-cream-100">
          <DataGridBox rows={rows} columns={columns} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button label="Criar Pedido" icon="check" variant="primary" />
      </div>
    </Section>
  );
};
