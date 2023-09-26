import { Router } from "express";
import user from "../controllers/user.js";

// auth
import auth from "./auth/auth.js";

export const router = Router() 

// get a user by email
router.get("/", user.getOne)

// get all user (testing purpose)
router.get("/allUsers", user.getAll)

// log in
router.post("/login", user.login)

// register
router.post("/register", user.register)

// delete account
router.delete('/', auth, user.delete)

// log out
router.delete("/logout", auth, user.logout)

// delete all users
router.delete("/deleteAll", user.deleteAll)
