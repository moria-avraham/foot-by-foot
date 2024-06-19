import { FC, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51PSM93JbMV0U7qk6GWporUxCnkFQEURR5OcHnh3uYqjRbyNoiZ55DzhdbAZLTQWhOnGUIgIRqvorvjRxvBwzt2XY00PP7DZN5w');


const Payment: FC<CartProps> = ({ cart }) => {
    const [products, setProducts] = useState(cart);


    useEffect(() => {
        fetch("api/payment/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart }),
        })
            .then((res) => res.json())
    }, [products]);

    const handleClick = async () => {
        const stripe = await stripePromise;
        try {
            const response = await fetch('api/payment/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cart }),
            });

            const session = await response.json();
            const result = await stripe!.redirectToCheckout({
                sessionId: session.id,
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

    return (
        <div>
            {/* {cart.map(item => (
                <div key={item.cart_id}>
                    <p>{item.product_name} Price: ${item.price} Quantity: {item.amount}</p>
                    <p>Total: ${item.price * item.amount}</p>
                </div>
            ))} */}
            <h3>Total Amount: ${totalAmount}</h3>
            <button onClick={handleClick}>Pay</button>
        </div>
    );
};

export default Payment;
