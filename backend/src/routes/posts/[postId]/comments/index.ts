import type { Handler } from 'express';
import { isAuthenticated } from '../../../../middlewares/auth/isAuthenticated.js';
import { Comment } from '../../../../database/entities/Comment.js';
import { createCommentRequestSchema, listCommentRequestSchema } from '../../../../schemas/comment.js';
import { validateSchema } from '../../../../common/utils/validateSchema.js';
import { Post } from '../../../../database/entities/Post.js';
import { ApiError } from '../../../../common/utils/ApiError.js';
import { NOT_FOUND } from '../../../../common/errors.js';
import { serializeComment } from '../../../../common/serialize.js';


export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { content } = validateSchema(createCommentRequestSchema, req.body)
        const { postId } = req.params;

        const post = await Post.findOne({ where: { id: +postId } })
        if (!post) throw new ApiError(404, NOT_FOUND, "Post not found");

        const { id } = await Comment.create({
            post: { id: +postId },
            user: { id: req.user.id },
            content: content,
        }).save();

        const comment = await Comment.findOne({
            where: { id },
            relations: { user: true }
        });

        res.status(201).json({
            success: true,
            data: { comment: serializeComment(comment) }
        })
    }
]

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { limit, offset } = validateSchema(listCommentRequestSchema, req.query);

        const post = await Post.findOne({ where: { id: Number(req.params.postId) } })
        if (!post) throw new ApiError(404, NOT_FOUND, "Post not found");

        /* Fetch only top level comments */
        const [comments, total] = await Comment.findAndCount({
            where: {
                post: { id: +req.params.postId },
                parent: null,
            },
            relations: {
                user: true,
            },
            order: {
                created_at: "DESC",
            },
            skip: offset,
            take: limit,
        });

        return res.status(200).json({
            success: true,
            data: { comments: comments.map((c) => serializeComment(c)) },
            pagination: {
                total,
                limit,
                offset,
                has_next: offset + comments.length < total,
                has_prev: offset > 0
            }
        })
    }
]