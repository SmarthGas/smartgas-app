import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

export const SignUpForm = () => {
  // constantes que controlam os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
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
  };

  return (
    <form id="form" className="flex flex-col space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name_input" className="text-cream-100 text-xs w-max">
            Nome
          </label>
          <Input
            id="name_input"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Digite seu nome"
          ></Input>
        </div>

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
            required
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
            required
            placeholder="Digite sua senha"
          ></Input>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          label="Inscreva-se"
          variant="primary"
          className="w-max"
          type="submit"
        />
      </div>
    </form>
  );
};
