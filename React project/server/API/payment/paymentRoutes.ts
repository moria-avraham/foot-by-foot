import express from "express";
import { checkoutSession, payment } from "./paymentCont";

const router = express.Router();

router
    .post("/create-payment-intent", payment)
    .post("/create-checkout-session", checkoutSession)

export default router;
