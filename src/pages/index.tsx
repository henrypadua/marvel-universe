import Head from 'next/head'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { HeaderHome } from '@/components/HeaderHome'
import { HeroList } from '@/components/HeroList'

export default function Home() {
  return (
    <div className="relative min-h-screen flex-col">
      <Head>
        <title>Marvel Search Hero</title>
      </Head>

      <HeaderHome />

      <main className="pb-28">
        <Container>
          <HeroList />
        </Container>
      </main>

      <Footer />
    </div>
  )
}
