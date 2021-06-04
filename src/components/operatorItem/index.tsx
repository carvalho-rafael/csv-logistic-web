import { useContext, useRef, useState } from "react";
import { Operator, OperatorsContext } from "../../contexts/operatorsContext";

import { Button, Input } from "@material-ui/core";
import { ArrowRight, Delete, Edit } from "@material-ui/icons";
import { OperatorItemContainer, OperatorItemName } from "./styles";

type OperatorItemProps = {
  operator: Operator
}

export default function OperatorItem({ operator }: OperatorItemProps) {
  const [editing, setEditing] = useState(false);
  const { deleteOperator, updateOperator } = useContext(OperatorsContext);

  const editInputRef = useRef<HTMLInputElement>();

  async function deleteButtonHandler(id: number) {
    await deleteOperator(id);
  }

  function editButtonHandler(id: number) {
    setEditing(prevState => !prevState);
  }

  async function updateButtonHandler(id: number) {
    const nome = editInputRef.current.value;
    await updateOperator(id, nome);
    setEditing(false);
  }

  return (

    <OperatorItemContainer key={operator.id}>
      <Button onClick={() => editButtonHandler(operator.id)}>
        <Edit />
      </Button>
      <Button onClick={() => deleteButtonHandler(operator.id)}>
        <Delete />
      </Button>
      <OperatorItemName>
        {!editing ? (
          <p>{operator.nome}</p>
        ) : (
          <>
            <Input
              defaultValue={operator.nome}
              inputRef={editInputRef}
            />
            <Button onClick={() => updateButtonHandler(operator.id)}>
              <ArrowRight />
            </Button>
          </>
        )}
      </OperatorItemName>
    </OperatorItemContainer>
  )
}
