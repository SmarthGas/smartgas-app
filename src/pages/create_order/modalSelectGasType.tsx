import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

interface GasType {
  id: string;
  gasName: keyof typeof gasTypesEnum;
}

interface ModalSelectGasTypeProps {
  gasTypes: GasType[];
  closeModal: () => void;
  setOrder: React.Dispatch<React.SetStateAction<any>>;
}

const gasTypesEnum = {
  oxigenio_medicinal: 'Oxigênio Medicinal',
  oxigenio_industrial: 'Oxigênio Industrial',
  argonio: 'Argônio',
  nitrogenio: 'Nitrogênio',
  helio: 'Hélio',
  argonio_e_dioxido_de_carbono: 'Argônio e Dióxido de Carbono',
  'dioxido_de_carbono(CO2)': 'Dióxido de Carbono (CO2)',
  acetileno: 'Acetileno',
};

export const ModalSelectGasType = ({
  gasTypes,
  closeModal,
  setOrder,
}: ModalSelectGasTypeProps) => {
  const [selectedGasType, setSelectedGasType] = useState('');

  const addItem = () => {
    setOrder((prevOrder: any) => {
      return {
        ...prevOrder,
        items: [
          ...prevOrder.items,
          {
            gasType: selectedGasType,
            quantity: 1,
          },
        ],
      };
    });
    closeModal();
  };
  return (
    <Modal title="Selecione o tipo de gás" closeModal={closeModal}>
      <div className="flex flex-col gap-2">
        <select
          className="border border-gray-300 rounded-md p-2 text-black"
          onChange={(e) => setSelectedGasType(e.target.value)}
        >
          {gasTypes?.map((gasType) => (
            <option key={gasType.id} value={gasType.id}>
              {gasTypesEnum[gasType.gasName]}
            </option>
          ))}
        </select>
      </div>
      <div className="p-4 w-full justify-end flex gap-4">
        <Button label="Adicionar" icon="plus" onClick={addItem} />
      </div>
    </Modal>
  );
};
