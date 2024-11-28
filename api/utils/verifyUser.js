import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    try {
        // Retrieve token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // If no token found or it doesn't start with "Bearer", return unauthorized error
            return next(errorHandler(401, "Unauthorized: No token provided."));
        }

        // Extract the token by removing the "Bearer " prefix
        const token = authHeader.split(" ")[1];

        // Log the token for debugging (optional)
        console.log("Access Token:", token);

        // Verify the token using the secret
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // If token verification fails, return an unauthorized error
                console.error("JWT Verification Error:", err.message);
                return next(errorHandler(403, "Unauthorized: Invalid token."));
            }

            // Attach decoded user data to the request object
            req.user = decoded;

            // Continue to the next middleware
            next();
        });
    } catch (error) {
        // Catch and handle unexpected errors
        console.error("Middleware Error:", error.message);
        return next(errorHandler(500, "Internal Server Error."));
    }
};
