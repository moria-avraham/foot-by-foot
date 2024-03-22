import { FC, useState } from "react";
import { updateProduct } from "../../API/productApi";

const UpdateProduct: FC<ProductProps> = ({ product }) => {
    const [company, setCompany] = useState((product.company))
    const [price, setPrice] = useState(Number(product.price))
    const [consumer, setConsumer] = useState((product.consumer));
    const [name, setName] = useState((product.product_name));
    const [description, setDescription] = useState((product.description));
    const [right, setRight] = useState((product.right_shoe));
    const [left, setLeft] = useState(product.left_shoe);
    const [together, setTogether] = useState((product.together));
    const [back, setBack] = useState(product.back);

    const handleUpdate = async (company: string, price: number, consumer: string, name: string, description: string, right: string, left: string, together: string, back: string, productID: number) => {
        try {

            if (company && price && consumer && name && description && right && left && together && back && productID) {
                const data = await updateProduct(company, price, consumer, name, description, right, left, together, back, productID)

            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <input type="text" value={name} onInput={(ev) => { setName((ev.target as HTMLInputElement).value) }} />
            <input type="text" value={company} onInput={(ev) => { setCompany((ev.target as HTMLInputElement).value) }} />
            <input type="number" value={price} onInput={(ev) => { setPrice(Number((ev.target as HTMLInputElement).value)) }} />
            <input type="text" value={consumer} onInput={(ev) => { setConsumer((ev.target as HTMLInputElement).value) }} />
            <input type="text" value={description} onInput={(ev) => { setDescription((ev.target as HTMLInputElement).value) }} />
            <input type="text" value={right} onInput={(ev) => { setRight((ev.target as HTMLInputElement).value) }} />
            <input type="text" value={left} onInput={(ev) => { setLeft((ev.target as HTMLInputElement).value) }} />
            <input type="text" value={together} onInput={(ev) => { setTogether((ev.target as HTMLInputElement).value) }} />
            <input type="text" value={back} onInput={(ev) => { setBack((ev.target as HTMLInputElement).value) }} />
            <button onClick={() => handleUpdate(company, price, consumer, name, description, right, left, together, back, Number(product.product_id))}>update</button>
        </div>
    )
}

export default UpdateProduct