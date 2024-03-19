import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserFromToken, logIn, updateUserById } from "./usersCont";
import { isAdmin } from "./Middleware";

const router = express.Router()

router
    .get("/get-all-users", isAdmin, getAllUsers)
    .get("/get-from-Token", getUserFromToken)
    .post("/register", createUser)
    .post("/logIn", logIn)
    .delete("/delete-user/:userID", isAdmin, deleteUserById)
    .patch("/update-user/:userID", isAdmin, updateUserById)




export default router