import React from 'react';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import api from '../../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useUser } from '../../../providers/userContext';

export const SignInForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { fetchUser } = useUser();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await api.post<{
        message: string;
        access_token: string;
      }>('/auth/login', formData);

      localStorage.setItem('token', data.access_token);

      await fetchUser();

      navigate('/users');

      enqueueSnackbar(data.message, { variant: 'success' });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <form
      id="sign-in-form"
      className="flex flex-col space-y-6"
      onSubmit={handleSubmit}
    >
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
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/forgot-password');
            }}
          >
            Esqueci a senha
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          label="Entrar"
          variant="primary"
          className="w-max"
          type="submit"
          loading={loading}
          disabled={loading}
        />
      </div>
    </form>
  );
};
