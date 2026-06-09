import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.js";
import {  INVALID_PARAMETERS, NOT_FOUND } from "../../../errors.js";
import { Post } from "../../../database/entity/Post.js";
import { editPostRequestSchema } from "../../../schemas/post.js";

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
    async (req, res) => {
        const parsed = editPostRequestSchema.safeParse(req.body);
        
        if (!parsed.success) return res
            .status(400)
            .json({ success: false, error: INVALID_PARAMETERS });

        const { content } = parsed.data;
        const { postId } = req.params;

        await Post.update({
            id: Number(postId),
            user: { id: req.user.id} },
            { content }
        )

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