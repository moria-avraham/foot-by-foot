import { FC, useState } from "react"
import { deleteProcuct } from "../../API/productApi"
import UpdateProduct from "../UpdateProduct/UpdateProduct"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const ShowProduct: FC<ProductProps> = ({ product }) => {
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
            <td> {product.product_id}</td>
            <td>{product.price}</td>
            <td> {product.consumer}</td>
            <td>{product.company}</td>
            <td>{product.description}</td>
            <td>{product.product_name}</td>
            <td><img src={product.right_shoe} /></td>

            <td>
                <button onClick={() => handleDelete(Number(product.product_id))}><FontAwesomeIcon icon={faTrashCan} /></button>
                <button onClick={() => setSelectedProduct(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
            </td>

            {selectedProduct ? <UpdateProduct product={product} /> : false}
        </div>

    )
}

export default ShowProduct