import React from 'react';
import { Button } from '../../components/Button';
import { User } from '../../types/user';
import { useSnackbar } from 'notistack';
import api from '../../services/api';
import * as Yup from 'yup';
import { removeMask } from '../../utils/removeMask';
import { Form, Formik } from 'formik';
import { InputForm } from '../../components/InputForm';
import { validateCPF } from '../../utils/validateCPF';

interface FormValues {
  name: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  streetNumber: string;
  complement: string;
  ddd: string;
  phone: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  cpf: Yup.string()
    .nullable()
    .notRequired()
    .test('len', 'CPF deve ter 11 caracteres numéricos', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não valida
      const cleanValue = removeMask(value);
      return cleanValue.length === 11;
    })
    .test('valid-cpf', 'CPF inválido', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não valida
      const cleanValue = removeMask(value);
      return validateCPF(cleanValue);
    }),

  cep: Yup.string()
    .nullable()
    .notRequired()
    .test('len', 'CEP deve ter 8 caracteres numéricos', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não valida
      const cleanValue = removeMask(value);
      return cleanValue.length === 8;
    }),
  street: Yup.string().nullable().notRequired(),
  streetNumber: Yup.string().nullable().notRequired(),
  complement: Yup.string().nullable().notRequired(),
  ddd: Yup.string().nullable().notRequired(),
  phone: Yup.string()
    .nullable()
    .notRequired()
    .test('len', 'Telefone deve ter 9 caracteres numéricos', (value) => {
      if (!value) return true; // Se o campo estiver vazio, não precisa validar
      const cleanValue = removeMask(value);
      return cleanValue.length === 9;
    }),
});

interface FormEditUserProps {
  selectedUser: User;
  setModal: React.Dispatch<
    React.SetStateAction<{ title: string; name: string }>
  >;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const FormEditUser = ({
  setUsers,
  selectedUser,
  setModal,
}: FormEditUserProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues: FormValues = {
    name: selectedUser.name || '',
    email: selectedUser.email || '',
    cpf: selectedUser.cpf || '',
    cep: selectedUser.cep || '',
    street: selectedUser.street || '',
    streetNumber: selectedUser.streetNumber || '',
    complement: selectedUser.complement || '',
    ddd: selectedUser.ddd || '',
    phone: selectedUser.phone || '',
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (values.cpf) values.cpf = removeMask(values.cpf);
      if (values.cep) values.cep = removeMask(values.cep);
      if (values.phone) values.phone = removeMask(values.phone);

      const cleanValues = Object.entries(values).reduce(
        (acc: Record<string, any>, [key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const {
        data,
      }: {
        data: { updatedUser: User };
      } = await api.patch(`/user/${selectedUser.id}`, {
        ...cleanValues,
      });

      const { updatedUser } = data;

      setModal({ title: '', name: '' });
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === selectedUser.id) {
            return { ...user, ...updatedUser };
          }
          return user;
        })
      );
      enqueueSnackbar('Usuário editado com sucesso', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao editar usuário', { variant: 'error' });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, values, handleChange }) => (
        <Form className="flex flex-col gap-4">
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
              id="cpf"
              name="cpf"
              type="text"
              label="CPF"
              mask="999.999.999-99"
              value={values.cpf}
              onChange={handleChange}
            />
            <InputForm
              id="cep"
              name="cep"
              type="text"
              label="CEP"
              mask="99999-999"
              value={values.cep}
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
              id="phone"
              name="phone"
              type="text"
              label="Telefone"
              mask="99999-9999"
              value={values.phone}
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
