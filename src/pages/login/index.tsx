import React from 'react';
import { SignInForm } from './SignInForm';
import { Brain } from '@phosphor-icons/react';

export const Login = () => {
  // Resgata a localização atual da página para definir a aba ativa

  return (
    <div className="flex flex-col w-screen absolute top-0 left-0 h-full bg-brand-300 px-16 items-center p-[20vh]">
      <div
        id="content"
        className="flex w-[40vw] h-max items-center justify-center bg-white/5 rounded-lg shadow-lg p-8 gap-4"
      >
        <div className="flex flex-col w-full">
          <div className="flex justify-between  w-full">
            <div className="flex items-center gap-4 w-1/2 justify-center ">
              <Brain size={32} color="#fff" />
              <h1>SmartGas</h1>
            </div>
            <div className="flex flex-col w-1/2 px-4 justify-end items-center gap-4">
              <div className="flex w-full p-8">
                <h1 className="text-sm font-bold">Iniciar sessão</h1>
              </div>

              <SignInForm />
            </div>
          </div>
        </div>
      </div>
      <div className="h-18"></div>
    </div>
  );
};
