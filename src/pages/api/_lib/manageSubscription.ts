import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../../services/Stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
) {
    
    const iserRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
            q.Match(
                q.Index('user_by_stipe_customer_id'),
                customerId
            )
        )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
      id: subscription.id,
      userId: iserRef,
      status: subscription.status,
      price_id: subscription.items[0].price.id
    };

    if (createAction === true) {
        await fauna.query(
            q.Create(
                q.Collection('subscripitions'),
                { data: subscriptionData }
            )
        )
    } else {
        q.Replace(
            q.Select(
                "ref",
                q.Get(
                    q.Match(
                        q.Index('subscripition_by_id'),
                        customerId
                    )
                )
            ),
            {data: subscriptionData}
        )
    }


}