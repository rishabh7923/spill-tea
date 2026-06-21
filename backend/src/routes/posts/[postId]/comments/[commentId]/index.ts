import type { Handler } from "express";
import { isAuthenticated } from "../../../../../middlewares/auth/isAuthenticated.js";
import { NOT_FOUND } from "../../../../../common/errors.js";
import { Comment } from "../../../../../database/entities/Comment.js";
import { validateSchema } from "../../../../../common/utils/validateSchema.js";
import { editCommentRequestSchema } from "../../../../../schemas/comment.js";
import { ApiError } from "../../../../../common/utils/ApiError.js";
import { serializeComment } from "../../../../../common/serialize.js";
import { rateLimiter } from "../../../../../middlewares/rateLimiter.js";

export const del: Handler[] = [
    isAuthenticated,
    rateLimiter({ resource: 'write', cost: 5 }),
    async (req, res) => {
        const deleted = await Comment.delete({
            id: Number(req.params.commentId),
            user: { id: req.user.id }
        })

        if (!deleted.affected) return res.status(404).json({
            success: false,
            error: NOT_FOUND
        })

        return res.status(204).end();
    }
]

export const patch: Handler[] = [
    isAuthenticated,
    rateLimiter({ resource: 'write', cost: 5 }),
    async (req, res) => {
        const { postId, commentId } = req.params;
        const parsed = await validateSchema(editCommentRequestSchema, req.body)

        const comment = await Comment.findOne({
            where: {
                id: +commentId,
                post: { id: +postId },
                user: { id: req.user.id }
            },
            relations: { user: true }
        })

        if (!comment) throw new ApiError(404, NOT_FOUND)

        comment.content = parsed.content;
        await comment.save()

        return res.status(200).json({
            success: true,
            data: { comment: serializeComment(comment) }
        })
    }
]