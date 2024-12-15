import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import api from '../../lib/api';
// import { useLocation } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'forgot-password' | 'email-sent'>(
    'forgot-password'
  );

  const handleSubmit = async () => {
    // TODO: fazer a requisição à API para enviar o email
    console.log('data: ', email);

    try {
      await api.post('/auth/forget', { email });
      setStep('email-sent');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  };

  // const handleResendCode = () => {
  //   // TODO: fazer a requisição à API para reenviar o código
  //   console.log('Reenviando código...');
  // };

  return (
    <div className="flex flex-col absolute top-0 left-0 w-screen h-screen bg-brand-200 items-center p-[10vh]">
      <div
        id="section_title"
        className="flex flex-col w-max h-auto space-y-6 bg-brand-200"
      >
        {step === 'forgot-password' && (
          <div className="space-y-6 text-cream-100">
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
        {step === 'email-sent' && (
          <div className="space-y-6 text-cream-100">
            <div className="space-y-2">
              <h2 id="text" className="font-semibold text-4xl">
                Link enviado!
              </h2>
              <h3 id="text">
                Verifique sua caixa de entrada e clique no link enviado.
              </h3>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex justify-center">
                <Button label="Reenviar link" variant="primary" type="button" />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
