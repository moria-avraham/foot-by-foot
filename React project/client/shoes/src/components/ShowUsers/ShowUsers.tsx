import { FC, useState } from "react"
import { deleteUser } from "../../API/userApi"
import UpdateUser from "../UpdateUser/UpdateUser"


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
            {user.user_id}
            {user.user_full_name}
            {user.user_email}
            {user.user_phone}
            {user.role}

            <button onClick={() => handleDelete(Number(user.user_id))}>delete</button>
            <button onClick={() => setSelectedUser(true)}>update</button>
            {selectedUser ? <UpdateUser user={user} /> : false}
        </div>
    )
}

export default ShowUsers