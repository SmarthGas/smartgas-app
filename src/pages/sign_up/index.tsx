import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm';
import { SignInForm } from '../../components/SignInForm';

export const SignupPage = () => {
  // Resgata a localização atual da página para definir a aba ativa
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const getTitle = () => {
    return isActive('/sign_up') ? 'Inscreva-se' : 'Login';
  };

  return (
    <div className="flex flex-col w-screen absolute top-0 left-0 h-full bg-brand-300 px-16 place-content-center">
      <div className="flex flex-col h-18"></div>
      <div
        id="content"
        className="flex flex-col pt-2 pb-24 w-max h-max inset-0 m-auto space-y-8"
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
          id="section_title"
          className="text-cream-100 text-4xl font-semibold"
        >
          <p>{getTitle()}</p>
        </div>

        <div>{isActive('/sign_up') ? <SignUpForm /> : <SignInForm />}</div>
      </div>
      <div className="h-18"></div>
    </div>
  );
};
