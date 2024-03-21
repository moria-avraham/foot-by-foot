import { useEffect, useState } from "react"
import { deleteWishList, getWishListProduct } from "../../API/productApi"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WishList.scss"

const WishList = () => {
    const [products, setProducts] = useState([])

    const hendeleDelete = async (wishListID: number) => {
        try {
            const data = await deleteWishList(wishListID)
            console.log(data)

        } catch (error) {
            console.error(error)
        }
    }

    const getWishList = async (userID: number) => {
        try {
            const data = await getWishListProduct(userID)
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getWishList(1) }, [])
    return (
        <div>
            <h1>WISH LIST</h1>
            {products.map((product) => {
                return <div className="wish_list">
                    <button onClick={() => hendeleDelete(Number(product.id))}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button className="addCart">הוסף לסל</button>
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