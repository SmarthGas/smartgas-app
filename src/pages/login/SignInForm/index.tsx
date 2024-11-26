import React from 'react';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { ResetPassword } from '../../reset_password';
import { Input } from '../../../components/Input';
import api from '../../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../providers/userContext';

// todo import api from '../../lib/api';

export const SignInForm = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  // constantes que controlam a abertura e fechamento do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await api.post<{
        message: string;
        access_token: string;
      }>('/auth/login', formData);

      localStorage.setItem('token', data.access_token);
    } catch (error) {
      console.log(error);
    }

    try {
      const { data } = await api.get<{
        id: string;
        name: string;
        email: string;
      }>('/auth/me');

      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
      });

      console.log(data);

      navigate('/users');
    } catch (error) {
      console.log(error);
    }
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
