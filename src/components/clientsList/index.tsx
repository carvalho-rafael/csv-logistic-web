import { Accordion, AccordionDetails, AccordionSummary, Button } from "@material-ui/core";
import { CloudDownload, FontDownload, List, Reorder } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ClientsContext, OperatorClients } from "../../contexts/clientsContext";
import { OperatorsContext } from "../../contexts/operatorsContext";
import { ClientListContainer } from "./styles";

type ClientsListProps = {
  clients: OperatorClients[]
}

export default function ClientsList({ clients: initialClients }: ClientsListProps) {
  const { clients, setClients } = useContext(ClientsContext)
  const [dowloading, setDownloading] = useState(false)
  const [distributing, setDistributing] = useState(false)

  const { operators } = useContext(OperatorsContext)

  useEffect(() => {
    setClients(initialClients)
  }, [])

  async function distributeButtonHandler() {
    setDistributing(true)

    const distributedClients = await axios
      .put<OperatorClients[]>(`${process.env.NEXT_PUBLIC_API}clients/distribute`)
      .then(response => response.data);

    setClients(distributedClients)

    setDistributing(false);
  }

  async function dowloadButtonHandler() {
    setDownloading(true)

    window.open(`${process.env.NEXT_PUBLIC_API}clients/download`)

    setDownloading(false);
  }

  return (
    <>
      <h2>Clientes</h2>
      <ClientListContainer>
        <Button
          onClick={distributeButtonHandler}
          disabled={distributing || operators.length === 0}
        >
          <Reorder />
          <span style={{ marginLeft: '.5rem' }}> Redistribuir Clients</span>
        </Button>
        <Button
          onClick={dowloadButtonHandler}
          disabled={dowloading || operators.length === 0}
        >
          <CloudDownload />
          <span style={{ marginLeft: '.5rem' }}> Baixar CSV</span>
        </Button>
        {clients.length > 0 ? (
          clients.map(operator => (
            <Accordion key={operator.id}>
              <AccordionSummary>
                <p>
                  <strong>{operator.nome}</strong> [Clientes: {operator.clients?.length}]
              </p>
              </AccordionSummary>
              <AccordionDetails style={{ flexWrap: 'wrap' }}>
                {operator.clients?.map(client => (
                  <div key={client.id} style={{ padding: '2rem' }}>
                    <p><strong>{client.nome}</strong></p>
                    <p>Aniversário: {client.aniversario}</p>
                    <p>Valor: {client.valor}</p>
                    <p>Email: {client.email}</p>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <p>Nenhum cliente cadastrado</p>
        )}
      </ClientListContainer>
    </>
  )
}