import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { ClientsContext, OperatorClients } from "../../contexts/clientsContext";
import { ClientListContainer } from "./styles";

type ClientsListProps = {
  clients: OperatorClients[]
}

export default function ClientsList({ clients: initialClients }: ClientsListProps) {
  const { clients, setClients } = useContext(ClientsContext)

  useEffect(() => {
    setClients(initialClients)
  }, [])

  return (
    <ClientListContainer>
      <h2>Clientes</h2>
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
                  <p>{client.value}</p>
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
  )
}