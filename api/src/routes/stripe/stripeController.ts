import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); 


export async function getKeys(req: Request, res: Response) {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY});
}

export async function createPaymentIntent(req: Request, res: Response) {
    const { orderId } = req.body;
    //const [order]= await db
   // .select()
    //.from(ordersTable)
    //.where(eq(ordersTable.id, orderId));
    
    const orderItems = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, orderId));

    const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const amount = Math.floor(total * 100);

    if (amount === 0) {
        res.status(400).json({ message: 'Order total is 0' });
        return;
      }

    const customer = await stripe.customers.create();
    
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id },
        {apiVersion: '2024-09-30.acacia'}
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: customer.id,
      });

      res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
    
}

export async function webhook(req: Request, res: Response) {
    console.log(req.body);
    const event =req.body;

    // Handle the event

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.json({received: true});
}
