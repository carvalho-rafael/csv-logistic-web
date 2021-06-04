import { Button, Input } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";
import { useState, ChangeEvent, useContext, useRef } from "react";
import { ClientsContext, OperatorClients } from "../../contexts/clientsContext";
import { OperatorsContext } from "../../contexts/operatorsContext";
import { FormContainer } from "./styles";

export default function ClientsRegisterForm() {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [selected, setSelected] = useState(false)
  const { setClients } = useContext(ClientsContext)
  const { operators } = useContext(OperatorsContext)

  const fileRef = useRef<HTMLInputElement>();

  function onChangeFileHandler(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files[0])
    setSelected(true);
  }

  async function uploadButtonHandler() {
    const data = new FormData()
    data.append('file', selectedFile)
    const savedClients = await axios
      .post<OperatorClients[]>(`${process.env.NEXT_PUBLIC_API}clients`, data)
      .then(response => response.data);

    setClients(savedClients)
    setSelectedFile(null)
    setSelected(false)
  }

  if(operators.length === 0) {
    return(
      <p>Cadastre pelo menos um Operador antes de adicionar clients.</p>
    )
  }

  return (
    <FormContainer>
      <label htmlFor='file'>
        <CloudUpload />
        <span>Adicionar Clientes</span>
      </label>
      <Input
        style={{ display: 'none' }}
        type="file"
        name="file"
        id='file'
        onChange={onChangeFileHandler}
        inputRef={fileRef}
      />
      <Button
        type="button"
        onClick={uploadButtonHandler}
        disabled={!selected}>
        <span>Enviar {selectedFile?.name && `[${selectedFile?.name}]`}</span>
      </Button>
    </FormContainer>
  )
}