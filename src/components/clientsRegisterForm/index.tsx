import { Button, Input } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";
import { useState, ChangeEvent, useContext, useRef } from "react";
import { ClientsContext, OperatorClients } from "../../contexts/clientsContext";
import { FormContainer } from "./styles";

export default function ClientsRegisterForm() {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [selected, setSelected] = useState(false)
  const { setClients } = useContext(ClientsContext)

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