import React from 'react';
import { SignInForm } from './SignInForm';

export const Login = () => {
  // Resgata a localização atual da página para definir a aba ativa

  return (
    <div className="flex flex-col w-screen absolute top-0 left-0 h-full bg-brand-300 px-16 items-center p-[10vh]">
      <div
        id="content"
        className="flex flex-col pt-2 pb-24 w-max h-max inset-0 space-y-8"
      >
        <div id="tabs" className="w-full"></div>

        <div
          id="section_title"
          className="text-cream-100 text-4xl font-semibold"
        >
          <p>Login</p>
        </div>

        <div>
          <SignInForm />
        </div>
      </div>
      <div className="h-18"></div>
    </div>
  );
};
