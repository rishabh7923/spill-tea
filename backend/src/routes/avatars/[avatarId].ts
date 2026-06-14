import type { Handler } from "express";
import { Avatar } from "../../database/entities/Avatar.js";
import { isAuthenticated } from "../../middlewares/auth/isAuthenticated.js";

import { v2 as cloudinary } from 'cloudinary'
import { NOT_FOUND } from "../../common/errors.js";

export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { avatarId } = req.params;

        const avatar = await Avatar.findOne({ where: { id: Number(avatarId) }})
        if (!avatar) return res.status(404).json({ success: false, error: NOT_FOUND })
        
        await avatar.remove()
        await cloudinary.uploader.destroy(avatar.public_id)

        return res.status(204).end()
    }
]