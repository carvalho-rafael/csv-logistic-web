import React, { useContext, useEffect, useRef, useState } from "react";
import { Operator, OperatorsContext } from "../../contexts/operatorsContext";

import { Button, Input } from "@material-ui/core";
import { Add, ArrowRight } from "@material-ui/icons";
import OperatorItem from "../operatorItem";
import { OperatorListContainer } from "./styles";

type OperatorsListProps = {
  operators: Operator[]
}

export default function OperatorsList({ operators: initialOperators }: OperatorsListProps) {
  const { operators, setOperators, createOperator } = useContext(OperatorsContext);
  const [creating, setCreating] = useState(false)

  const createInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setOperators(initialOperators)
  }, [])

  function addButtonHandler() {
    setCreating(prevState => !prevState)
  }

  async function createButtonHandler() {
    const nome = createInputRef.current.value;
    await createOperator(nome);
    setCreating(false)
  }

  return (
    <OperatorListContainer>
      <h2>Operadores</h2>
      {!creating ? (
        <Button onClick={() => addButtonHandler()}>
          <Add />
            Criar novo
        </Button>
      ) : (
        <>
          <Input
            type="text"
            inputRef={createInputRef}
          />
          <Button onClick={() => createButtonHandler()}>
            <ArrowRight />
          </Button>
        </>
      )}
      <hr />
      {operators.length > 0 ? (
        operators.map(operator => (
          <OperatorItem key={operator.id} operator={operator} />
        ))
      ) : (
        <p>Nenhum Operador Cadastrado</p>
      )}
    </OperatorListContainer>
  )
}
