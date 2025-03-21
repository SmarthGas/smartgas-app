import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClientPriceType, ClientType } from '../../types/client';
import api from '../../lib/api';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Modal } from '../../components/Modal';
import { ClientPrices } from './clientPrices';
import { ClientAddCylinderPriceModal } from './clientAddCilynderPriceModal';
import { useSnackbar } from 'notistack';
export const Client = () => {
  const { clientId } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [modal, setModal] = useState({
    title: '',
    name: '',
  });

  const [client, setClient] = useState<ClientType>();

  const [selectedCylinderTypeIdToDelete, setSelectedCylinderTypeIdToDelete] =
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
    try {
      const { data } = await api.get<ClientType>(`/client/${clientId}`);
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

      enqueueSnackbar('Cliente buscado com sucesso', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Erro ao buscar cliente', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  const [clientPrices, setClientPrices] = useState<ClientPriceType[]>([]);

  const getClientPrices = async () => {
    try {
      const { data: response } = await api.get<{
        data: ClientPriceType[];
      }>('/client-price', {
        params: {
          clientId,
        },
      });

      const { data } = response;


      enqueueSnackbar('Preços do cliente buscados com sucesso', {
        variant: 'success',
      });

      setClientPrices(data);
    } catch (error) {
      enqueueSnackbar('Erro ao buscar preços do cliente', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const deleteClientPrice = async (cylinderTypeId: string) => {
    try {
      await api.delete(`/client-price/${clientId}/${cylinderTypeId}`);
      setClientPrices(
        clientPrices.filter((price) => price.cylinderTypeId !== cylinderTypeId)
      );

      enqueueSnackbar('Preço do cilindro deletado com sucesso', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Erro ao deletar preço do cilindro', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  useEffect(() => {
    getClientPrices();
  }, []);

  return (
    <>
      {modal.name === 'delete-client-price' && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <div className="flex py-8 flex-col gap-4 max-w-[400px]">
            <p>Você tem certeza de que deseja deletar este item? </p>
            <p>
              Ao deletar esse item, TODOS os registros desse tipo de gás e
              tamanho erao apagados{' '}
            </p>
          </div>
          <div className="flex w-full justify-end gap-2">
            <Button
              label="Sim"
              icon="check"
              variant="primary"
              onClick={() => {
                if (selectedCylinderTypeIdToDelete) {
                  deleteClientPrice(selectedCylinderTypeIdToDelete);
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

      {modal.name === 'client-add-cilynder-price' && clientId && (
        <Modal
          title={modal.title}
          closeModal={() => setModal({ title: '', name: '' })}
        >
          <></>
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
                  setSelectedCylinderTypeIdToDelete={
                    setSelectedCylinderTypeIdToDelete
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
