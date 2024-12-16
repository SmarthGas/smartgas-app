import React from 'react';
import { Button } from '../../components/Button';
import { SupplierType } from '../../types/supplier';

interface ConfirmDeleteSupplierProps {
  supplier: SupplierType | undefined;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  deleteSupplier: any;
}

export const ConfirmDeleteSupplier = ({
  supplier,
  setModal,
  deleteSupplier,
}: ConfirmDeleteSupplierProps) => {
  const handleConfirmDeleteSupplier = async () => {
    if (supplier) {
      await deleteSupplier(supplier);
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
          onClick={() => setModal({ title: '', name: '' })}
        />
      </div>
    </div>
  );
};
