import express from "express"
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js"
import { create, getposts } from "../controllers/post.controller.js";

router.post("/create", verifyToken, create)
router.get("/getposts", getposts);

export default router;