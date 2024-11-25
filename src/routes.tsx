import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Users } from './pages/users';
import { SignupPage } from './pages/sign_up';
import { ForgotPassword } from './pages/forgot_password';
import { ResetPassword } from './pages/reset_password';
import { Login } from './pages/login';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:userId" element={<ResetPassword />} />
      <Route path="/sign_up" element={<SignupPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};
