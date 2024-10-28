import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
}

export const NavItem = ({ icon, title, to }: NavItemProps) => {
  return (
    <Link to={to} className="flex items-center gap-4 p-4 hover:bg-gray-700">
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  );
};
