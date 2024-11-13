import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/Button';

export const SignupPage = () => {
  // Resgata a localização atual da página para definir a aba ativa
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

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
    <div className="flex flex-col w-screen absolute top-0 left-0 h-full bg-brand-300 px-16 place-content-center">
      <div className="flex flex-col h-18"></div>
      <div
        id="content"
        className="flex flex-col pt-2 pb-24 w-max h-max inset-0 m-auto"
      >
        <div id="tabs" className="w-full">
          <Link to="/sign_up">
            <button
              className={`w-60 h-12.5 text-cream-100 text-xs ${isActive('/sign_up') ? 'border-b-2' : ''}`}
            >
              Inscreva-se
            </button>
          </Link>
          <Link to="/">
            <button
              className={`w-60 h-12.5 text-cream-100 text-xs ${isActive('/') ? 'border-b-2' : ''}`}
            >
              Login
            </button>
          </Link>
        </div>

        <div
          id="section title"
          className="text-cream-100 text-4xl font-semibold"
        >
          <p>Inscreva-se</p>
        </div>

        <form
          id="form"
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="name_input"
                className="text-cream-100 text-xs w-max"
              >
                Nome
              </label>
              <input
                id="name_input"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="p-3"
              ></input>
            </div>

            <div className="flex flex-col">
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
                className="p-3"
              ></input>
            </div>
          </div>

          <Button
            label="Inscreva-se"
            variant="primary"
            className="w-max"
            type="submit"
          />
        </form>
      </div>
      <div className="h-18"></div>
    </div>
  );
};
