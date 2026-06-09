import type { Handler } from "express";
import { Hashtag } from "../../database/entity/Hashtag.js";

export const get: Handler[] = [
    async (req, res) => {
        const hashtags = await Hashtag.find();
        return res.status(200).json({
            success: true,
            data: { hashtags }
        })
    }
]