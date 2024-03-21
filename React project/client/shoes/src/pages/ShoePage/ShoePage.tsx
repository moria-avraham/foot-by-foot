import { useEffect, useState } from "react"
import ShoeCard from "../../components/ShoeCard/ShoeCard"
import { useParams } from "react-router-dom"
import { getProductById } from "../../API/productApi";
import "./ShoePage.scss"



const ShoePage = () => {
    const [chosenProduct, setChosenProduct] = useState([])
    const { id } = useParams();

    const ProductID = async (id: number) => {
        try {
            const data = await getProductById(id)
            setChosenProduct(data)
        } catch (error) {
            console.error(error)
        }

    };
    useEffect(() => { ProductID(Number(id)) }, []);

    useEffect(() => {
        if (id) {
            ProductID(Number(id))
        }
    }, [id])

    return (
        <>
            {chosenProduct?.map((product) => <ShoeCard product={product} />)}
        </>
    )
}

export default ShoePage
