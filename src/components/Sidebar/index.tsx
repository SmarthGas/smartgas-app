import { Info, Note, Package, Users } from '@phosphor-icons/react';
import React from 'react';
import { Button } from '../Button';
import { NavItem } from './NavItem';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-brand-400 shadow-xl text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex justify-between items-center p-2">
          <span className="flex w-full pl-2">
            <h1>SmartGas</h1>
          </span>
          <Button
            icon="close"
            variant="transparent"
            onClick={toggleSidebar}
            className="p-2"
          />
        </div>
        <ul className="text-sm">
          <li>
            <NavItem icon={<Users size={16} />} title="Usuários" to="/users" />
          </li>
          <li>
            <NavItem icon={<Package size={16} />} title="Estoque" to="/stock" />
          </li>
          <li>
            <NavItem icon={<Note size={16} />} title="Pedidos" to="/orders" />
          </li>
          <li>
            <NavItem icon={<Info size={16} />} title="Sobre" to="/about" />
          </li>
        </ul>
      </div>
    </div>
  );
};
