import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }
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


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are Required!'));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found !'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password !'))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error)
    }
}