import multer from "multer";

import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/auth/isAuthenticated.js";
import { INVALID_PARAMETERS, NOT_FOUND } from "../../../common/errors.js";
import { Post } from "../../../database/entities/Post.js";
import { editPostRequestSchema } from "../../../schemas/post.js";
import { v2 as cloudinary } from 'cloudinary'
import AppDataSource from "../../../database/connection.js";
import { Attachment } from "../../../database/entities/Attachment.js";
import { In } from "typeorm";
import { Category } from "../../../database/entities/Category.js";


const upload = multer({ storage: multer.memoryStorage() });

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const post = await Post.findOne({
            where: { id: Number(req.params.postId) },
            relations: { user: true, category: true, attachments: true, hashtags: true }
        })

        return res.status(200).json({
            success: true,
            data: { post }
        })
    }
]

export const patch: Handler[] = [
    isAuthenticated,
    upload.array("attachments_to_add"),
    async (req, res) => {
        const parsed = editPostRequestSchema.safeParse(req.body);

        if (!parsed.success) return res
            .status(400)
            .json({ success: false, error: Object.assign(INVALID_PARAMETERS, { message: parsed.error.issues[0]?.message  }) });

        const { content, attachments_to_add, attachments_to_remove, category_id } = parsed.data;
        const { postId } = req.params;

        const files = Array.isArray(req.files) ? req.files : [];
        const uploaded = await Promise.all(
            files.map(file =>
                cloudinary.uploader.upload(
                    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                    { folder: 'attachments' }
                )
            )
        );

        await AppDataSource.transaction(async (manager) => {
            const post = await manager.findOneOrFail(Post, {
                where: {
                    id: +postId,
                    user: { id: req.user.id }
                }
            })

            if (attachments_to_remove?.length) await manager.delete(Attachment, {
                id: In(attachments_to_remove),
                post: { id: post.id }
            })

            if (uploaded.length) await manager.insert(
                Attachment,
                uploaded.map((file) => ({
                    url: file.secure_url,
                    post: { id: Number(postId) }
                }))
            )

            if (content) post.content = content;
            if (category_id) post.category = await Category.findOne({ where: { id: Number(category_id) } })

            await manager.save(post);
        })

        const post = await Post.findOne({
            where: { id: Number(postId) },
            relations: { attachments: true, user: true, category: true, hashtags: true }
        })

        return res.status(200).json({
            success: true,
            data: { post }
        })
    }
]

export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const deleted = await Post.delete({
            id: Number(req.params.postId),
            user: { id: req.user.id }
        })

        if (!deleted.affected) return res.status(404).json({
            success: false,
            error: NOT_FOUND
        })

        return res.status(204).end();
    }
]