import { useState } from "react";
import { loginUser } from "../../API/userApi";
import { Link } from "react-router-dom";


const LogIn = () => {
    // const navigate = useNavigate()

    const [email, setuserEmail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [comments, setComments] = useState("");

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            ev.preventDefault();
            if (email && password) {
                const data = await loginUser(email, password)
                console.log(data?.data.ok)
                if (data?.response.status == 401) {
                    setComments("Pleas")
                }
            } else {
                setComments("Please fill out all the necessary fields")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <h1>Welcome to foot and foot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <p>email:</p><input type="email" onInput={(ev) => { setuserEmail((ev.target as HTMLInputElement).value) }} />
                <p>password:</p><input type="password" onInput={(ev) => { setpassword((ev.target as HTMLInputElement).value) }} />
                {comments}
                <button type="submit">Login</button>
                <p>אם עדיין לא נרשמת הרשם <Link to={"/register"}>כאן</Link></p>
            </form>
        </>
    )
}

export default LogIn