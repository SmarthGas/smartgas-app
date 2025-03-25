import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ClientType } from '../../types/client';
import { useSnackbar } from 'notistack';
import api from '../../lib/api';
import * as Yup from 'yup';
import { removeMask } from '../../utils/removeMask';
import { Form, Formik } from 'formik';
import { InputForm } from '../../components/InputForm';
import { validateCNPJ } from '../../utils/validateCNPJ';

interface FormValues {
  name: string;
  email: string;
  cnpj: string;
  zipcode: string;
  street: string;
  streetNumber: string;
  complement: string;
  ddd: string;
  cellphone: string;
}

interface FormEditClientProps {
  selectedClient: ClientType;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setClients: React.Dispatch<React.SetStateAction<ClientType[]>>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  cnpj: Yup.string()
    .nullable()
    .notRequired()
    .test('len', 'CNPJ deve ter 14 caracteres numéricos', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não valida
      const cleanValue = removeMask(value);
      return cleanValue.length === 14;
    })
    .test('valid-cnpj', 'CNPJ Inválido', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não valida
      const cleanValue = removeMask(value);
      return validateCNPJ(cleanValue);
    }),

  zipcode: Yup.string()
    .nullable()
    .notRequired()
    .test('len', 'zipcode deve ter 8 caracteres numéricos', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não valida
      const cleanValue = removeMask(value);
      return cleanValue.length === 8;
    }),
  street: Yup.string().nullable().notRequired(),
  streetNumber: Yup.string().nullable().notRequired(),
  complement: Yup.string().nullable().notRequired(),
  ddd: Yup.string().nullable().notRequired(),
  cellphone: Yup.string()
    .nullable()
    .notRequired()
    .test('len', 'Telefone deve ter 9 caracteres numéricos', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não precisa validar
      const cleanValue = removeMask(value);
      return cleanValue.length === 9;
    }),
});

export const FormEditClient = ({
  setClients,
  selectedClient,
  setModal,
}: FormEditClientProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues: FormValues = {
    name: selectedClient.name,
    email: selectedClient.email,
    cnpj: selectedClient.cnpj,
    zipcode: selectedClient.zipcode,
    street: selectedClient.street,
    streetNumber: selectedClient.streetNumber,
    complement: selectedClient.complement,
    ddd: selectedClient.ddd,
    cellphone: selectedClient.cellphone,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (values.cnpj) values.cnpj = removeMask(values.cnpj);
      if (values.zipcode) values.zipcode = removeMask(values.zipcode);
      if (values.cellphone) values.cellphone = removeMask(values.cellphone);

      const cleanValues = Object.entries(values).reduce(
        (acc: Record<string, any>, [key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const { data }: { data: { updatedClient: ClientType } } = await api.patch(
        `/client/${selectedClient.id}`,
        cleanValues
      );

      const { updatedClient } = data;

      setClients((prev) =>
        prev.map((client) => {
          if (client.id === selectedClient.id) {
            return { ...client, ...updatedClient };
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, values, handleChange }) => (
        <Form className="flex flex-col flex-wrap  gap-4">
          <div className="flex flex-col gap-4 flex-wrap max-h-[200px]">
            <InputForm
              id="name"
              name="name"
              type="text"
              label="Nome"
              value={values.name}
              onChange={handleChange}
            />
            <InputForm
              id="email"
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
            />
            <InputForm
              id="cnpj"
              name="cnpj"
              type="text"
              label="CNPJ"
              mask="99.999.999/9999-99"
              value={values.cnpj}
              onChange={handleChange}
            />
            <InputForm
              id="zipcode"
              name="zipcode"
              type="text"
              label="zipcode"
              mask="99999-999"
              value={values.zipcode}
              onChange={handleChange}
            />
            <InputForm
              id="street"
              name="street"
              type="text"
              label="Logradouro"
              value={values.street}
              onChange={handleChange}
            />
            <InputForm
              id="streetNumber"
              name="streetNumber"
              type="text"
              label="Número"
              value={values.streetNumber}
              onChange={handleChange}
            />
            <InputForm
              id="complement"
              name="complement"
              type="text"
              label="Complemento"
              value={values.complement}
              onChange={handleChange}
            />
            <InputForm
              id="ddd"
              name="ddd"
              type="text"
              label="DDD"
              value={values.ddd}
              onChange={handleChange}
            />
            <InputForm
              id="cellphone"
              name="cellphone"
              type="text"
              label="Telefone"
              mask="99999-9999"
              value={values.cellphone}
              onChange={handleChange}
            />{' '}
          </div>
          <div className="flex w-full justify-end gap-4 pt-4">
            <Button
              label="Salvar"
              icon="save"
              type="submit"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
            />
            <Button label="Cancelar" icon="trash" variant="delete" />
          </div>
        </Form>
      )}
    </Formik>
  );
};
