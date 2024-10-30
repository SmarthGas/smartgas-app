import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { User } from '../../types/user';

interface FormEditUserProps {
  initialValues?: User;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
}

export const FormEditUser = ({
  initialValues,
  setModal,
}: FormEditUserProps) => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label htmlFor="" className="flex justify-end w-[100px] text-xs">
          <p>Nome:</p>{' '}
        </label>
        <Input type="text" id="name" name="name" value={initialValues?.name} />
      </div>
      <div className="flex gap-4">
        <label htmlFor="" className="flex justify-end w-[100px] text-xs">
          Email:{' '}
        </label>
        <Input type="text" id="name" name="name" value={initialValues?.email} />
      </div>
      <div className="flex gap-4">
        <label htmlFor="" className="flex justify-end w-[100px] text-xs">
          CPF:{' '}
        </label>
        <Input type="text" id="name" name="name" value={initialValues?.cpf} />
      </div>
      <div className="flex gap-4">
        <label htmlFor="" className="flex justify-end w-[100px] text-xs">
          Endereço:{' '}
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={initialValues?.address}
        />
      </div>
      <div className="flex w-full justify-end gap-4 pt-4">
        <Button label="Salvar" icon="save" />
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
