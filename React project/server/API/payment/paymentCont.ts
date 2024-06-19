import express from "express";
const stripe = require("stripe")('	sk_test_51PSM93JbMV0U7qk6xszenSRJ2ysulQhNxufo6zkJ5dHXOEIpdD0DVzyORJBeEnTZVw3ecJfLt8p6S8rRGS6M8Vv800Kwr2WrTD');

export async function payment(req: express.Request, res: express.Response) {
    try {
        const { items } = req.body;

        const lineItems = items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product_name,
                    },
                    unit_amount: Math.round(item.price * 100), // Convert price to cents
                },
                quantity: parseInt(item.amount), // Parse amount to integer
            };
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}

function calculateOrderAmount(items: any[]): number {
    return items.reduce((total, item) => total + item.price * parseInt(item.amount), 0) * 100; // Convert total to cents
}

export async function checkoutSession(req: express.Request, res: express.Response) {
    try {
        const { items } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product_name,
                    },
                    unit_amount: Math.round(item.price * 100), // Convert price to cents
                },
                quantity: parseInt(item.amount), // Parse amount to integer
            })),
            mode: 'payment',
            success_url: 'http://localhost:5173/Payment_success',
            cancel_url: 'http://localhost:5173/Failed_to_pay',
        });
        res.send({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}
