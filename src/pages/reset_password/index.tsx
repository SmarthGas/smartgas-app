import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //get url params value

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const { userId } = useParams();

  useEffect(() => {
    console.log('user id:', userId);
  }, []);

  const handlePasswordSubmit = () => {
    // TODO: fazer a requisição à API para redefinir a senha
    // e.preventDefault();
    console.log('data: ', newPassword, confirmPassword, userId);

    // Verificar se as senhas coincidem e enviar à API
    if (newPassword === confirmPassword) {
      console.log('Bearer token:', token);
      api.post(
        '/auth/reset',
        {
          password: newPassword,
          id: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Senha alterada com sucesso!');
      navigate('/users');
    } else {
      console.error('As senhas não coincidem.');
    }
  };
  return (
    <div className="flex flex-col w-screen absolute top-0 left-0 h-screen bg-brand-300 text-cream-100 items-center p-[10vh]">
      <div className="flex flex-col max-w-screen md:max-w-[500px] gap-5">
        <div className="flex flex-col gap-3">
          <h2 id="text" className="font-semibold text-4xl">
            Escolha uma nova senha
          </h2>
          <h3 id="text" className="break-normal">
            Sua nova senha deve conter 8 caracteres ou mais.
          </h3>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="new_password_input"
              className="text-cream-100 text-xs w-max"
            >
              Digite uma nova senha
            </label>
            <Input
              id="new_password_input"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></Input>
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="confirm_new_password_input"
              className="text-cream-100 text-xs w-max"
            >
              Confirme sua nova senha
            </label>
            <Input
              id="confirm_new_password_input"
              name="verificationCode"
              type="password"
              value={confirmPassword}
              className="w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
          </div>
          <div className="flex justify-center">
            <Button
              label="Alterar senha"
              variant="primary"
              type="button"
              onClick={handlePasswordSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
