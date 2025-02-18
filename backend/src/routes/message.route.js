import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersforSidebar } from "../controllers/message.controller.js";

const router = express.Router();

// now we need to add endpoints or routes
router.get("/users", protectRoute, getUsersforSidebar)


export default router;