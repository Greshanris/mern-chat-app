import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersforSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// now we need to add endpoints or routes, like all the users in sidebar except the one that is logged in
router.get("/users", protectRoute, getUsersforSidebar)

// upon clicking the sidebars profile, a new window beside scroll bar pops up, but that is ui. we will not work on that right now
// but we do need the conversation history from first conversation to last coversation in chronological order of the one we clicked and us
router.get("/:id",protectRoute,getMessages)

// now to send the messages
router.post("/send/:id", protectRoute, sendMessage)


export default router;