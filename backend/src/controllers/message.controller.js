import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersforSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        // tells mongoose, find all the users but do not find the loggedInUserId $ne: means not equals:
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async(req,res) => {
    try {
        const { id:userToChatId } = req.params // to grab the /:id that is written in url using req.params, and in destructuring part, we just renamed the /:id with userToChatId
        const myId = req.user._id;

        // find all the messages where either i am the sender or the other one is sender
        // so the filter used in find is an object where $or is used with a list, 
        // here the object inside the list defined in $or is find messages where senderId is senderId and receiverId is userToChatId, or senderId is userToChatId
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId}, 
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error"})
    }
}

// when we send the message, it will either be text or could be an image
export const sendMessage = async(req,res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // now checking if sender is sending image or not
        let imageUrl; // undefined at first
        // then, if image is true, then
        if (image) {
            // Uploading the base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // creating new message form Message model made with messageSchema
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        // now saving the newMessage in database using mongoose
        await newMessage.save();

        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
        
    }
}