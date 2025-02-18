import express from "express";
/* express is our web framework that provides us with lots of features
that can help us build our API pretty fast and easily,
it gives us routes, middlewares and many more.
*/
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";

// to access the environment variable
dotenv.config()

// create an express app
const app = express();

// Declaring PORT
const PORT = process.env.PORT

// to be able to grab the {fullName,email,password} = req.body of signup callback function declared in auth.controller.js which inturn is used in auth.route.js
// we need middleware
app.use(express.json()) // allow us to extract the json data out of body

// setting up cookie-parser
app.use(cookieParser()); // it will allow us to parse the cookies which will be needed in the auth.middleware.js

// first route we have is for the authentication
// like if user visits "/api/auth", we would like to call authRoutes which is in routes folder
app.use("/api/auth", authRoutes) // this is for user model and authentication

app.use("/api/message", messageRoutes) // this is for message routing

// listening on port 5001 and calling the function that connect to MongoDB
app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT)
    connectDB()
})