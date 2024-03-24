import { useEffect, useState } from "react"
import { getAllProduct } from "../../API/productApi"
import { getAllUser } from "../../API/userApi"
import CreateProduct from "../../components/CreateProduct/CreateProduct"
import CreateUser from "../../components/CreateUser/CreateUser"
import ShowProduct from "../../components/ShowProduct/ShowProduct"
import ShowUsers from "../../components/ShowUsers/ShowUsers"
import "./AdminPage.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { userSelector, userStateSelector } from "../../features/userSlice"
import { useNavigate } from "react-router"
import { getUserApi } from "../../features/userAPI"
import UserTRTable from "../../components/UserTRTable/UserTRTable"
import ProductTRTable from "../../components/ProductTRTable/ProductTRTable"

const AdminPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const status = useAppSelector(userStateSelector)
    const [users, setUsers] = useState<User[]>()
    const [products, setProduct] = useState<Product[]>()
    const [createUser, setCreateUser] = useState(false)
    const [createProduct, setCreateProduct] = useState(false)

    useEffect(() => { dispatch(getUserApi()) }, [])
    useEffect(() => {
        if (((user.role) !== "" && (user.role) !== "admin" && (status) == "idle") || (status) == "failed") {
            navigate("/")
        }

    }, [(status)])


    useEffect(() => { getData() }, [])
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

            <UserTRTable />

            <table>
                <tbody>
                    {users?.map((user) => <ShowUsers key={user.user_id} user={user} />)}
                </tbody>
            </table>
            <button className="create" onClick={() => setCreateProduct(true)}>create a new Product</button>
            {createProduct ? <CreateProduct /> : null}

            <ProductTRTable />

            <table>
                <tbody>
                    {products?.map((product) => <ShowProduct key={product.product_id} product={product} />)}
                </tbody>
            </table>

        </div>
    )
}

export default AdminPage