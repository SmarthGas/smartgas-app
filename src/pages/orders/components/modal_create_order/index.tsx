import React, { useEffect, useState } from 'react';
import {
  SelectField,
  SelectFieldProps,
} from '../../../../components/SelectField';
import { Button } from '../../../../components/Button';
import { gasNameDictionary } from '../../../../utils/dictionaries/gasType';
import { ClientType } from '../../../../types/client';
import { CylinderControlType } from '../../../../types/cylinderControl';
import { GasType } from '../../../../types/gasType';

interface ModalCreateOrderProps {
  clients: Array<ClientType>;
  gasTypes: Array<GasType>;
  lendings?: Array<{ id: string; name: string; clientId: string }>;
  cylinderControl?: Array<CylinderControlType>;
}

export const ModalCreateOrder = ({
  clients,
  gasTypes,
  lendings,
  cylinderControl,
}: ModalCreateOrderProps) => {
  const [selectedClient, setSelectedClient] = useState<ClientType>();
  const [selectedGasType, setGasType] = useState<GasType>();
  const [cylinderSize, setCylinderSize] = useState('');
  const [contractType, setContractType] = useState('');

  const [availableCylinderSizes, setAvailableCylinderSizes] = useState<
    number[]
  >([]);

  const getAvailableCylinderSize = () => {
    const cylindersWithSelectedGasType = cylinderControl?.filter(
      (cylinder) =>
        cylinder.cylinderType.gasTypeId === selectedGasType?.id &&
        cylinder.cylinderStatus !== 'empty'
    );

    const availableCylinderSizes = cylindersWithSelectedGasType?.map(
      (cylinder) => cylinder.cylinderType.size
    );

    // Remove duplicatas usando Set e retorna como array
    const uniqueSizes = [...new Set(availableCylinderSizes)];

    return uniqueSizes || [];
  };

  useEffect(() => {
    if (selectedGasType) {
      const sizes = getAvailableCylinderSize();
      setAvailableCylinderSizes(sizes);
    }
  }, [selectedGasType, cylinderControl]);

  const fields: SelectFieldProps[] = [
    {
      label: 'Cliente',
      value: selectedClient?.id || '',
      onChange: (value: string) => {
        setSelectedClient(clients.find((client) => client.id === value));
      },
      placeholder: 'Selecione um cliente',
      options: [
        ...clients.map((client) => ({
          value: client.id,
          label: client.name,
        })),
      ],
      disabled: false,
    },
    {
      label: 'Tipos de Gás',
      value: selectedGasType?.id || '',
      onChange: (value: string) => {
        setGasType(gasTypes.find((gas) => gas.id === value));
      },
      placeholder: 'Selecione o tipo de gás',
      options: gasTypes.map((gas) => ({
        value: gas.id,
        label: gasNameDictionary[gas.gasName],
      })),
      disabled: false,
    },
    {
      label: 'Tamanho do Cilindro',
      value: cylinderSize,
      onChange: setCylinderSize,
      placeholder:
        availableCylinderSizes.length > 0 || !selectedGasType
          ? 'Selecione o tamanho do cilindro'
          : 'Nenhum cilindro disponível',
      options: availableCylinderSizes.map((size) => ({
        value: size.toString(),
        label: `${size}m³`,
      })),
      disabled: !selectedGasType || availableCylinderSizes.length === 0,
    },
    {
      label: 'Contrato',
      value: contractType,
      onChange: setContractType,
      placeholder: 'Selecione o tipo de contrato',
      options:
        lendings
          ?.filter((lending) => lending.clientId === selectedClient?.id)
          .map((lending) => ({
            value: lending.id,
            label: lending.id,
          })) ?? [],
      disabled: !selectedClient,
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
          onChange={field.onChange}
          onBlur={() => console.log(`${field.label} blur`)}
          placeholder={field.placeholder}
          disabled={field.disabled}
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
