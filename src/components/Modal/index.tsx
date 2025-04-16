import { X } from '@phosphor-icons/react';
import React from 'react';
interface ModalProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  closeModal?: () => void;
  className?: string;
}
export const Modal = ({
  title,
  subtitle,
  children,
  closeModal,
}: ModalProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-cream-100"
        onClick={closeModal}
      >
        <div
          className="flex flex-col bg-brand-400 p-8 gap-8 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-start">{title}</h1>
              <h2 className="text-xs text-cream-100">{subtitle}</h2>
            </div>
            {/* close button */}
            <X size={24} onClick={closeModal} className="cursor-pointer" />
          </header>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
