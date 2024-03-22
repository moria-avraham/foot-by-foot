import { useEffect, useState } from "react"
import { getRightShoe } from "../../API/productApi"
import ShoesGallery from "../../components/shoesGallery/ShoesGallery"
import './HomePage.scss'


const homePage = () => {
    const [right, setRight] = useState<ShoeProps[]>()
    const getAllRightProduct = async () => {
        try {
            const data = await getRightShoe()
            setRight(data)
        } catch (error) {
            console.error(error)
        }

    };
    useEffect(() => { getAllRightProduct() }, []);

    return (
        <div className="home">
            {right?.map((right) => <div key={right.product_id}>{<ShoesGallery productID={right.product_id} img={right.right_shoe} productName={right.product_name
            } price={right.price} />}</div>
            )}
        </div>
    )
}

export default homePage