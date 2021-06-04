import axios from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type Operator = {
  id: number,
  nome: string,
}

interface OperatorsContextData {
  operators: Operator[],
  setOperators: Dispatch<SetStateAction<Operator[]>>,
  createOperator: () => Promise<void>,
  deleteOperator: (id: number) => Promise<void>,
  updateOperator: (id:number, nome: string) => Promise<void>
}

interface OperatorsProviderProps {
  children: ReactNode;
}

export const OperatorsContext = createContext({} as OperatorsContextData);

export function OperatorsProvider({ children }: OperatorsProviderProps) {

  const [operators, setOperators] = useState<Operator[]>([]);

  async function createOperator() {

  }

  async function deleteOperator(id: number) {

  }

  async function updateOperator(id: number, nome: string) {
    console.log(nome)
    const updatedOperators = await axios
      .patch(`${process.env.NEXT_PUBLIC_API}operators/${id}`, {name: nome})
      .then(response => response.data);

    setOperators(updatedOperators)
  }

  return (
    <OperatorsContext.Provider
      value={{
        operators,
        setOperators,
        createOperator,
        deleteOperator,
        updateOperator
      }}
    >
      {children}
    </OperatorsContext.Provider>
  )
}

