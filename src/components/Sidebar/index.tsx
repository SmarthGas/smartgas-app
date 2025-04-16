import { HandCoins, Note, SignOut, Users } from '@phosphor-icons/react';
import React from 'react';
import { Button } from '../Button';
import { NavItem } from './NavItem';
import { useUser } from '../../providers/userContext';
import { useSnackbar } from 'notistack';
import { User } from '@phosphor-icons/react/dist/ssr';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useUser();
  const handleSignOut = () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Erro ao sair', { variant: 'error' });
    }
  };

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
          {/* <li>
            <NavItem icon={<Package size={16} />} title="Estoque" to="/stock" />
          </li> */}
          <li>
            <NavItem
              icon={<HandCoins size={16} />}
              title="Fornecedores"
              to="/suppliers"
            />
          </li>
          <li>
            <NavItem icon={<Note size={16} />} title="Pedidos" to="/orders" />
          </li>
          <li>
            <NavItem icon={<User size={16} />} title="Clientes" to="/clients" />
          </li>
          {/* <li>
            <NavItem icon={<Info size={16} />} title="Sobre" to="/about" />
          </li> */}
        </ul>
        <div className="flex flex-col justify-end h-full">
          <div onClick={handleSignOut}>
            <NavItem icon={<SignOut size={16} />} title="Sair" to="/login" />
          </div>
        </div>
      </div>
    </div>
  );
};
