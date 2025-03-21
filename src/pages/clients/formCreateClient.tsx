import React from 'react';
import { Button } from '../../components/Button';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { InputForm } from '../../components/InputForm';
import api from '../../lib/api';
import { removeMask } from '../../utils/removeMask';
import { validateCNPJ } from '../../utils/validateCNPJ';
import { ClientType } from '../../types/client';

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

const initialValues: FormValues = {
  name: '',
  email: '',
  cnpj: '',
  zipcode: '',
  street: '',
  streetNumber: '',
  complement: '',
  ddd: '',
  cellphone: '',
};

//Esquema de validação

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().required('Email é obrigatório'),
  cnpj: Yup.string()
    .required('CNPJ é obrigatório')
    .test('len', 'CNPJ deve ter 14 caracteres numéricos', (value) => {
      // Remover a máscara e verificar o comprimento
      const cleanValue = removeMask(value || '');
      return cleanValue.length === 14;
    })
    .test('valid-cnpj', 'CNPJ inválido', (value) => {
      // Adicione uma validação real de CNPJ aqui
      const cleanValue = removeMask(value || '');
      return validateCNPJ(cleanValue); // Supondo que você tenha uma função validateCNPJ
    }),
  zipcode: Yup.string()
    .required('CEP é obrigatório')
    .test('len', 'CEP deve ter 8 caracteres numéricos', (value) => {
      // Remover a máscara e verificar o comprimento
      const cleanValue = removeMask(value || '');
      return cleanValue.length === 8;
    }),
  street: Yup.string().required('Logradouro é obrigatório'),
  streetNumber: Yup.string().required('Número é obrigatório'),
  complement: Yup.string(),
  ddd: Yup.string().required('DDD é obrigatório'),
  cellphone: Yup.string()
    .required('Telefone é obrigatório')
    .test('len', 'Telefone deve ter 9 caracteres numéricos', (value) => {
      // Remover a máscara e verificar o comprimento
      const cleanValue = removeMask(value || '');
      return cleanValue.length === 9;
    }),
});

interface FormCreateClientProps {
  setClients: React.Dispatch<React.SetStateAction<ClientType[]>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
}

export const FormCreateClient = ({
  setClients,
  setModal,
}: FormCreateClientProps) => {
  const handleSubmit = async (values: FormValues) => {
    try {

      const {
        data,
      }: {
        data: { client: ClientType };
      } = await api.post('/client', {
        ...values,
        cnpj: removeMask(values.cnpj),
        zipcode: removeMask(values.zipcode),
        cellphone: removeMask(values.cellphone),
      });

      setClients((prev: any) => [...prev, data.client]);
      setModal({ title: '', name: '' });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex gap-4 flex-col flex-wrap max-h-[200px]">
            <InputForm id="name" name="name" type="text" label="Nome" />
            <InputForm id="email" name="email" type="email" label="Email" />
            <InputForm
              id="cnpj"
              name="cnpj"
              type="text"
              label="CNPJ"
              mask="99.999.999/9999-99"
            />
            <InputForm
              id="zipcode"
              name="zipcode"
              type="text"
              label="CEP"
              mask="99999-999"
            />
            <InputForm
              id="street"
              name="street"
              type="text"
              label="Logradouro"
            />
            <InputForm
              id="streetNumber"
              name="streetNumber"
              type="text"
              label="Número"
            />
            <InputForm
              id="complement"
              name="complement"
              type="text"
              label="Complemento"
            />
            <InputForm id="ddd" name="ddd" type="text" label="DDD" />
            <InputForm
              id="cellphone"
              name="cellphone"
              type="text"
              label="Telefone"
              mask="99999-9999"
            />{' '}
          </div>
          <div className="flex w-full justify-end gap-4 pt-4">
            <Button
              label="Adicionar"
              icon="plus"
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
