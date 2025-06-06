import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from '../lib/cloudinary.js'

// exporting the callback function to be used in auth.route.js
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        // hashing the password using bcryptjs
        // first: create the user
        // second: hash the password
        // create a token to user for their authentication
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({email}) // ask if user exists.

        if (user) return res.status(400).json({message: "Email already exists"});

        // now hashing password
        // creating salt using bcrypt, .genSalt() for generating salt sn
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName, // this is same as fullName:fullName
            email, // this is same as email:email
            password:hashedPassword
        })

        if(newUser) {
            // generate jwt token here
            generateToken(newUser._id, res) // mongodb stores id as newUser._id
            await newUser.save(); // save the data in database

            // give success message // 201: something has been created
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // password was hashed, so we need to compare it with password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message:"Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// to able to updateProfile, we will need first authentcation by protectRoute and then we will call this function
// and, to be able to update our profile image, we need a service so that we can upload our image in it. and That is Cloudinary.
export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id; // possible due to protectRoute function req.user = user

        if (!profilePic) {
            req.status(400).json({ message: "Profile pic is required" });
        }

        // then we will update the image to cloudinary bucket for images
        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        // then, we need to update the profilePic for database for this user
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true}) // this is the response that cloudinary gives us back "uploadResponse.secure_url"

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// we are calling this function whenver we are refreshing the page through .get and ("./check") with protectRoute checking the token validation, and then this function
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });  
    }
}