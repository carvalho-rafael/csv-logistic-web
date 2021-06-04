import { Button, Container, FormGroup, Input, InputLabel } from "@material-ui/core";
import { Add, ArrowRight, Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { OperatorsContext } from "../../contexts/operatorsContext";
import OperatorItem from "../operatorItem";
import { OperatorListContainer } from "./styles";

type Operator = {
  id: number,
  nome: string
}
type OperatorsListProps = {
  operators: Operator[]
}

export default function OperatorsList({ operators: initialOperators }: OperatorsListProps) {
  const {operators, setOperators} = useContext(OperatorsContext);
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    setOperators(initialOperators)
  }, [])

  function addButtonHandler() {
    //axios.post()
    setCreating(prevState => !prevState)
  }
  function createButtonHandler() {
    //axios.post()
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
          <Input type="text" />
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