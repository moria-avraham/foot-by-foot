import { FC } from "react";
import { Link } from "react-router-dom";

const ShoesGallery: FC<ShoeCardProps> = ({ productID, img, productName, price }) => {

    return (
        <div ><Link to={`/${productID}`}>
            <img src={img} width={200} />
            {productName}
            <br />
            {price}
        </Link></div>
    )
}

export default ShoesGallery