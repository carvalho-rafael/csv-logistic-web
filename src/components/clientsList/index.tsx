import { Accordion, AccordionDetails, AccordionSummary, Button } from "@material-ui/core";
import { CloudDownload, FontDownload } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ClientsContext, OperatorClients } from "../../contexts/clientsContext";
import { ClientListContainer } from "./styles";

type ClientsListProps = {
  clients: OperatorClients[]
}

export default function ClientsList({ clients: initialClients }: ClientsListProps) {
  const { clients, setClients } = useContext(ClientsContext)
  const [dowloading, setDownloading] = useState(false)

  useEffect(() => {
    setClients(initialClients)
  }, [])

  async function dowloadButtonHandler() {
    setDownloading(true)
    
    window.open(`${process.env.NEXT_PUBLIC_API}clients/download`)

    setDownloading(false);
  }

  return (
    <>
      <h2>Clientes</h2>
      <ClientListContainer>
        <Button onClick={dowloadButtonHandler} disabled={dowloading}>
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
                    <p>{client.nome}</p>
                    <p>{client.aniversario}</p>
                    <p>{client.valor}</p>
                    <p>{client.email}</p>
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