import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ClientType } from '../../types/client';
import { useSnackbar } from 'notistack';
import api from '../../lib/api';

interface FormEditClientProps {
  selectedClient: ClientType;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setClients: React.Dispatch<React.SetStateAction<ClientType[]>>;
}

export const FormEditClient = ({
  setClients,
  selectedClient,
  setModal,
}: FormEditClientProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [editClientData, setEditClientData] =
    useState<ClientType>(selectedClient);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patchClientBody = {
        name: editClientData.name,
        email: editClientData.email,
        zipcode: editClientData.zipcode,
        cnpj: editClientData.cnpj,
        street: editClientData.street,
        streetNumber: editClientData.streetNumber,
        complement: editClientData.complement,
        ddd: editClientData.ddd,
        cellphone: editClientData.cellphone,
      };
      await api.patch(`/client/${selectedClient.id}`, patchClientBody);
      setClients((prev) =>
        prev.map((client) => {
          if (client.id === selectedClient.id) {
            return { ...client, ...editClientData };
          }
          return client;
        })
      );
      setModal({ title: '', name: '' });
      enqueueSnackbar('Cliente editado com sucesso', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao editar cliente', { variant: 'error' });
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
            value={editClientData.name}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.email}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.zipcode}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.cnpj}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.street}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.streetNumber}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.complement}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.ddd}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
            value={editClientData.cellphone}
            onChange={(e) =>
              setEditClientData({
                ...editClientData,
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
