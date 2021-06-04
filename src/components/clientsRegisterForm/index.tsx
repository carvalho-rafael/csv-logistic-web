import { Button, ButtonBase, FormGroup, Input, InputLabel } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";
import { useState, ChangeEvent, useContext } from "react";
import { Client, ClientsContext, OperatorClients } from "../../contexts/clientsContext";
import { FormContainer } from "./styles";

export default function ClientsRegisterForm() {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [selected, setSelected] = useState(false)
  const { setClients } = useContext(ClientsContext)

  function onChangeFileHandler(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files[0])
    setSelected(true);
  }

  async function uploadButtonHandler() {
    if (!selected) return;

    const data = new FormData()
    data.append('file', selectedFile)
    const savedClients = await axios
      .post<OperatorClients[]>(`${process.env.NEXT_PUBLIC_API}clients`, data)
      .then(response => response.data);

    setClients(savedClients)
  }

  return (
    <FormContainer>
      <label htmlFor='file'>
        <CloudUpload />
        <span>Selecionar arquivo</span>
      </label>
      <Input style={{ display: 'none' }} type="file" name="file" id='file' onChange={onChangeFileHandler} />
      <Button
        type="button"
        onClick={uploadButtonHandler}
        disabled={!selected}>
        <span>Enviar {selectedFile?.name && `[${selectedFile?.name}]`}</span>
      </Button>
    </FormContainer>
  )
}