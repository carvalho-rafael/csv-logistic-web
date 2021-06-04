import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type Client = {
  id: number,
  nome: string,
  email: string,
  aniversario: string,
  value: number
}

export type OperatorClients = {
  id: number,
  nome: string,
  clients: Client[]
}

interface ClientsContextData {
  clients: OperatorClients[],
  setClients: Dispatch<SetStateAction<OperatorClients[]>>,
}

interface ClientsProviderProps {
  children: ReactNode;
}

export const ClientsContext = createContext({} as ClientsContextData);

export function ClientsProvider({ children }: ClientsProviderProps) {

  const [clients, setClients] = useState<OperatorClients[]>([]);

  return (
    <ClientsContext.Provider
      value={{
        clients,
        setClients
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}

