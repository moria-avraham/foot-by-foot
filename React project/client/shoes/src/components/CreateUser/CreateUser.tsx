import { useState } from "react";
import { createUser } from "../../API/userApi";

const CreateUser = () => {
    const [phoneNumber, setphoneNumber] = useState<number>()
    const [fullName, setFullName] = useState("")
    const [userEmail, setUserEmail] = useState("");
    const [password, setpassword] = useState("");

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            ev.preventDefault();
            if (userEmail && password && fullName && phoneNumber) {
                const data = await createUser(userEmail, password, fullName, phoneNumber)
                console.log(data)
            }


        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='full nume' onInput={(ev) => { setFullName((ev.target as HTMLInputElement).value) }} />
                <input type="email" placeholder='email' onInput={(ev) => { setUserEmail((ev.target as HTMLInputElement).value) }} />
                <input type="number" placeholder='number' onInput={(ev) => { setphoneNumber(Number((ev.target as HTMLInputElement).value)) }} />
                <input type="password" placeholder='new password' onInput={(ev) => { setpassword((ev.target as HTMLInputElement).value) }} />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default CreateUser