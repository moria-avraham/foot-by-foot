import express from "express";
import { addWishList, createProduct, deleteFromCart, deleteFromWishList, deleteProductById, getAllProduct, getCartById, getProductById, getProductFilter, getRightShoe, getSearch, getWishList, updateProductById } from "./productCont";


const router = express.Router()

router
    .get("/get-right-shoe", getRightShoe)
    .get("/get-Product/:id", getProductById)
    .get("/get-all-prodct", getAllProduct)
    .get("/get-Product-filter/:filter", getProductFilter)
    .get("/get-search/:search", getSearch)
    .get("/get-Product-Cart/:userID", getCartById)
    .get("/get-wish-list/:userID", getWishList)
    .post("/add-wish-list", addWishList)
    .post("/create-product", createProduct)
    .post("/create-cart",)
    .delete("/delete-from-cart/:cartID", deleteFromCart)
    .delete("/delete-from-wish_list/:wishListID", deleteFromWishList)
    .delete("/delete-product/:productID", deleteProductById)
    .patch("/update-product/:productID", updateProductById)




export default router