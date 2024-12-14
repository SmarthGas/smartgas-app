import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { User } from '../../types/user';
import { useSnackbar } from 'notistack';
import api from '../../lib/api';

interface FormEditUserProps {
  selectedUser: User;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const FormEditUser = ({
  setUsers,
  selectedUser,
  setModal,
}: FormEditUserProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [editUserData, setEditUserData] = useState<User>(selectedUser);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patchUserBody = {
        name: editUserData.name,
        email: editUserData.email,
        cpf: editUserData.cpf,
        cep: editUserData.cep,
        public_place: editUserData.public_place,
        number: editUserData.number,
        complement: editUserData.complement,
        ddd: editUserData.ddd,
        phone: editUserData.phone,
      };
      await api.patch(`/user/${selectedUser.id}`, patchUserBody);
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === selectedUser.id) {
            return { ...user, ...editUserData };
          }
          return user;
        })
      );
      setModal({ title: '', name: '' });
      enqueueSnackbar('Usuário editado com sucesso', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao editar usuário', { variant: 'error' });
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
            type="text"
            id="name"
            name="name"
            value={editUserData.name}
            onChange={(e) =>
              setEditUserData({ ...editUserData, name: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            Email:{' '}
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={editUserData.email}
            onChange={(e) =>
              setEditUserData({ ...editUserData, email: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            CPF:{' '}
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={editUserData.cpf}
            onChange={(e) =>
              setEditUserData({ ...editUserData, cpf: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            CEP:{' '}
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={editUserData.cep}
            onChange={(e) =>
              setEditUserData({ ...editUserData, cep: e.target.value })
            }
          ></Input>
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            Logradouro:{' '}
          </label>
          <Input
            type="text"
            id="public_place"
            name="public_place"
            value={editUserData.public_place}
            onChange={(e) =>
              setEditUserData({ ...editUserData, public_place: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            Nº:{' '}
          </label>
          <Input
            type="text"
            id="number"
            name="number"
            value={editUserData.number}
            onChange={(e) =>
              setEditUserData({ ...editUserData, number: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            Complemento:{' '}
          </label>
          <Input
            type="text"
            id="complement"
            name="complement"
            value={editUserData.complement}
            onChange={(e) =>
              setEditUserData({ ...editUserData, complement: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            DDD:{' '}
          </label>
          <Input
            type="text"
            id="phone"
            name="phone"
            value={editUserData.ddd}
            onChange={(e) =>
              setEditUserData({ ...editUserData, ddd: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="flex justify-end w-[100px] text-xs">
            Telefone:{' '}
          </label>
          <Input
            type="text"
            id="phone"
            name="phone"
            value={editUserData.phone}
            onChange={(e) =>
              setEditUserData({ ...editUserData, phone: e.target.value })
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
