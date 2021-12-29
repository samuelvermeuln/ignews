import Head from 'next/head'

import styles from './Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ig-/News</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> Hey welcome</span>
          <h1>
            News about the <span>React</span> World.{" "}
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}