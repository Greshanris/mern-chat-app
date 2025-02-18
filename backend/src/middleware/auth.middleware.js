import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// this will basically check the web token
// to be able to grab the jwt from cookies, we need the cookie-parser
// the next function is calling the next function in router.put("/update-profile", protectRoute, updateProfile)
export const protectRoute = async (req, res, next) => {
    try {
        // for parsing the cookie, we need the cookie-parser which will be used in app.use(cookie-parser()) in index.js
        const token = req.cookies.jwt // here, cookies.jwt is used because we declared "jwt" as token name while sending it in cookies

        // checking if token is empty or not
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided"})
        }

        // in the cookie, there is payload out there, which is encoded using key which is in environment variable
        // so, we first decode it using the key declared in environment variable.
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // then, we see if decode is true or false, and if false then, we tell that token is invalid
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" })
        }

        // if token is valide, using jwt.verify(token, key), then, we grab the userId which is an object from decoded, and then use it to select everything except password, that's why "-password"
        const user = await User.findById(decoded.userId).select("-password");

        // if there is no user found, then send 404 status code, "User not found"
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // now, user is authenticated, we can add this user field in request
        req.user = user

        // and, then call the next() function
        next()

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}