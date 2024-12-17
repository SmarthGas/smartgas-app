import React from 'react';
import { Button } from '../../components/Button';

interface ConfirmDeleteSupplierProps {
  supplierToDelete: String;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  deleteSupplier: any;
}

export const ConfirmDeleteSupplier = ({
  supplierToDelete,
  deleteSupplier,
}: ConfirmDeleteSupplierProps) => {
  const handleConfirmDeleteSupplier = async () => {
    if (supplierToDelete) {
      await deleteSupplier(supplierToDelete);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <p>Tem certeza que deseja deletar o fornecedor?</p>
      <div className="flex gap-4 w-full justify-end">
        <Button
          variant="primary"
          icon="check"
          label="Sim"
          onClick={handleConfirmDeleteSupplier}
        />
        <Button
          variant="delete"
          label="Não"
          icon="close"
          onClick={handleConfirmDeleteSupplier}
        />
      </div>
    </div>
  );
};
