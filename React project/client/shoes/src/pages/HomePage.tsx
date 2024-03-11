import { useEffect, useState } from "react"
import { getRightShoe } from "../API/productApi"
import ShoesGallery from "../components/shoesGallery/ShoesGallery"
import { useAppSelector } from "../app/hooks"
import { userSelector } from "../features/userSlice"


const homePage = () => {
    const [right, setRight] = useState<object[]>()
    const user = useAppSelector(userSelector)
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
        <div>
            {user.name}
            {right?.map((right) => <ShoesGallery productID={right.product_id} img={right.right_shoe} productName={right.product_name
            } price={right.price} />)}</div>
    )
}

export default homePage