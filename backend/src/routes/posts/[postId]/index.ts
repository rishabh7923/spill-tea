import multer from "multer";

import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.js";
import { INVALID_PARAMETERS, NOT_FOUND } from "../../../errors.js";
import { Post } from "../../../database/entity/Post.js";
import { editPostRequestSchema } from "../../../schemas/post.js";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import AppDataSource from "../../../database/connection.js";
import { Attachment } from "../../../database/entity/Attachment.js";
import { In } from "typeorm";
import { Category } from "../../../database/entity/Category.js";


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
    upload.array("attachmentsToAdd"),
    async (req, res) => {
        const parsed = editPostRequestSchema.safeParse(req.body);

        if (!parsed.success) return res
            .status(400)
            .json({ success: false, error: Object.assign(INVALID_PARAMETERS, { message: parsed.error.issues[0]?.message  }) });

        const { content, attachmentsToAdd, attachmentsToRemove, categoryId } = parsed.data;
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

            if (attachmentsToRemove?.length) await manager.delete(Attachment, {
                id: In(attachmentsToRemove),
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
            if (categoryId) post.category = await Category.findOne({ where: { id: Number(categoryId) } })

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