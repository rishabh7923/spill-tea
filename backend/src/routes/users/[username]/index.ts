import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/auth/isAuthenticated.js";
import { User } from "../../../database/entities/User.js";

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { username } = req.params;
        const user = await User.findOne({ where: { username: username as string }, relations: { avatar: true } })

        return res.status(200).json({
            success: true,
            data: { user }
        })
    }
]