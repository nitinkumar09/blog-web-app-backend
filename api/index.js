import { error } from "console"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB connected...!")
}).catch((error) => {
    console.log(error)
});

const app = express();
app.get("/", (req, res) => {
    res.send("hello nitin")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})