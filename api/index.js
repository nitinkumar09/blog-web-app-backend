import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from "cookie-parser";
import path from 'path';

import cors from "cors"
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB connected...!")
}).catch((error) => {
    console.log(error)
});
const __dirname = path.resolve();
const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const allowedOrigins = [
    "http://localhost:5173",                    // local dev
    "https://blog-web-app-gilt-psi.vercel.app",      // your live domain
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


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