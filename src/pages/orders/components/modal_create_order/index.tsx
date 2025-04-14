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
import { postOrder } from '../../../../services/requests/order';
import { LendingType } from '../../../../types/lending';

interface ModalCreateOrderProps {
  clients: Array<ClientType>;
  gasTypes: Array<GasType>;
  lendings: Array<LendingType>;
  cylinderControl?: Array<CylinderControlType>;
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  closeModal: () => void;
}

export const ModalCreateOrder = ({
  clients,
  gasTypes,
  lendings,
  cylinderControl,
  setOrders,
  closeModal,
}: ModalCreateOrderProps) => {
  const [selectedClient, setSelectedClient] = useState<ClientType>();
  const [selectedGasType, setGasType] = useState<GasType>();
  const [selectedCylinderSize, setSelectedCylinderSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedLending, setSelectedLending] = useState<LendingType>();

  const [availableCylinderSizes, setAvailableCylinderSizes] = useState<
    number[]
  >([]);

  const getCylinderQuantity = () => {
    const cylindersWithSelectedGasType = cylinderControl?.filter(
      (cylinder) =>
        cylinder.cylinderType.gasTypeId === selectedGasType?.id &&
        cylinder.cylinderStatus === 'stock' &&
        cylinder.cylinderType.size === Number(selectedCylinderSize)
    );
    return cylindersWithSelectedGasType?.length || 0;
  };

  const handlePostOrder = async () => {
    try {
      const cylinderControlIds =
        cylinderControl
          ?.filter(
            (cylinder) =>
              cylinder.cylinderType.gasTypeId === selectedGasType?.id &&
              cylinder.cylinderType.size === Number(selectedCylinderSize) &&
              cylinder.cylinderStatus === 'stock'
          )
          .map((cylinder) => cylinder.id)
          .slice(0, Number(selectedQuantity)) || [];

      const body = {
        clientId: selectedClient?.id || '',
        cylinderControlIds,
        switchType: 'lending',
        clientSignature: 'd662c3b2-0d63-4039-9726-ae1ccccc2206',
        userSignature: 'd5f5ecb3-bf89-4b36-a6f6-3d1a2b1d7681',
      };

      const response = await postOrder({ body });
      if (response && response.order) {
        const { order } = response;
        console.log(order);
        setOrders((prevOrders) => [
          ...prevOrders,
          {
            ...order,
            client: {
              id: selectedClient?.id,
              name: selectedClient?.name,
            },
            lending: {
              id: selectedLending?.id,
              clientId: selectedLending?.clientId,
            },
            cylinderControlIds,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const getAvailableCylinderSize = () => {
    const cylindersWithSelectedGasType = cylinderControl?.filter(
      (cylinder) =>
        cylinder.cylinderType.gasTypeId === selectedGasType?.id &&
        cylinder.cylinderStatus !== 'empty' &&
        selectedLending?.lendingCylinders?.some(
          (lendingCylinder) =>
            lendingCylinder.cylinderControl.cylinderTypeId ===
            cylinder.cylinderTypeId
        )
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
      label: 'Contrato de empréstimo',
      value: selectedLending?.id || '',
      onChange: (value: string) => {
        setSelectedLending(lendings.find((lending) => lending.id === value));
      },
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
      disabled: !selectedLending,
    },
    {
      label: 'Tamanho do Cilindro',
      value: selectedCylinderSize,
      onChange: setSelectedCylinderSize,
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
    //Quantidade de Cilindros
    {
      label: 'Quantidade de Cilindros',
      value: selectedQuantity,
      onChange: setSelectedQuantity,
      placeholder: selectedQuantity || 'Selecione a quantidade de cilindros',
      options: Array.from({ length: getCylinderQuantity() }, (_, i) => ({
        value: (i + 1).toString(),
        label: `${i + 1}`,
      })),
      disabled: !selectedGasType || !selectedCylinderSize,
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
        <Button
          label="Cancelar"
          variant="delete"
          icon="trash"
          onClick={closeModal}
        />
        <Button
          label="Salvar Pedido"
          variant="primary"
          loading={false}
          icon="save"
          onClick={handlePostOrder}
        />
      </div>
    </div>
  );
};
