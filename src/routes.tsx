import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Users } from './pages/users';
import { Login } from './pages/login';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};
