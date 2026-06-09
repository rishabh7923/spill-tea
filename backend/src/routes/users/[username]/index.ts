import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.js";
import { User } from "../../../database/entity/User.js";

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { username } = req.params;
        const user = await User.findOne({ where: { username: username as string }})

        return res.status(200).json({
            success: true,
            data: { user }
        })
    }
]