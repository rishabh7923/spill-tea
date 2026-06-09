import type { Handler } from 'express';
import { success, z } from "zod";
import { isAuthenticated } from '../../../../middlewares/isAuthenticated.js';
import { INVALID_PARAMETERS } from '../../../../errors.js';
import { Comment } from '../../../../database/entity/Comment.js';
import { commentSchema } from '../../../../schemas/comment.js';

export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const parsed = commentSchema.pick({ content: true }).safeParse(req.body);
        if (!parsed.success) return res.status(400)
            .json({ success: false, error: Object.assign(INVALID_PARAMETERS, { message: parsed.error.issues[0]?.message })})

        const addedComment = await Comment.save({
            post: { id: Number(req.params.postId) },
            user: { id: req.user.id },
            content: parsed.data.content
        })

        const comment = await Comment.findOne({
            where: { id: addedComment.id },
            relations: { user: true, post: true }
        })

        res.status(201).json({
            success: true,
            data: { comment }
        })
    }
]

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const comments = await Comment.find({
            where: { post: { id: Number(req.params.postId) } },
            relations: { user: true }
        })

        return res.status(200).json({
            success: true,
            data: { comments },
        })
    }
]