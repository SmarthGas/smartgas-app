import { X } from '@phosphor-icons/react';
import React, { useState } from 'react';
interface ModalProps {
  title: string;
  name: string;
  children: React.ReactNode;
  closeModal?: () => void;
}
export const Modal = ({ title, name, children, closeModal }: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-cream-100">
        <div className="flex flex-col bg-brand-400 p-4 gap-8 rounded-lg md:w-1/2">
          <header className="flex justify-between items-center">
            <h1>{title}</h1>
            <X size={24} onClick={closeModal} />
          </header>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
