import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { ClientsProvider, OperatorClients } from '../contexts/clientsContext'
import { Operator, OperatorsProvider } from '../contexts/operatorsContext'

import OperatorClientsList from '../components/clientsList'
import ClientsRegisterForm from '../components/clientsRegisterForm'
import Navbar from '../components/navbar'
import OperatorsList from '../components/operatorsList'

import { ClientsContainer, HomeContainer } from '../styles/pages/index'

type HomeProps = {
  operators: Operator[],
  clients: OperatorClients[]
}

export default function Home({ operators, clients }: HomeProps) {
  return (
    <>
      <Head>
        <title>CSV- Logistic</title>
      </Head>
      <Navbar />
      <OperatorsProvider>
        <ClientsProvider>
          <HomeContainer>
            <main>
              <ClientsContainer>
                <ClientsRegisterForm />
                <OperatorClientsList clients={clients} />
              </ClientsContainer>
              <OperatorsList operators={operators} />
            </main>
          </HomeContainer>
        </ClientsProvider>
      </OperatorsProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const operators = await axios
    .get(`${process.env.NEXT_PUBLIC_API}operators`)
    .then(response => response)

  const clients = await axios
    .get(`${process.env.NEXT_PUBLIC_API}clients`)
    .then(response => response)

  return {
    props: {
      operators,
      clients
    }
  }
}
