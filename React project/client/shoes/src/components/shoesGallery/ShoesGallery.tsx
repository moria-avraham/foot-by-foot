import { FC } from "react";
import { Link } from "react-router-dom";
import "./ShoesGallery.scss"

const ShoesGallery: FC<ShoeCardProps> = ({ productID, img, productName, price }) => {

    return (
        <div className="gallery"><Link to={`/${productID}`}>
            <img src={img} width={200} />
            <br />
            {productName}
            <br />
            <div className="price"> {price}</div>
        </Link></div>
    )
}

export default ShoesGallery