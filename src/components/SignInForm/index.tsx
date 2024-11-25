import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ResetPassword } from '../../pages/reset_password';
import { Input } from '../Input';

import api from '../../lib/api';
import { AxiosResponse } from 'axios';

export const SignInForm = () => {
  // constantes que controlam a abertura e fechamento do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // constantes que controlam os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post('http://localhost:3000/auth/login', formData)
      .then((response: AxiosResponse) => {
        console.log(response.data.access_token);

        if (response.status === 201) {
          localStorage.setItem('token', response.data.access_token);
          window.location.href = '/home';
        } else {
          console.log('Usuário ou senha inválidos');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="form" className="flex flex-col space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email_input" className="text-cream-100 text-xs w-max">
            Email
          </label>
          <Input
            id="email_input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
          ></Input>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="password_input"
            className="text-cream-100 text-xs w-max"
          >
            Senha
          </label>
          <Input
            id="password_input"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
          ></Input>
          <button
            className="flex text-xs underline text-cream-100"
            onClick={handleOpenModal}
          >
            Esqueci a senha
          </button>

          {isModalOpen && (
            <Modal title="Redefinição de senha" closeModal={handleCloseModal}>
              <ResetPassword />
            </Modal>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          label="Entrar"
          variant="primary"
          className="w-max"
          type="submit"
        />
      </div>
    </form>
  );
};
