import React, { useState } from 'react';
import { Button } from '../../components/Button';

export const ResetPassword = () => {
  // constantes que controlam os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
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

  // Controle da etapa do formulário
  const [step, setStep] = useState(1);

  return (
    <div id="section_title" className="flex flex-col w-max h-auto space-y-6">
      <h1 id="title" className="text-4xl font-semibold">
        Redefinir Senha
      </h1>

      {step === 1 ? (
        <div>
          <h2 id="text">
            Informe o endereço de email associado à sua conta para alterar sua
            senha.
          </h2>
          <form
            id="email_form"
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email_input"
                className="text-cream-100 text-xs w-max"
              >
                Email
              </label>
              <input
                id="email_input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3"
              ></input>
            </div>

            <div className="flex justify-center">
              <Button
                label="avançar"
                variant="primary"
                className="w-max"
                type="submit"
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2 id="text">
            Informe o endereço de email associado à sua conta para alterar sua
            senha.
          </h2>
          <form
            id="email_form"
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email_input"
                className="text-cream-100 text-xs w-max"
              >
                Email
              </label>
              <input
                id="email_input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3"
              ></input>
            </div>

            <div className="flex justify-center">
              <Button
                label="avançar"
                variant="primary"
                className="w-max"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
