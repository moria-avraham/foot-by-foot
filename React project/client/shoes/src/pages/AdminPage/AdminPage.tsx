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

const AdminPage = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const [users, setUsers] = useState([])
    const [products, setProduct] = useState([])

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
        <div>
            {products.map((product) => <ShowProduct product={product} />)}
            <table>
                <tr>
                    <td >user ID</td>
                    <td>user name</td>
                    <td>user emeil</td>
                    <td>user phone</td>
                    <td>role</td>
                    <tr></tr>
                </tr>
                <tr>
                    {users.map((user) => <ShowUsers user={user} />)}
                </tr>

            </table>

        </div>
    )
}

export default AdminPage