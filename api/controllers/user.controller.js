import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// Only for Debugging this
export const test = (req, res) => {
    res.json({ Message: "API is Working.." });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user!'));
    }

    // Handle password
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters.'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Handle username validation
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters.'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, "Username cannot contain spaces!"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase!"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username can only contain letters and numbers!"));
        }
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


// export const updateUser = async (req, res, next) => {
//     if (req.user.id !== req.params.userId) {
//         return next(errorHandler(403, 'You are not allowed to update this user!'))
//     }
//     if (req.body.password) {
//         if (req.body.password.length < 6) {
//             return next(errorHandler(400, 'Password must be at least 6 characters.'))
//         }
//         req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }
//     if (req.body.username) {
//         if (req.body.username.length < 7 || req.body.username.length > 20) {
//             return next(errorHandler(400, 'Username must be between 7 and 20 characters.'))
//         }
//         if (req.body.username.includes(' ')) {
//             return next(errorHandler(400, "Username cannot contain spaces!"));
//         }
//         if (req.body.username !== req.body.username.toLowerCase()) {
//             return next(errorHandler(400, "Username must be lowercase!"));
//         }
//         if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//             return next(errorHandler(400, "Username can only contain letters and numbers!"));
//         }
//         try {
//             const updateUser = await User.findByIdAndUpdate(req.params.userId, {
//                 $set: {
//                     username: req.body.username,
//                     email: req.body.email,
//                     profilePicture: req.body.profilePicture,
//                     password: req.body.password,
//                 }
//             }, { new: true });
//             const { password, ...rest } = updateUser._doc;
//             res.status(200).json("data_from_backend", rest);
//         } catch (error) {
//             next(error)
//         }
//     }
// }


export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this user!'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted!")
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie("token").status(200).json("User has been signed out!")
    } catch (error) {
        next(error);
    }
};






export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to get all users'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        // 🟢 CHANGE 1: First day of this and last month
        const now = new Date();
        const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        // 🟢 CHANGE 2: Count users registered last month
        const lastMonthUsers = await User.countDocuments({
            createdAt: {
                $gte: firstDayOfLastMonth,
                $lt: firstDayOfThisMonth,
            },
        });

        res.status(200).json({
            users,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
};







export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}