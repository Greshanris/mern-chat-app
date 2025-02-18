// to generate a token we need a environment variable
import jwt from "jsonwebtoken"
// in order to generate a token, we need to take the payload
export const generateToken = (userId, res) => {
    // jwt is the package that allows us to handle the authentication
    // jwt.sign is the way to create a token
    // first argument is payload, second argument is secret or private key which can we grab from environment variable
    // third argument is an object
    // this is how we create a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })

    // Now we need to send this token to cookies
    // first give any name as token and then token we created earlier
    // Now comes object to make it a little bit more secure
    // first option is maxAge which should be in millisecond
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // it is in millisecond
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks, this token is not accessible by javascript
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !=="development" // it is basically giving access to as http or https, right now we are in development so just put it in .env file
    });

    return token;
}