import { useState } from "react";
import { createUser } from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import './register.scss'

const Register = () => {
    const navigate = useNavigate()

    const [phoneNumber, setphoneNumber] = useState<number>()
    const [fullName, setFullName] = useState("")
    const [userEmail, setUserEmail] = useState("");
    const [password, setpassword] = useState("");
    const [comments, setComments] = useState("");


    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            ev.preventDefault();
            if (userEmail && password && fullName && phoneNumber) {
                const data = await createUser(userEmail, password, fullName, phoneNumber)
                setComments("")
                if (data?.status == 207) {
                    setComments("This address or the phone is already taken")
                } else if (data?.data.ok == true) {
                    navigate(`/login`)
                }
            }
            else {
                setComments("Please fill out all the necessary fields")
            }

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <> <h1>foot by foot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" placeholder='full nume' onInput={(ev) => { setFullName((ev.target as HTMLInputElement).value) }} />
                <input type="email" placeholder='email' onInput={(ev) => { setUserEmail((ev.target as HTMLInputElement).value) }} />
                <input type="number" placeholder='number' onInput={(ev) => { setphoneNumber(Number((ev.target as HTMLInputElement).value)) }} />
                <input type="password" placeholder='new password' onInput={(ev) => { setpassword((ev.target as HTMLInputElement).value) }} />
                <div className="comments">{comments}</div>
                <button type="submit">Register</button>

            </form>
        </>
    )
}

export default Register