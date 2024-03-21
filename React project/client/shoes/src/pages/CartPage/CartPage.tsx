import { useEffect, useState } from "react";
import { deleteFromCart, getUserCart, payment } from "../../API/productApi";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CartPage.scss"




const CartPage = () => {
    // const KEY = process.env.P_KEY;
    const [cart, setCart] = useState<Cart[]>()
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

    // const p = ("pk_live_51Ow80Z2KjkUgMxdqBwZpNxjGpjRtft2BU4XSgdDAE821n8nGFvk0uESQti1s8VYrsCUW1moTzjifm2949vGoEyiY007LOFHivL")
    const payNow = async () => {
        try {
            const data = await payment(1)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <h1>עגלת קניות</h1>
            {cart?.map((cart) => {
                return <div key={cart.cart_id} className="cart">

                    <button onClick={() => hendeleDelete(Number(cart.cart_id))}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>

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
            {/* <button onClick={() => payNow()}>שלם</button>
            */}
        </div>
    )
}

export default CartPage