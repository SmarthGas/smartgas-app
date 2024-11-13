import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';

export const SignInForm = () => {
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
            required
            className="p-3"
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
            required
            className="p-3"
          ></input>
        </div>
      </div>

      <Button
        label="Entrar"
        variant="primary"
        className="w-max"
        type="submit"
      />
    </form>
  );
};
