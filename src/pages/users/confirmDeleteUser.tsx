import React from 'react';
import { Button } from '../../components/Button';
import { User } from '../../types/user';

interface ConfirmDeleteUserProps {
  user: User | undefined;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
}

export const ConfirmDeleteuser = ({ setModal }: ConfirmDeleteUserProps) => {
  return (
    <div className="flex flex-col gap-8">
      <p>Tem certeza que deseja deletar o usuário?</p>
      <div className="flex gap-4 w-full justify-end">
        <Button variant="primary" icon="check" label="Sim" />
        <Button
          variant="delete"
          label="Não"
          icon="close"
          onClick={() => setModal({ title: '', name: '' })}
        />
      </div>
    </div>
  );
};
