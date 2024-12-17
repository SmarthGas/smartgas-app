import React from 'react';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const Header = ({ title, showBackButton }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col  gap-2 items-start font-bold">
      {showBackButton && (
        <div className="ml-[-20px]">
          <Button
            icon="arrowLeft"
            variant="transparent"
            label="Voltar"
            onClick={() => navigate(-1)}
          />
        </div>
      )}

      <p className="text-xl">{title}</p>
    </header>
  );
};
