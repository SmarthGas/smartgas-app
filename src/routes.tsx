import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Users } from './pages/users';
import { useUser } from './providers/userContext';
import { Login } from './pages/login';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    console.log('User not logged in');
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
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
    </Routes>
  );
};
