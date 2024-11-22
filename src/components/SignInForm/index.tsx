import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ResetPassword } from '../../pages/reset_password';

// todo import api from '../../lib/api';

export const SignInForm = () => {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // todo api.post('/login', formData);
  };

  return (
    <form id="form" className="flex flex-col space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="email_input" className="text-cream-100 text-xs w-max">
            Email
          </label>
          <input
            id="email_input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-xl"
          ></input>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password_input"
            className="text-cream-100 text-xs w-max"
          >
            Senha
          </label>
          <input
            id="password_input"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-xl"
          ></input>
          <button
            className="flex text-xs underline text-cream-100"
            onClick={handleOpenModal}
          >
            Esqueci a senha
          </button>

          {isModalOpen && (
            <Modal title="" closeModal={handleCloseModal}>
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
