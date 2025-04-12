import React, { useState } from 'react';
import { SelectField } from '../../../../components/SelectField';
import { Button } from '../../../../components/Button';

export const ModalCreateOrder = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [gasType, setGasType] = useState('');
  const [cylinderSize, setCylinderSize] = useState('');
  const [contractType, setContractType] = useState('');

  const fields = [
    {
      label: 'Cliente',
      value: selectedClient,
      setValue: setSelectedClient,
      placeholder: 'Selecione um cliente',
      options: [
        { value: '1', label: 'Cliente 1' },
        { value: '2', label: 'Cliente 2' },
        { value: '3', label: 'Cliente 3' },
      ],
    },
    {
      label: 'Tipos de Gás',
      value: gasType,
      setValue: setGasType,
      placeholder: 'Selecione o tipo de gás',
      options: [
        { value: 'gpl', label: 'Gás GLP' },
        { value: 'gnv', label: 'Gás Natural (GNV)' },
        { value: 'co2', label: 'Dióxido de Carbono (CO₂)' },
      ],
    },
    {
      label: 'Tamanho do Cilindro',
      value: cylinderSize,
      setValue: setCylinderSize,
      placeholder: 'Selecione o tamanho do cilindro',
      options: [
        { value: '5kg', label: '5 kg' },
        { value: '13kg', label: '13 kg' },
        { value: '45kg', label: '45 kg' },
      ],
    },
    {
      label: 'Contrato',
      value: contractType,
      setValue: setContractType,
      placeholder: 'Selecione o tipo de contrato',
      options: [
        { value: 'mensal', label: 'Mensal' },
        { value: 'trimestral', label: 'Trimestral' },
        { value: 'anual', label: 'Anual' },
      ],
    },
  ];

  return (
    <div className="w-[500px] flex flex-col gap-4">
      {fields.map((field) => (
        <SelectField
          key={field.label}
          label={field.label}
          options={field.options}
          value={field.value}
          onChange={field.setValue}
          onBlur={() => console.log(`${field.label} blur`)}
          placeholder={field.placeholder}
        />
      ))}
      <div className="flex justify-end gap-4">
        <Button label="Cancelar" variant="delete" icon="trash" />
        <Button
          label="Salvar Pedido"
          variant="primary"
          loading={false}
          icon="save"
        />
      </div>
    </div>
  );
};
