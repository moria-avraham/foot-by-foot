import { FC, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import "./ShoeCard.scss"
import { addToCart, addToWishList, getProductSize } from "../../API/productApi"




const ShoeCard: FC<productProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>((product.right_shoe))
    const [selectedSize, setSelectedSize] = useState<number | null>()
    const [sizes, setSizes] = useState([])
    const getSize = async (id: number) => {
        try {
            const data = await getProductSize(id)
            setSizes(data)
        } catch (error) {
            console.error(error)
        }

    };
    useEffect(() => { getSize(product.product_id) }, [])
    const handleClick = async (productID: number) => {
        try {
            const data = await addToWishList(productID, 1)
        } catch (error) {
            console.error(error)
        }
    }
    const addCart = async (productID: number, userID: number, size: number) => {
        try {
            const data = await addToCart(productID, userID, size)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card">
            <div className="description">
                <h2>{product.product_name}</h2>
                <h2>₪{product.price}</h2>
                <div className="img_description">
                    <img width={50} src={product.right_shoe} />
                    <p className="text_description" >{product.description}</p>
                    <div className="sizes">{sizes.map((size) => <button onClick={() => setSelectedSize((size.size))} className="size">{size.size} </button>)}</div>
                </div>
                <p>? DREAM CARD חברי מועדון  </p>
                <p> ברכישת מוצר זה ניתן לצבור כ 64 נק'</p>
                <button onClick={() => addCart(product.product_id, 1, selectedSize)}>הוסף לעגלה</button>
                <button>קניה מהירה</button>
            </div>
            <div className="imges">
                <div className="bigImg" >
                    <img width={250} src={selectedImage} />
                    <button className="heart" onClick={() => handleClick(product.product_id)}><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <div className="imgBth">
                    <button onClick={() => setSelectedImage(product.right_shoe)}><img width={50} src={product.right_shoe} /></button>
                    <button onClick={() => setSelectedImage(product.left_shoe)}><img width={50} src={product.left_shoe} /></button>
                    <button onClick={() => setSelectedImage(product.together)}><img width={50} src={product.together} /></button>
                    <button onClick={() => setSelectedImage(product.back)}><img width={50} src={product.back} /></button>
                </div>
            </div>
        </div>
    )
}

export default ShoeCard