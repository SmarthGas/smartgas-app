import React, { useState } from 'react';
import { Button } from '../Button';
import { List } from '@phosphor-icons/react';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
}

export const Section = ({ children, title }: SectionProps) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  return (
    <div className="flex flex-col w-screen absolute top-0 left-0 h-full bg-brand-300">
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpenSideBar} />
      <div className="w-full flex items-center p-2">
        <Button
          icon={<List size={22} />}
          variant="transparent"
          onClick={toggleSidebar}
        />
        <h1>SmartGas</h1>
      </div>

      <div className={`flex-grow flex-col gap-4 flex py-4 px-6 transition-all duration-300 ${isOpenSideBar ? 'pl-[300px]' : 'pl-10'}`}>
        <Header title={title} />
        {children}
      </div>
    </div>
  );
};
