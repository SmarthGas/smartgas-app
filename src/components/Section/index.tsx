import React, { useState } from 'react';
import { Button } from '../Button';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  backButton?: boolean;
}

export const Section = ({ children, title, backButton }: SectionProps) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const toggleSidebar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  return (
    <div className="flex flex-col w-full absolute top-0 left-0 h-full bg-brand-300">
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpenSideBar} />
      <div className="w-full flex items-center p-2">
        <Button icon="list" variant="transparent" onClick={toggleSidebar} />
        <h1>SmartGas</h1>
      </div>

      <div
        className={`flex-grow flex-col gap-4 flex py-4 px-6 transition-all duration-300 ${isOpenSideBar ? 'pl-[300px]' : 'pl-10'} bg-brand-200`}
      >
        <Header title={title} showBackButton={backButton} />
        {children}
      </div>
    </div>
  );
};
