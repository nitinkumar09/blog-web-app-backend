import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from "cookie-parser";

import cors from "cors"
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB connected...!")
}).catch((error) => {
    console.log(error)
});
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// error handle middleware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error !'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})