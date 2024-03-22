import { useEffect, useState } from "react"
import { addToCart, deleteWishList, getWishListProduct } from "../../API/productApi"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WishList.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/userSlice";
import { getUserApi } from "../../features/userAPI";

const WishList = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const [products, setProducts] = useState<ShoeProps[]>()

    const hendeleDelete = async (wishListID: number) => {
        try {

            const data = await deleteWishList(wishListID)
            window.location.reload();

        } catch (error) {
            console.error(error)
        }
    }

    const getWishList = async () => {
        try {
            const data = await getWishListProduct((user.user_id))
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }
    const addProductToCart = async (productID: number) => {
        try {
            const data = await addToCart(productID, (user.user_id), 1)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => { dispatch(getUserApi()), getWishList() }, [(user)])


    return (
        <div>
            <h1>WISH LIST</h1>
            {products?.map((product) => {
                return <div key={product.product_id} className="wish_list">
                    <button onClick={() => hendeleDelete(Number(product.id))}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button onClick={() => addProductToCart(product.product_id)} className="addCart">הוסף לסל</button>
                    <div>
                        <p>{product.price}</p>
                        <p>{product.amount}</p>
                    </div>
                    <p>{product.product_name}</p>
                    <img src={product.right_shoe} width={150} />

                </div>
            })}
        </div>
    )
}

export default WishList