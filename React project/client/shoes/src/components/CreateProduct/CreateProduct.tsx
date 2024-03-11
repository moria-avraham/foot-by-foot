import { useState } from "react";
import { createNewProduct } from "../../API/productApi";

const CreateProduct = () => {
    const [company, setCompany] = useState("")
    const [price, setPrice] = useState<number>()
    const [consumer, setConsumer] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [right, setRight] = useState("");
    const [left, setLeft] = useState("");
    const [together, setTogether] = useState("");
    const [back, setBack] = useState("");

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            // ev.preventDefault();
            if (company && price && consumer && name && description && right && left && together && back) {
                const data = await createNewProduct(company, price, consumer, name, description, right, left, together, back)
                console.log(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div><form onSubmit={handleSubmit}>
            <input type="text" placeholder='name' onInput={(ev) => { setName((ev.target as HTMLInputElement).value) }} />
            <input type="text" placeholder='company' onInput={(ev) => { setCompany((ev.target as HTMLInputElement).value) }} />
            <input type="number" placeholder='price' onInput={(ev) => { setPrice(Number((ev.target as HTMLInputElement).value)) }} />
            <input type="text" placeholder='consumer' onInput={(ev) => { setConsumer((ev.target as HTMLInputElement).value) }} />
            <input type="text" placeholder='description' onInput={(ev) => { setDescription((ev.target as HTMLInputElement).value) }} />
            <input type="text" placeholder='right' onInput={(ev) => { setRight((ev.target as HTMLInputElement).value) }} />
            <input type="text" placeholder='left' onInput={(ev) => { setLeft((ev.target as HTMLInputElement).value) }} />
            <input type="text" placeholder='together' onInput={(ev) => { setTogether((ev.target as HTMLInputElement).value) }} />
            <input type="text" placeholder='back' onInput={(ev) => { setBack((ev.target as HTMLInputElement).value) }} />
            <button type="submit">add</button>
        </form></div>
    )
}

export default CreateProduct