import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); 

export async function createPaymentIntent(req: Request, res: Response) {
    const customer = await stripe.customers.create();
    
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id },
        {apiVersion: '2024-09-30.acacia'}
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        customer: customer.id,
      });

      res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
    res.json({message: ''});
}

export async function getKeys(req: Request, res: Response) {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY});
}