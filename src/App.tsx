import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { UserProvider } from './providers/userContext';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
