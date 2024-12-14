import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Users } from './pages/users';
import { ForgotPassword } from './pages/forgot_password';
import { ResetPassword } from './pages/reset_password';
import { Login } from './pages/login';
import { useUser } from './providers/userContext';
import { Suppliers } from './pages/suppliers';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

interface PublicRoutesProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { user } = useUser();
  const token = localStorage.getItem('token'); // Verifica o token

  if (!user && !token) {
    console.log('User not logged in');
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const PublicRoute: React.FC<PublicRoutesProps> = ({ children }) => {
  const { user } = useUser();
  const token = localStorage.getItem('token'); // Verifica o token

  if (user || token) {
    console.log('User is logged in');
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:userId" element={<ResetPassword />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <Suppliers />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
