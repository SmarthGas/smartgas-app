import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { useSnackbar } from 'notistack';
import api from '../../lib/api';
import { Button } from '../../components/Button';
import { CylinderType } from '../../types/cylinder';
import { ClientPriceType } from '../../types/client';

interface ClientAddCylinderProps {
  clientId: string;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setClientPrices: React.Dispatch<React.SetStateAction<ClientPriceType[]>>;
}

export const ClientAddCylinderPriceModal = ({
  clientId,
  setModal,

  setClientPrices,
}: ClientAddCylinderProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [cylinders, setCyllinders] = useState<any[]>([]);

  const [selectedCylinderId, setCylinderId] = useState<string>();
  const [price, setPrice] = useState<number>();

  const getCilynderTypes = async () => {
    try {
      const { data: response } = await api.get<{ data: CylinderType[] }>(
        '/cylinder-type'
      );

      const cylinders: CylinderType[] = response.data;

      setCyllinders(cylinders);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao buscar cilindros', { variant: 'error' });
    }
  };

  const postCylinderPrice = async () => {
    const addCylinderPriceData = {
      clientId,
      price,
      cylinderTypeId: !selectedCylinderId
        ? cylinders[0].id
        : selectedCylinderId,
    };

    try {
      const { data } = await api.post<ClientPriceType>(
        '/client-price',
        addCylinderPriceData
      );

      setClientPrices((prev) => [...prev, data]);

      setModal({ title: '', name: '' });

      enqueueSnackbar('Preço do cilindro cadastrado com sucesso', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao cadastrar preço do cilindro', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    getCilynderTypes();
  }, []);
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <label>Cilindro: </label>
          <select
            name=""
            id=""
            className="text-black"
            value={selectedCylinderId}
            onChange={(e) => {
              setCylinderId(e.target.value);
            }}
          >
            {cylinders?.map((cylinder) => (
              <option
                value={cylinder.id}
              >{`Cilindro ${cylinder.gasType.gasName} ${cylinder.size} ${cylinder.gasType.measurementUnit}`}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <label htmlFor="">Preço:</label>
          <Input
            id="price"
            name="price"
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex w-full justify-end gap-2 pt-4">
        <Button label="Salvar" icon="save" onClick={postCylinderPrice} />
        <Button
          label="Cancelar"
          icon="close"
          variant="delete"
          onClick={() => setModal({ title: '', name: '' })}
        />
      </div>
    </div>
  );
};
