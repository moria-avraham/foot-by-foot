import { FC, useState } from "react"
import { updateUserBYID } from "../../API/userApi";

const UpdateUser: FC<UserProps> = ({ user }) => {
    const [name, setName] = useState<string>((user.user_full_name));
    const [emeil, setEmeil] = useState<string>((user.user_email));
    const [phone, setPhone] = useState<number>((user.user_phone));
    const [role, setRole] = useState<string>((user.role));

    const handleUpdate = async (userName: string, userEmeil: string, userPhone: number, userRole: string, userID: number) => {
        try {
            if (userName && userEmeil && userPhone && userRole && userID) {
                const data = await updateUserBYID(userName, userEmeil, userPhone, userRole, userID)
                window.location.reload();

            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div>
            <input type="text" name="name" value={name} onInput={(ev) => { setName((ev.target as HTMLInputElement).value) }} />
            <input type="emeil" name="emeil" value={emeil} onInput={(ev) => { setEmeil((ev.target as HTMLInputElement).value); }} />
            <input type="number" name="number" value={phone} onInput={(ev) => { setPhone(Number((ev.target as HTMLInputElement).value)); }} />
            <input type="text" name="role" value={role} onInput={(ev) => { setRole((ev.target as HTMLInputElement).value); }} />
            <button onClick={() => handleUpdate(name, emeil, phone, role, Number(user.user_id))}>update</button>
        </div>

    )
}

export default UpdateUser


