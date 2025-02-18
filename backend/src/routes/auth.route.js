import express from "express"
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

// we would like to create a router from express.Router()
const router = express.Router()

// to organize the file, we will use controllers instead of a callback function
// just say, we will put all those callback function export it from auth.controller.js which is in controller folder to here


// we would like to call the function when user goes to sign up page
// when we would like to signup, we don't want to use get request but post request
router.post("/signup", signup)

// we would like to call the function when user goes to login page
// we would like to send username and password or email
router.post("/login", login)

// we would like to call the function when user goes to logout page
// Here, we can use get method as well. but 
router.post("/logout", logout)

// Now, comes updating part, and, we will also check whether they are logged in or authenticated
router.put("/update-profile", protectRoute, updateProfile)

// this will check if user is authenticated or not whenever the page refreshes
router.get("/check", protectRoute, checkAuth)


export default router;