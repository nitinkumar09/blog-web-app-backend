import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, "All field are Required !"));
        }


        // Insert the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        // console.log("Data : ", username, email, password)
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        next(error);
    }
};