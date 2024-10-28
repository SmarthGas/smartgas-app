import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex flex-col items-start">
      <p>{title}</p>
    </header>
  );
};
