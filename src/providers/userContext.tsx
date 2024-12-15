// src/context/UserContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import api from '../lib/api';

// Definindo o tipo para o usuário
interface User {
  id: string;
  name: string;
  email: string;
}

// Definindo o tipo para o contexto (pode ser o valor do contexto ou uma função de atualização)
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

// Criando o contexto com um valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Componente Provider do Contexto
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const { data } = await api.get<{
        id: string;
        name: string;
        email: string;
      }>('/auth/me');

      setUser(data);

      console.log(data);
    } catch (error) {
      console.log(error);
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado para consumir o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
