import { Stripe } from "stripe";

const stripe = new Stripe(process.env.SECRET_STRIPE, {
    apiVersion: "2020-08-27",
});

export { stripe };
