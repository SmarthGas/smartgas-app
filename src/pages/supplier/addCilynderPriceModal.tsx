import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { useSnackbar } from 'notistack';
import api from '../../lib/api';
import { Button } from '../../components/Button';
import { SupplierPriceType } from '../../types/supplier';

interface AddCylinderProps {
  supplierId: string;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setSupplierPrices: React.Dispatch<React.SetStateAction<SupplierPriceType[]>>;
}

export const AddCylinderPriceModal = ({
  supplierId,
  setModal,
  // eslint-disable-next-line no-unused-vars
  setSupplierPrices,
}: AddCylinderProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [cylinders, setCyllinders] = useState<any[]>([]);

  const [selectedCylinderId, setCylinderId] = useState<string>();
  const [price, setPrice] = useState<number>();

  const getCilynderTypes = async () => {
    try {
      const { data: response } = await api.get<{
        pagination: any;
        cylinders: any[];
      }>('/Cylinders');
      const { cylinders } = response;

      setCyllinders(cylinders);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao buscar cilindros', { variant: 'error' });
    }
  };

  const postCylinderPrice = async () => {
    const addCylinderPriceData = {
      supplierId,
      price,
      cylinderTypeId:
        cylinders.length === 1 ? cylinders[0].id : selectedCylinderId,
    };
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await api.post<{
        supplier: any;
      }>('/supplierPrice', addCylinderPriceData);

      //   const cylinderPrice: SupplierPriceType = {
      //     id: data.supplier.id,
      //     CylinderType: {
      //       id: data.supplier.cylinderTypeId,
      //       gasType: data.supplier.gasType,
      //       size: data.supplier.size,
      //     },
      //     price: data.supplier.price,
      //     startDate: data.supplier.startDate,
      //     endDate: data.supplier.endDate,
      //     active: data.supplier.active ? 'Sim' : 'Não',
      //   };

      // setSupplierPrices((prev) => [...prev, cylinderPrice]);

      window.location.reload();

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
              console.log(e.target.value);
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
