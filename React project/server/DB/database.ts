import mysql from "mysql2"


const sqlPassword = process.env.SQLPASSWORD;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: sqlPassword,
    database: "shoes_schema"
})

connection.connect((err) => {
    try {
        if (err) throw err;
        console.log("connected to mySQL 🤪")
    } catch (error) {
        console.error(error)
    }
})

export default connection