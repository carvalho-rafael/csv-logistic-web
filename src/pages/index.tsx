import { Container } from '@material-ui/core'
import Head from 'next/head'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>CSV- Logistic</title>
      </Head>
      <Navbar />
      <Container>
        <main>
          <p>Hello</p>
        </main>
      </Container>
    </>
  )
}
