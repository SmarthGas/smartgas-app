import { X } from '@phosphor-icons/react';
import React from 'react';
interface ModalProps {
  title: string;
  children: React.ReactNode;
  closeModal?: () => void;
}
export const Modal = ({ title, children, closeModal }: ModalProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-cream-100"
        onClick={closeModal}
      >
        <div
          className="flex flex-col bg-brand-400 p-4 gap-8 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between items-center">
            <h1>{title}</h1>
            <X size={24} onClick={closeModal} className="cursor-pointer" />
          </header>
          <main className="px-8">{children}</main>
        </div>
      </div>
    </>
  );
};
