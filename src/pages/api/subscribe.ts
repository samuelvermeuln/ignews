
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { stripe } from './../../services/Stripe';
import { fauna } from '../../services/fauna';

// cook se tiver no mesmo dominio pode ser acessado pelo next e pelo client(navegado)
// localStorage so esta disponivel no navegador

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id:string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
     
    if (req.method === "POST") {
          
        const session = await getSession({ req });

        const user = await fauna.query<User>(
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(session.user.email)
              )
            )
        );

        
        let cutomerId = user.data.stripe_customer_id;
        
        if (!cutomerId) {
          const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
          });
          

          await fauna.query(
              q.Update(
                  q.Ref(q.Collection('users'), user.ref.id),
                  {
                      data: {
                          stripe_customer_id: stripeCustomer.id
                      }
                  }
              )
          )
  
          cutomerId = stripeCustomer.id;// POR ISSO LET PORQUE REATRIBUI O VALOR DA VARIAVEL          
        }
      

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
          customer: cutomerId,
          payment_method_types: ["card"],
          billing_address_collection: "required",
          line_items: [
            { price: "price_1K6luuH16N4I61YgGBqe4Nuv", quantity: 1 },
          ],
          mode: "subscription", // PAGAMENTO RECORRENTE
          allow_promotion_codes: true, // LIBERA PAGAMENTO COM CUPONS
          cancel_url: process.env.STRIPE_SUCCESS_URL,
          success_url: process.env.STRIPE_CANCEL_URL,
          
        });

        return res.status(200).json({ sessionId: stripeCheckoutSession.id });

      } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method not allowed");
    }
    
   } catch (error) {
       console.log("error stripeCheckoutSession",error);
   }
}