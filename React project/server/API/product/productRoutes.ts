import express from "express";
import { addWishList, createCart, createProduct, deleteFromCart, deleteFromWishList, deleteProductById, getAllProduct, getCartById, getProductById, getProductFilter, getRightShoe, getSearch, getSizeByIdProduct, getWishList, updateProductById } from "./productCont";
import { isAdmin } from "../users/Middleware";



const router = express.Router()

router
    .get("/get-right-shoe", getRightShoe)
    .get("/get-Product/:id", getProductById)
    .get("/get-size/:id", getSizeByIdProduct)
    .get("/get-all-prodct", isAdmin, getAllProduct)
    .get("/get-Product-filter/:filter", getProductFilter)
    .get("/get-search/:search", getSearch)
    .get("/get-Product-Cart/:userID", getCartById)
    .get("/get-wish-list/:userID", getWishList)
    .post("/add-wish-list", addWishList)
    .post("/create-product", isAdmin, createProduct)
    .post("/create-cart", createCart)
    .delete("/delete-from-cart/:cartID", deleteFromCart)
    .delete("/delete-from-wish_list/:wishListID", deleteFromWishList)
    .delete("/delete-product/:productID", isAdmin, deleteProductById)
    .patch("/update-product/:productID", isAdmin, updateProductById)




export default router