import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/auth/isAuthenticated.js";
import { User } from "../../../database/entities/User.js";
import { rateLimiter } from "../../../middlewares/rateLimiter.js";

export const get: Handler[] = [
    isAuthenticated,
    rateLimiter({ resource: 'read', cost: 1}),
    async (req, res) => {
        const { username } = req.params;
        const user = await User.findOne({ where: { username: username as string } })

        return res.status(200).json({
            success: true,
            data: { user }
        })
    }
]