import React from 'react';
import { Button } from '../../components/Button';

interface ConfirmDeleteClientProps {
  clientToDelete: String;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  deleteClient: any;
}

export const ConfirmDeleteClient = ({
  clientToDelete,
  deleteClient,
}: ConfirmDeleteClientProps) => {
  const handleConfirmDeleteClient = async () => {
    if (clientToDelete) {
      await deleteClient(clientToDelete);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <p>Tem certeza que deseja deletar o cliente?</p>
      <div className="flex gap-4 w-full justify-end">
        <Button
          variant="primary"
          icon="check"
          label="Sim"
          onClick={handleConfirmDeleteClient}
        />
        <Button
          variant="delete"
          label="Não"
          icon="close"
          onClick={handleConfirmDeleteClient}
        />
      </div>
    </div>
  );
};
