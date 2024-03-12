import { useEffect, useState } from "react";
import { deleteFromCart, getUserCart } from "../../API/productApi";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartPage = () => {
    const [cart, setCart] = useState([])
    const hendeleDelete = async (cartID: number) => {
        try {
            const data = await deleteFromCart(cartID)
            console.log(data)

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
            {cart.map((cart) => {
                return <div>
                    <button onClick={() => hendeleDelete(Number(cart.cart_id))}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <img src={cart.right_shoe} width={100} />
                    <p>{cart.product_name}</p>
                    <p>{cart.price}</p>
                    <p>{cart.amount}</p>

                </div>
            }
            )}
        </div>
    )
}

export default CartPage