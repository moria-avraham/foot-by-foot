import { useEffect, useState } from "react"
import { getAllProduct } from "../../API/productApi"
import { getAllUser } from "../../API/userApi"
import ShowProduct from "../../components/ShowProduct/ShowProduct"
import ShowUsers from "../../components/ShowUsers/ShowUsers"
import CreateProduct from "../../components/CreateProduct/CreateProduct"
import "./AdminPage.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserApi } from "../../features/userAPI"
import { userSelector } from "../../features/userSlice"
import CreateUser from "../../components/CreateUser/CreateUser"
import { useNavigate } from "react-router"

const AdminPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const [users, setUsers] = useState<User[]>()
    const [products, setProduct] = useState<Product[]>([])
    const [createUser, setCreateUser] = useState(false)
    const [createProduct, setCreateProduct] = useState(false)



    useEffect(() => {
        getData(), dispatch(getUserApi())
    }, [(user)])


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

    return (
        <div className="admin">
            <button className="create" onClick={() => setCreateUser(true)}>create a new User</button>
            {createUser ? <CreateUser /> : null}
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
                    {users?.map((user) => <ShowUsers user={user} key={user.user_id} />)}
                </tr>

            </table>
            <button className="create" onClick={() => setCreateProduct(true)}>create a new Product</button>
            {createProduct ? <CreateProduct /> : null}
            <thead>
                <tr>
                    <th className="product" >product ID</th>
                    <th className="product" >price</th>
                    <th className="product" >company product </th>
                    <th className="product" >consumer</th>
                    <th className="product" >description</th>
                    <th className="product" >Product name</th>
                    <th className="product" >Product image</th>
                </tr>
            </ thead>
            <table>
                <tr>
                    {products?.map((product) => <ShowProduct product={product} key={product.product_id} />)}
                </tr>
            </table>

        </div>
    )
}

export default AdminPage