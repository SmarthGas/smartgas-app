import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = () => {
    // TODO: fazer a requisição à API para enviar o email
    console.log('data: ', email);

    setStep(2);
  };
  const handleVerificationSubmit = () => {
    // TODO: fazer a requisição à API para verificar o código
    console.log('data: ', verificationCode);

    setStep(3);
  };
  const handlePasswordSubmit = () => {
    // TODO: fazer a requisição à API para redefinir a senha
    // e.preventDefault();
    console.log('data: ', newPassword, confirmPassword);

    // Verificar se as senhas coincidem e enviar à API
    if (newPassword === confirmPassword) {
      console.log('Senha redefinida com sucesso!');

      // recarregar a página ou redirecionar para a página de login
      window.location.href = '/';

      // Fechar modal ou exibir mensagem de sucesso
    } else {
      console.error('As senhas não coincidem.');
    }
  };

  const handleResendCode = () => {
    // TODO: fazer a requisição à API para reenviar o código
    console.log('Reenviando código...');
  };

  return (
    <div id="section_title" className="flex flex-col w-max h-auto space-y-6">
      {step === 1 && (
        <div className="space-y-6">
          <h2 id="text">
            Informe o endereço de email associado à sua conta para alterar sua
            senha.
          </h2>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email_input"
                className="text-cream-100 text-xs w-max"
              >
                Email
              </label>
              <Input
                id="email_input"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>

            <div className="flex justify-center">
              <Button
                label="Avançar"
                variant="primary"
                type="button"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 id="text" className="font-semibold text-4xl">
              Código enviado!
            </h2>
            <h3 id="text">
              Verifique sua caixa de entrada e insira o código de verificação
              abaixo.
            </h3>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="code_input"
                className="text-cream-100 text-xs w-max"
              >
                Código de verificação
              </label>
              <Input
                id="code_input"
                name="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              ></Input>
            </div>
            <div className="flex justify-center">
              <Button
                label="Reenviar código"
                variant="transparent"
                type="button"
                onClick={handleResendCode}
              />
            </div>
            <div className="flex justify-center">
              <Button
                label="Avançar"
                variant="primary"
                type="button"
                onClick={handleVerificationSubmit}
              />
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
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
                htmlFor="code_input"
                className="text-cream-100 text-xs w-max"
              >
                Digite uma nova senha
              </label>
              <Input
                id="code_input"
                name="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setNewPassword(e.target.value)}
              ></Input>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="code_input"
                className="text-cream-100 text-xs w-max"
              >
                Confirme sua nova senha
              </label>
              <Input
                id="code_input"
                name="verificationCode"
                type="text"
                value={verificationCode}
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
      )}
    </div>
  );
};
