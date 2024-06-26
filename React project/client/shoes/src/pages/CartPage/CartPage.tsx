import { useEffect, useState } from "react";
import { deleteFromCart, getUserCart } from "../../API/productApi";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CartPage.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/userSlice";
import { getUserApi } from "../../features/userAPI";
import Payment from "../../components/Payment/Payment";






const CartPage = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const [cart, setCart] = useState<Cart[]>()
    const hendeleDelete = async (cartID: number) => {
        try {
            const data = await deleteFromCart(cartID)
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }


    const getCart = async () => {
        try {
            const data = await getUserCart((user.user_id))
            setCart(data)
        } catch (error) {
            console.error(error)
        }

    };

    useEffect(() => { dispatch(getUserApi()), getCart() }, [(user)])



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

            {cart && cart.length > 0 ? <Payment cart={cart} /> : 'Cart is empty'}
        </div>
    )
}

export default CartPage