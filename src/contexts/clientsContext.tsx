import axios from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { OperatorsContext } from './operatorsContext';

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

  const { operators } = useContext(OperatorsContext);

  useEffect(() => {
    (async () => {
      const clients = await axios
        .get<OperatorClients[]>(`${process.env.NEXT_PUBLIC_API}clients`)
        .then(response => response.data);

      setClients(clients);
    })()
  }, [operators])

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
