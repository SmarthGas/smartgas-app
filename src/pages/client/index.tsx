import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClientPriceType, ClientType } from '../../types/client';
import api from '../../lib/api';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Modal } from '../../components/Modal';
import { ClientAddCylinderPriceModal } from './clientAddCilynderPriceModal';
import { ClientPrices } from './clientPrices';
export const Client = () => {
  const { clientId } = useParams();

  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [client, setClient] = useState<ClientType>();

  const [selectedClientPriceIdToDelete, setSelectedClientPriceIdToDelete] =
    useState<string>('');

  const clientFieldsEnum: { [key: string]: string } = {
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

  const getClient = async () => {
    console.log('getSupplier');
    try {
      const { data } = await api.get<ClientType>(`/client/${clientId}`);
      console.log(data);
      setClient({
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
    getClient();
  }, []);

  const [clientPrices, setClientPrices] = useState<ClientPriceType[]>([]);

  //   const getSupplierPrices = async () => {
  //     try {
  //       const { data: response } = await api.get<{
  //         data: ClientPriceType[];
  //       }>('/supplier-price', {
  //         params: {
  //           clientId,
  //         },
  //       });

  //       const cylinderPrices: ClientPriceType[] = response.data.map(
  //         (cylinderSupplier: ClientPriceType) => ({
  //           id: cylinderSupplier.id,
  //           CylinderType: cylinderSupplier.CylinderType,
  //           cylinderTypeId: cylinderSupplier.CylinderType.id,
  //           gasType: cylinderSupplier.CylinderType.gasType as GasType,
  //           price: cylinderSupplier.price,
  //           startDate: cylinderSupplier.startDate,
  //           endDate: cylinderSupplier.endDate,
  //           active: cylinderSupplier.active ? 'Sim' : 'Não',
  //         })
  //       );

  //       console.log(cylinderPrices);
  //       setSupplierPrices(cylinderPrices);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const deleteSupplierPrice = async (id: string) => {
  //     try {
  //       await api.delete(`/supplier-price/${id}`);
  //       getSupplierPrices();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getSupplierPrices();
  //   }, []);

  return (
    <>
      {/* {modal.name === 'delete-supplierPrice' && (
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
        */}
      {modal.name === 'client-add-cilynder-price' && clientId && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <ClientAddCylinderPriceModal
            clientId={clientId}
            setModal={setModal}
            setClientPrices={setClientPrices}
          />
        </Modal>
      )}
      {clientId && (
        <Section title="Cliente" backButton>
          <div className="flex flex-col gap-10">
            <div className="flex w-full text-cream-100 gap-10 flex-wrap pt-10">
              {client &&
                Object.entries(client).map(
                  ([key, value]) =>
                    key &&
                    value && (
                      <div key={key} className="flex gap-2">
                        <span className="font-bold text-xs">{`${clientFieldsEnum[key]}:`}</span>
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
                      name: 'client-add-cilynder-price',
                    })
                  }
                />
              </div>
              {clientPrices.length > 0 ? (
                <ClientPrices
                  clientId={clientId}
                  clientPrices={clientPrices || []}
                  setModal={setModal}
                  setSelectedClientPriceIdToDelete={
                    setSelectedClientPriceIdToDelete
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
