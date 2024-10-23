import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
export const signup = async (req, res) => {
    const { username, password, email } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).json({ message: "All field are required !" })
        }




        // Insert the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        // console.log("Data : ", username, email, password)
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};