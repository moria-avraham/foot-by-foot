require("dotenv").config()
import express from "express";
import usersRoutes from "./API/users/usersRoutes"
import productRoutes from "./API/product/productRoutes"
import paymentRoutes from "./API/payment/paymentRoutes"
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use("/api/users", usersRoutes)
app.use("/api/product", productRoutes)
app.use("/api/payment", paymentRoutes)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})