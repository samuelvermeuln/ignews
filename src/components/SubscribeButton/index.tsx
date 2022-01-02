import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import { apiAxios } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

interface SubscriberButtonProps {
    priceId: string;
}

// ONDE PODE COLOCAR VARIAVEL DE AMBIENTE
  // getServerSideProps (SSR)
  // getStaticProps (SSG)
  // API routes
//

export function SubscriberButton({ priceId }: SubscriberButtonProps) {

  const { data: session } = useSession();

  async function handleSubscripe() {
    try {
      if (!session) {
        signIn("github");
        return;
      }
    } catch (error) {
      console.log("handleSubscripe => error", error);
    }

    try {
      const response = await apiAxios.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId: sessionId });
    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }
    
  }

  return (
    <>
      <button
        type="button"
        className={styles.subscriberButton}
        onClick={handleSubscripe}
      >
        {!!session ? "Subscribe now" : "Fazer login"}
      </button>
    </>
  );
}
