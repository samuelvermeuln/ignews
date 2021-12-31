import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";

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
  
  function handleSubscripe() {
    if (!session) {
      signIn('github')
      return;
    }

    
  }

  return (
    <button
      type="button"
      className={styles.subscriberButton}
      onClick={handleSubscripe}
    >
      Subscribe now
    </button>
  );
}
