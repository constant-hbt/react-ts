import React from "react";
import useFetch from "./useFetch";

type User = {
  id: number;
  nome: string;
  idade: number;
  aulas: number;
  cursos: number;
  preferencias: {
    playback: number;
    volume: number;
    qualidade: string;
  }
}

type IUserContext = {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const UserContext = React.createContext<IUserContext | null>(null);

export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (context === null)
    throw new Error('useContext deve estar dentro do provider');

  return context;
}

export const UserContextProvider = ({children}: React.PropsWithChildren) => {

  const { data: user, loading, error } = useFetch<User>(`https://data.origamid.dev/usuarios/1`);

  return (
    <UserContext.Provider value={{ user, loading, error }} >
      {children}
    </UserContext.Provider>
  );
}