import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

import cors from "cors"
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB connected...!")
}).catch((error) => {
    console.log(error)
});
const app = express();
app.use(cors({
    origin: "http://your-frontend-domain.com", // Update with your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

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