import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Sidebar } from './components/Sidebar';

function App() {

    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
