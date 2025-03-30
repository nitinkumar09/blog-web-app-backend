import express from "express"
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js"
import { create, deletepost, getposts } from "../controllers/post.controller.js";

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);

export default router;