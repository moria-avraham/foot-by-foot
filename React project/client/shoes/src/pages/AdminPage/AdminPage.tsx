import { useEffect, useState } from "react"
import { getAllProduct } from "../../API/productApi"
import { getAllUser, getcookie } from "../../API/userApi"
import ShowProduct from "../../components/ShowProduct/ShowProduct"
import ShowUsers from "../../components/ShowUsers/ShowUsers"
import CreateProduct from "../../components/CreateProduct/CreateProduct"
import "./AdminPage.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserApi } from "../../features/userAPI"
import { userSelector } from "../../features/userSlice"
import CreateUser from "../../components/CreateUser/CreateUser"

const AdminPage = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const [users, setUsers] = useState([])
    const [products, setProduct] = useState([])
    const [createUser, setCreateUser] = useState(false)
    const [createProduct, setCreateProduct] = useState(false)



    useEffect(() => {
        dispatch(getUserApi())
    }, [])
    console.log(user)
    const getData = async () => {
        try {
            const data = await getAllUser()
            setUsers(data)
            const results = await getAllProduct()
            setProduct(results)
            // const results = await getcookie()
            // console.log(results)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => { getData() }, [])
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
                    {users.map((user) => <ShowUsers user={user} />)}
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
                    {products.map((product) => <ShowProduct product={product} />)}
                </tr>
            </table>

        </div>
    )
}

export default AdminPage