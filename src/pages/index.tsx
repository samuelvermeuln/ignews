import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscriberButton } from '../components/SubscribeButton';
import { stripe } from '../services/Stripe';
import styles from './home.module.scss';

// CLIENTE - SIDE
// SERVER-SIDE
// STATIC SITE GENERATION

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
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
            <span>for {product.amount} month</span>
          </p>
          <SubscriberButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

// PARA GERAR PAGINAS STATICAS E PRECISO USAR ESSA FUNÇÃO QUE SÓ FUNCIONA EM PAGINA NÃO EM COMPONENTE
// SEMPRE ASYNC
export const getStaticProps: GetStaticProps = async () => {
  // TODA CHAMADA A API FICA AQUI NESSA 'FUNÇÃO' ESSA E A CAMADA BACKEND-NODE DO NEXT

  const price = await stripe.prices.retrieve("price_1K6luuH16N4I61YgGBqe4Nuv", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    // ISSO VALIDA A PAGINA A CATA TANTOS SEGUNDOS 
    revalidate: 60 * 60 * 24, // 24 Horas
  };
};

// SEMPRE ASYNC
// export const getServerSideProps: GetServerSideProps = async () => {
//   // TODA CHAMADA A API FICA AQUI NESSA 'FUNÇÃO' ESSA E A CAMADA BACKEND-NODE DO NEXT

//   const price = await stripe.prices.retrieve("price_1K6luuH16N4I61YgGBqe4Nuv", {
//     expand: ["product"],
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price.unit_amount / 100),
//   };

//   return {
//     props: {
//       product,
//     },
//   };
// };