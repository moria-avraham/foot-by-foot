import { FC, useEffect, useState } from "react"
import ShoeCard from "../components/ShoeCard/ShoeCard"
import { useParams } from "react-router-dom"
import { getProductById } from "../API/productApi";



const ShoePage = () => {
    const [chosenProduct, setChosenProduct] = useState([])
    const { id } = useParams();
    const allProduct = async (id: number) => {
        try {
            const data = await getProductById(id)
            setChosenProduct(data)

        } catch (error) {
            console.error(error)
        }

    };
    useEffect(() => { allProduct(Number(id)) }, []);

    return (
        <>
            {chosenProduct?.map((product) => <ShoeCard key={product.product_id} productName={product.product_name} productDescription={product.description} imges={[product.left_shoe, product.right_shoe, product.together, product.back]} price={product.price} img={product.right} />)}



        </>
    )
}

export default ShoePage
