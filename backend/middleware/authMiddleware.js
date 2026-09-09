import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // Get authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user
        const user = await User.findById(decoded.userId).select(
            "-password"
        );

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.error("AUTH ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;