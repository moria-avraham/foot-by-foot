import { FC, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import "./ShoeCard.scss"


const ShoeCard: FC<productProps> = ({ product }) => {

    const [selectedImage, setSelectedImage] = useState<string | undefined>((product.right_shoe))
    return (
        <div className="card">
            <div className="description">
                <h2>{product.product_name}</h2>
                <h2>₪{product.price}</h2>
                <div className="img_description">
                    <img width={50} src={product.right_shoe} />
                    <p>{product.description}</p>
                </div>
                <p>? DREAM CARD חברי מועדון  </p>
                <p> ברכישת מוצר זה ניתן לצבור כ 64 נק'</p>
                <button>הוסף לעגלה</button>
                <button>קניה מהירה</button>
            </div>
            <div className="imges">
                <div className="bigImg" >
                    <FontAwesomeIcon icon={faHeart} />
                    <img width={250} src={selectedImage} />
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