import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../../components/Section';
import { SupplierPriceType, SupplierType } from '../../types/supplier';
import api from '../../services/api';
import { SupplierPrices } from './supplierPrices';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { AddCylinderPriceModal } from './addCilynderPriceModal';
import { GasType } from '../../types/gasType';

export const Supplier = () => {
  const { supplierId } = useParams();

  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [supplier, setSupplier] = useState<SupplierType>();

  const [selectedSupplierPriceIdToDelete, setSelectedSupplierPriceIdToDelete] =
    useState<string>('');

  const supplierFieldsEnum: { [key: string]: string } = {
    id: 'ID',
    name: 'Nome',
    email: 'Email',
    cnpj: 'CNPJ',
    street: 'Rua',
    streetNumber: 'Número',
    complement: 'Complemento',
    zipcode: 'CEP',
    ddd: 'DDD',
    cellphone: 'Celular',
  };

  const getSupplier = async () => {
    try {
      const { data } = await api.get<SupplierType>(`/supplier/${supplierId}`);
      setSupplier({
        id: data.id,
        name: data.name,
        email: data.email,
        cnpj: data.cnpj,
        street: data.street,
        streetNumber: data.streetNumber,
        zipcode: data.zipcode,
        ddd: data.ddd,
        cellphone: data.cellphone,
        complement: data.complement,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSupplier();
  }, []);

  const [supplierPrices, setSupplierPrices] = useState<SupplierPriceType[]>([]);

  const getSupplierPrices = async () => {
    try {
      const { data: response } = await api.get<{
        data: SupplierPriceType[];
      }>('/supplierPrice', {
        params: {
          supplierId,
        },
      });

      const cylinderPrices: SupplierPriceType[] = response.data.map(
        (cylinderSupplier: SupplierPriceType) => ({
          id: cylinderSupplier.id,
          CylinderType: cylinderSupplier.CylinderType,
          cylinderTypeId: cylinderSupplier.CylinderType.id,
          gasType: cylinderSupplier.CylinderType.gasType as GasType,
          price: cylinderSupplier.price,
          startDate: cylinderSupplier.startDate,
          endDate: cylinderSupplier.endDate,
          active: cylinderSupplier.active ? 'Sim' : 'Não',
        })
      );

      setSupplierPrices(cylinderPrices);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSupplierPrice = async (id: string) => {
    try {
      await api.delete(`/supplier-price/${id}`);
      getSupplierPrices();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSupplierPrices();
  }, []);

  return (
    <>
      {modal.name === 'delete-supplierPrice' && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <div className="flex py-4 w-full">
            <p>Você tem certeza de que deseja deletar este item? </p>
          </div>
          <div className="flex w-full justify-end gap-2">
            <Button
              label="Sim"
              icon="check"
              variant="primary"
              onClick={() => {
                if (selectedSupplierPriceIdToDelete) {
                  deleteSupplierPrice(selectedSupplierPriceIdToDelete);
                  setModal({ title: '', name: '' });
                } else {
                  setModal({ title: '', name: '' });
                }
              }}
            />
            <Button
              label="Não"
              icon="close"
              variant="delete"
              onClick={() => setModal({ title: '', name: '' })}
            />
          </div>
        </Modal>
      )}
      {modal.name === 'add-cilynder-price' && supplierId && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <AddCylinderPriceModal
            supplierId={supplierId}
            setModal={setModal}
            setSupplierPrices={setSupplierPrices}
          />
        </Modal>
      )}
      {supplierId && (
        <Section title="Fornecedor" backButton>
          <div className="flex flex-col gap-10">
            <div className="flex w-full text-cream-100 gap-10 flex-wrap pt-10">
              {supplier &&
                Object.entries(supplier).map(
                  ([key, value]) =>
                    key &&
                    value && (
                      <div key={key} className="flex gap-2">
                        <span className="font-bold text-xs">{`${supplierFieldsEnum[key]}:`}</span>
                        <span className="text-xs">{value}</span>
                      </div>
                    )
                )}
            </div>
            <div className="flex w-full border border-cream-100/50" />

            <div className="flex flex-col gap-4">
              <div className="flex w-full justify-end">
                <Button
                  label="Adicionar Cilindro"
                  icon="plus"
                  variant="primary"
                  onClick={() =>
                    setModal({
                      title: 'Adicionar Preço de Cilindro',
                      name: 'add-cilynder-price',
                    })
                  }
                />
              </div>
              {supplierPrices.length > 0 ? (
                <SupplierPrices
                  supplierId={supplierId}
                  supplierPrices={supplierPrices || []}
                  setModal={setModal}
                  setSelectedSupplierPriceIdToDelete={
                    setSelectedSupplierPriceIdToDelete
                  }
                />
              ) : (
                <div className="flex w-full justify-center text-cream-100">
                  Não há preços cadastrados
                </div>
              )}
            </div>
          </div>
        </Section>
      )}
    </>
  );
};
