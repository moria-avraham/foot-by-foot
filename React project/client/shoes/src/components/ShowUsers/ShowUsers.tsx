import { FC, useState } from "react"
import { deleteUser } from "../../API/userApi"
import UpdateUser from "../UpdateUser/UpdateUser"
import "./ShowUsers.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const ShowUsers: FC<UserProps> = ({ user }) => {
    const [selectedUser, setSelectedUser] = useState(false)
    const handleDelete = async (userID: number) => {
        try {
            if (userID) {
                const data = await deleteUser(userID)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div >
            <td> {user.user_id}</td>
            <td>{user.user_full_name}</td>
            <td>{user.user_email}</td>
            <td> {user.user_phone}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => handleDelete(Number(user.user_id))}><FontAwesomeIcon icon={faTrashCan} /></button>
                <button onClick={() => setSelectedUser(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
            </td>

            {selectedUser ? <UpdateUser user={user} /> : false}
        </div>
    )
}

export default ShowUsers