import React, { useState } from 'react';
import { SignUpForm } from './SignUpForm';
import { SignInForm } from './SignInForm';

export const Login = () => {
  // Resgata a localização atual da página para definir a aba ativa
  const [loginMode, setLoginMode] = useState<'sign_up' | 'sign_in'>('sign_up');

  return (
    <div className="flex flex-col w-screen absolute top-0 left-0 h-full bg-brand-300 px-16 items-center p-[10vh]">
      <div
        id="content"
        className="flex flex-col pt-2 pb-24 w-max h-max inset-0 space-y-8"
      >
        <div id="tabs" className="w-full">
          <button
            className={`w-60 h-12.5 text-cream-100 text-xs ${loginMode === 'sign_up' ? 'border-b-2' : ''}`}
            onClick={() => setLoginMode('sign_up')}
          >
            Inscrever-se
          </button>
          <button
            className={`w-60 h-12.5 text-cream-100 text-xs ${loginMode === 'sign_in' ? 'border-b-2' : ''}`}
            onClick={() => setLoginMode('sign_in')}
          >
            Login
          </button>
        </div>

        <div
          id="section_title"
          className="text-cream-100 text-4xl font-semibold"
        >
          <p>{loginMode === 'sign_up' ? 'Inscrever-se' : 'Login'}</p>
        </div>

        {loginMode === 'sign_up' && (
          <div>
            <SignUpForm />
          </div>
        )}
        {loginMode === 'sign_in' && (
          <div>
            <SignInForm />
          </div>
        )}
      </div>
      <div className="h-18"></div>
    </div>
  );
};
