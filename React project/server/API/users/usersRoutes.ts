import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserFromToken, logIn, updateUserById } from "./usersCont";

const router = express.Router()

router
    .get("/get-all-users", getAllUsers)
    .get("/get-by-cookie", getUserFromToken)
    .post("/register", createUser)
    .post("/logIn", logIn)
    .delete("/delete-user/:userID", deleteUserById)
    .patch("/update-user/:userID", updateUserById)




export default router