import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { SupplierType } from '../../types/supplier';
import { useSnackbar } from 'notistack';
import api from '../../lib/api';

interface FormEditSupplierProps {
  selectedSupplier: SupplierType;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setSuppliers: React.Dispatch<React.SetStateAction<SupplierType[]>>;
}

export const FormEditSupplier = ({
  setSuppliers,
  selectedSupplier,
  setModal,
}: FormEditSupplierProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [editSupplierData, setEditSupplierData] =
    useState<SupplierType>(selectedSupplier);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patchSupplierBody = {
        name: editSupplierData.name,
        email: editSupplierData.email,
        zipcode: editSupplierData.zipcode,
        cnpj: editSupplierData.cnpj,
        street: editSupplierData.street,
        streetNumber: editSupplierData.streetNumber,
        complement: editSupplierData.complement,
        ddd: editSupplierData.ddd,
        cellphone: editSupplierData.cellphone,
      };
      await api.patch(`/supplier/${selectedSupplier.id}`, patchSupplierBody);
      setSuppliers((prev) =>
        prev.map((supplier) => {
          if (supplier.id === selectedSupplier.id) {
            return { ...supplier, ...editSupplierData };
          }
          return supplier;
        })
      );
      setModal({ title: '', name: '' });
      enqueueSnackbar('Fornecedor editado com sucesso', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao editar fornecedor', { variant: 'error' });
    }
  };
  return (
    <form className="flex flex-col flex-wrap  gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 flex-wrap max-h-[200px]">
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>Nome:</p>{' '}
          </label>
          <Input
            value={editSupplierData.name}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>Email:</p>{' '}
          </label>
          <Input
            value={editSupplierData.email}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>CEP:</p>{' '}
          </label>
          <Input
            value={editSupplierData.zipcode}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                zipcode: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>CNPJ:</p>{' '}
          </label>
          <Input
            value={editSupplierData.cnpj}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                cnpj: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>Rua:</p>{' '}
          </label>
          <Input
            value={editSupplierData.street}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                street: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>Número:</p>{' '}
          </label>
          <Input
            value={editSupplierData.streetNumber}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                streetNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>Complemento:</p>{' '}
          </label>
          <Input
            value={editSupplierData.complement}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                complement: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>DDD:</p>{' '}
          </label>
          <Input
            value={editSupplierData.ddd}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                ddd: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            <p>Telefone:</p>{' '}
          </label>
          <Input
            value={editSupplierData.cellphone}
            onChange={(e) =>
              setEditSupplierData({
                ...editSupplierData,
                cellphone: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex w-full justify-end gap-4 pt-4">
        <Button label="Salvar" icon="save" type="submit" />
        <Button
          label="Cancelar"
          icon="trash"
          variant="delete"
          onClick={() => setModal({ title: '', name: '' })}
        />
      </div>
    </form>
  );
};
