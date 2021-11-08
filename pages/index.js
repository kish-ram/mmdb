import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>MMDb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Wecome to MMDb
        </h1>

        <p className="description">
          Get started by searching you favorite movies <Link href="/search">here!</Link>
        </p>

      </main>

    </div>
  )
}
