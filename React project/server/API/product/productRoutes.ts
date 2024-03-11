import express from "express";
import { createProduct, deleteProductById, getAllProduct, getProductById, getProductFilter, getRightShoe, getSearch, updateProductById } from "./productCont";


const router = express.Router()

router
    .get("/get-right-shoe", getRightShoe)
    .get("/get-Product/:id", getProductById)
    .get("/get-all-prodct", getAllProduct)
    .get("/get-Product-filter/:filter", getProductFilter)
    .get("/get-search/:search", getSearch)
    .get("/get-Product-Cart",)
    .post("/create-product", createProduct)
    .post("/create-cart",)
    .delete("/delete-product/:productID", deleteProductById)
    .patch("/update-product/:productID", updateProductById)




export default router