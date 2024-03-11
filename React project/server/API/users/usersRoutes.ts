import express from "express";
import { createUser, deleteUserById, getAllUsers, logIn, updateUserById } from "./usersCont";

const router = express.Router()

router
    .get("/get-all-users", getAllUsers)
    .post("/register", createUser)
    .post("/logIn", logIn)
    .delete("/delete-user/:userID", deleteUserById)
    .patch("/update-user/:userID", updateUserById)
// .patch("/:id", )
// .get("/filter", )
// .delete("/:id", )



export default router