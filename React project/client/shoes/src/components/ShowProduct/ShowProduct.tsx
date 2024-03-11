import { FC, useState } from "react"
import { deleteProcuct } from "../../API/productApi"
import UpdateProduct from "../UpdateProduct/UpdateProduct"

interface ShoeCardProp {
    product: product
}
const ShowProduct: FC<ShoeCardProp> = ({ product }) => {
    const [selectedProduct, setSelectedProduct] = useState(false)

    const handleDelete = async (productID: number) => {
        try {
            if (productID) {
                const data = await deleteProcuct(productID)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div >
            {product.product_id}
            <br />
            {product.company}
            <br />
            {product.price}
            <br />
            {product.consumer}
            <br />
            {product.description}
            <br />
            {product.product_name}
            <button onClick={() => handleDelete(Number(product.product_id))}>delete</button>
            <button onClick={() => setSelectedProduct(true)}>update</button>
            {selectedProduct ? <UpdateProduct product={product} /> : false}
        </div >
    )
}

export default ShowProduct