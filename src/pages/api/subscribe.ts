
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";
import { stripe } from './../../services/Stripe';

// cook se tiver no mesmo dominio pode ser acessado pelo next e pelo client(navegado)
// localStorage so esta disponivel no navegador

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        const session = await getSession({ req });

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
          customer: stripeCustomer.id,
          payment_method_types: ["card"],
          billing_address_collection: "required",
            line_items: [
                { price: "price_1K6luuH16N4I61YgGBqe4Nuv" }
            ],
          mode: "subscription", // PAGAMENTO RECORRENTE
          allow_promotion_codes: true, // LIBERA PAGAMENTO COM CUPONS
          cancel_url: process.env.STRIPE_SUCCESS_URL,
          success_url: process.env.STRIPE_CANCEL_URL,
        });

        return res.status(200).json({ sessionId: stripeCheckoutSession });
        
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}