import express from "express";
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

const saltRounds = 10;

export async function getAllUsers(req: express.Request, res: express.Response) {
    try {
        const query = "SELECT * FROM shoes_schema.users;";
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}
//לבדוקקקקקקקק
// export async function getUserByCookie(req, res) {
//     try {
//         const { user } = req.cookies;

//         const secret = process.env.SECRET
//         if (!secret) throw new Error("no secret")

//         const decodedId = jwt.decode(user, secret)
//         const { userID } = decodedId;


//         const query = `SELECT * FROM users WHERE user_id = ${userID}`;

//         connection.query(query, (err, results) => {
//             try {
//                 if (err) throw err;

//                 res.send({ ok: true, results: results[0] })
//             } catch (error) {
//                 res.status(500).send({ ok: false, error })
//             }
//         })

//     } catch (error) {
//         res.status(500).send({ ok: false, error })
//     }
// }

export async function createUser(req: express.Request, res: express.Response) {
    try {

        const { userEmail, password, fullName, phoneNumber } = req.body;
        if (!userEmail || !password || !fullName || !phoneNumber) throw new Error("Please complete all fields in register")
        const hash = await bcrypt.hash(password, saltRounds)

        const query = `INSERT INTO users (user_full_name, user_email, user_password, user_phone) VALUES ('${fullName}','${userEmail}','${hash}','${phoneNumber}');`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(207).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}


// export function logIn(req: express.Request, res: express.Response) {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) throw new Error("Please complete all fields in logIn at FILE userCont");

//         // const cookie={userId}
//         const query = `SELECT * FROM users WHERE user_email = ? AND user_password = ?`;

//         connection.query(query, [email, password], (err, results) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send({ ok: false, error: err });
//                 return;
//             }

//             if (!Array.isArray(results) || results.length === 0) {
//                 res.status(401).send({ ok: false, message: 'Invalid credentials' });
//                 return;
//             }

//             const user = results[0] as RowDataPacket;
//             res.status(200).send({ ok: true, message: 'Login successful', user });
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ ok: false, error });
//     }
// }


export function logIn(req: express.Request, res: express.Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("Please complete all fields in logIn at FILE userCont");

        const secret = process.env.SECRET;
        if (!secret) throw new Error("Secret not defined");

        const query = `SELECT * FROM users WHERE user_email = ? AND user_password = ?`;

        connection.query(query, [email, password], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send({ ok: false, error: err });
                return;
            }

            if (!Array.isArray(results) || results.length === 0) {
                res.status(401).send({ ok: false, message: 'Invalid credentials' });
                return;
            }

            const user = results[0] as RowDataPacket;


            const payload = { userId: user.id, email: user.user_email };
            const token = jwt.encode(payload, secret);


            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.status(200).send({ ok: true, message: 'Login successful', user });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error: error.message });
    }
}

export function deleteUserById(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.params;
        if (!userID) throw new Error("no id on deleteUserById")
        const query = `DELETE FROM users WHERE user_id = ${userID};`;
        connection.query(query, (err, results) => {

            if (err) throw err;
            //@ts-ignore
            if (results.affectedRows) {
                res.send({ ok: true, results })
            } else {
                res.send({ ok: true, results: "No rows were deleted" })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export function updateUserById(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.params;
        if (!userID) throw new Error("no id user");
        const { userName, userEmeil, userPhone, userRole } = req.body;
        if (!userName || !userEmeil || !userPhone || !userRole) throw new Error("no field or update ");
        const query = `UPDATE users SET user_full_name = '${userName}', user_email = '${userEmeil}',  user_phone = '${userPhone}' ,role = '${userRole}' WHERE (user_id = '${userID}');`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}


