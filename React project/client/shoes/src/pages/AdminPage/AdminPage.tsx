import { useEffect, useState } from "react"
import { getAllProduct } from "../../API/productApi"
import { getAllUser } from "../../API/userApi"
import ShowProduct from "../../components/ShowProduct/ShowProduct"
import ShowUsers from "../../components/ShowUsers/ShowUsers"
import CreateProduct from "../../components/CreateProduct/CreateProduct"
import "./AdminPage.scss"

const AdminPage = () => {
    const [users, setUsers] = useState([])
    const [products, setProduct] = useState([])

    const getData = async () => {
        try {
            const data = await getAllUser()
            setUsers(data)
            const results = await getAllProduct()
            setProduct(results)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => { getData() }, [])
    return (
        <div>
            {products.map((product) => <ShowProduct product={product} />)}
            <thead>
                <tr>
                    <th >user ID</th>
                    <th>user name</th>
                    <th>user emeil</th>
                    <th>user phone</th>
                    <th>role</th>
                    <th></th>
                </tr>
            </ thead>
            <table>
                <tr>
                    {users.map((user) => <ShowUsers user={user} />)}
                </tr>

            </table>
            <CreateProduct />
        </div>
    )
}

export default AdminPage