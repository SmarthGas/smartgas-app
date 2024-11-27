// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

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
}

// Criando o contexto com um valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Componente Provider do Contexto
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
