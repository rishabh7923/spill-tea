import type { Handler } from "express";
import { isAuthenticated } from "../../../../../middlewares/auth/isAuthenticated.js";
import { Post } from "../../../../../database/entities/Post.js";
import { ApiError } from "../../../../../common/utils/ApiError.js";
import { NOT_FOUND } from "../../../../../common/errors.js";
import { Comment } from "../../../../../database/entities/Comment.js";
import { createReplyRequestSchema, listCommentRequestSchema } from "../../../../../schemas/comment.js";
import { validateSchema } from "../../../../../common/utils/validateSchema.js";
import { serializeComment } from "../../../../../common/serialize.js";
import AppDataSource from "../../../../../database/connection.js";

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId, commentId } = req.params;
        const { limit, page } = validateSchema(listCommentRequestSchema, req.query);

        const post = await Post.findOne({ where: { id: +postId } })
        if (!post) throw new ApiError(404, NOT_FOUND, "Post not found")

        const parentComment = await Comment.findOne({ where: { id: +commentId, post } })
        if (!parentComment) throw new ApiError(404, NOT_FOUND, "Parent comment does not exist")

        const [replies, total] = await Comment.findAndCount({
            where: { post, parent: { id: parentComment.id } },
            relations: { user: true },
            order: { created_at: -1 },
            take: limit,
            skip: limit * (page - 1)
        })

        return res.status(200).json({
            success: true,
            data: { replies: replies.map(re => serializeComment(re)) },
            pagination: {
                total_pages: Math.ceil(total / limit),
                current_page: page,
                next_page: page < Math.ceil(total / limit) ? page + 1 : null,
                prev_page: page > 1 ? page - 1 : null
            }
        })
    }
]

export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId, commentId } = req.params;
        const { content } = validateSchema(createReplyRequestSchema, req.body);

        const parentComment = await Comment.findOne({ where: { id: +commentId, post: { id: +postId } } });
        if (!parentComment) throw new ApiError(404, NOT_FOUND, "Cannot reply to a non-existent comment");

        const id = await AppDataSource.transaction(async (manager) => {
            const { id } = await manager.create(Comment, {
                post: { id: +postId },
                user: { id: req.user.id },
                parent: { id: parentComment.id },
                content: content,
            }).save()

            await manager.increment(Comment, { id: parentComment.id }, 'reply_count', 1);

            return id;
        })

        const comment = await Comment.findOne({
            where: { id },
            relations: { user: true }
        });

        return res.status(200).json({
            success: true,
            data: { comment: serializeComment(comment) }
        })
    }
]