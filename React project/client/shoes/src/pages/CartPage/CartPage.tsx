import { useEffect, useState } from "react";
import { deleteFromCart, getUserCart } from "../../API/productApi";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CartPage.scss"
import stripe from "react-stripe-checkout"


const CartPage = () => {
    const KEY = process.env.P_KEY;
    const [cart, setCart] = useState([])
    // const [amount, setAmount] = useState()
    const hendeleDelete = async (cartID: number) => {
        try {
            const data = await deleteFromCart(cartID)

        } catch (error) {
            console.error(error)
        }
    }


    const getCart = async (num: number) => {
        try {
            const data = await getUserCart(num)
            setCart(data)
        } catch (error) {
            console.error(error)
        }

    };

    useEffect(() => { getCart(1) }, [])
    return (
        <div>
            <h1>עגלת קניות</h1>
            {cart.map((cart) => {
                return <div className="cart">

                    <button onClick={() => hendeleDelete(Number(cart.cart_id))}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button className="addCart">הוסף לסל</button>
                    <div>
                        <p>{cart.price}</p>
                        <p>{cart.amount} :כמות</p>
                        <p>{cart.size} :מידה</p>
                    </div>
                    <p>{cart.product_name}</p>

                    <img src={cart.right_shoe} width={150} />

                </div>
            }
            )}
        </div>
    )
}

export default CartPage