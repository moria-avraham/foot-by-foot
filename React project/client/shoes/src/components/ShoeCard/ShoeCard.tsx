import { FC, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'


const ShoeCard: FC<shoe> = ({ productName, productDescription, imges, price, img }) => {
    const [imgs, setImgs] = useState<string[]>(imges)
    const [selectedImage, setSelectedImage] = useState<string | undefined>(img)
    return (
        <div className="card">
            <div className="description">
                <FontAwesomeIcon icon={faHeart} />
                <h2>{productName}</h2>
                <h2>₪{price}</h2>
                <img width={50} src={img} />
                <p>{productDescription}</p>
                <p>? DREAM CARD חברי מועדון  </p>
                <p> ברכישת מוצר זה ניתן לצבור כ 64 נק'</p>
                <button>הוסף לעגלה</button>
                <button>קניה מהירה</button>
            </div>
            <div className="imges">
                <img width={150} src={selectedImage} />
                <br />
                {imgs.map((img) => { return <button onClick={() => setSelectedImage(img)}><img width={50} src={img} /></button> })}
            </div>
        </div>
    )
}

export default ShoeCard