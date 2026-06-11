import type { Handler } from "express";
import { isAuthenticated } from "../../middlewares/auth/isAuthenticated.js";
import { Avatar } from "../../database/entities/Avatar.js";

import multer from "multer";
import { createAvatarRequestSchema } from "../../schemas/avatar.js";
import { v2 as cloudinary } from 'cloudinary'
import { INVALID_PARAMETERS } from "../../common/errors.js";

const upload = multer({ storage: multer.memoryStorage() });

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const avatars = await Avatar.find();

        return res.status(200).json({
            success: true,
            data: { avatars }
        })
    }
]

export const post: Handler[] = [
    isAuthenticated,
    upload.single("avatar"),
    async (req, res) => {
        const parsed = createAvatarRequestSchema.safeParse({...req.body, ...req.file})
        if (!parsed.success)
            return res
                .status(400)
                .json({ success: false, code: Object.assign(INVALID_PARAMETERS, { message: parsed.error.issues[0]?.message }) })

        const { name } = parsed.data;
        const { mimetype, buffer } = req.file;

        const avatarUploaded = await cloudinary.uploader.upload(
            `data:${mimetype};base64,${buffer.toString("base64")}`,
            { folder: 'avatars' }
        )

        try {
            const avatar = await Avatar.create({
                name,
                url: avatarUploaded.secure_url,
                publicId: avatarUploaded.public_id
            }).save();

            return res.status(201).json({
                success: true,
                data: { avatar },
            });
        } catch (error) {
            await cloudinary.uploader.destroy(avatarUploaded.public_id);
            throw error;
        }
    }
]