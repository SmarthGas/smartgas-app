import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../lib/api';
import { useParams } from 'react-router-dom';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const bearerToken = localStorage.getItem('token');
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
      console.log('Bearer token:', bearerToken);
      // api.post(
      //   '/auth/reset',
      //   {
      //     password: newPassword,
      //     id: userId,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${bearerToken}`,
      //     },
      //   }
      // );
      // Fechar modal ou exibir mensagem de sucesso
    } else {
      console.error('As senhas não coincidem.');
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
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
  );
};
