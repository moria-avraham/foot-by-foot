import { useState } from "react"
import { getAllProduct } from "../../API/productApi"
import { getAllUser } from "../../API/userApi"
import ShowProduct from "../../components/ShowProduct/ShowProduct"
import ShowUsers from "../../components/ShowUsers/ShowUsers"
import CreateProduct from "../../components/CreateProduct/CreateProduct"

const AdminPage = () => {
    const [users, setUsers] = useState([])
    const [products, setProduct] = useState([])

    const getUsers = async () => {
        try {
            const data = await getAllUser()
            setUsers(data)

        } catch (error) {
            console.error(error)
        }
    }
    const getProduct = async () => {
        try {
            const data = await getAllProduct()
            setProduct(data)


        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div><button onClick={() => { getUsers() }}>users list</button>
            <button onClick={() => { getProduct() }}>prodct list</button>
            {products.map((product) => <ShowProduct product={product} />)}
            {users.map((user) => <ShowUsers user={user} />)}
            <CreateProduct />
        </div>
    )
}

export default AdminPage