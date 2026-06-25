import type { Handler } from 'express';
import { isAuthenticated } from '../../../../middlewares/auth/isAuthenticated.js';
import { Comment } from '../../../../database/entities/Comment.js';
import { createCommentRequestSchema, listCommentRequestSchema } from '../../../../schemas/comment.js';
import { validateSchema } from '../../../../common/utils/validateSchema.js';
import { Post } from '../../../../database/entities/Post.js';
import { ApiError } from '../../../../common/utils/ApiError.js';
import { NOT_FOUND } from '../../../../common/errors.js';
import { serializeComment } from '../../../../common/serialize.js';
import { optionalAuthenticated } from '../../../../middlewares/auth/optionalAuthenticated.js';
import AppDataSource from '../../../../database/connection.js';


export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { content } = validateSchema(createCommentRequestSchema, req.body)
        const { postId } = req.params;

        const post = await Post.findOne({ where: { id: +postId } })
        if (!post) throw new ApiError(404, NOT_FOUND, "Post not found");

        const id = await AppDataSource.transaction(async (manager) => {
            const { id } = await manager.create(Comment, {
                 post: { id: +postId },
                 user: { id: req.user.id },
                 content: content,
            }).save()

            await manager.increment(Post, { id: +postId }, 'comment_count', 1);

            return id;
        })

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
    optionalAuthenticated,
    async (req, res) => {
        const { limit, page } = validateSchema(listCommentRequestSchema, req.query);

        const post = await Post.findOne({ where: { id: Number(req.params.postId) } })
        if (!post) throw new ApiError(404, NOT_FOUND, "Post not found");

        /* Fetch only top level comments */
        const [comments, total] = await Comment.findAndCount({
            where: {
                post: { id: +req.params.postId },
                parent: null,
            },
            relations: { user: true },
            order: {
                created_at: "DESC",
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return res.status(200).json({
            success: true,
            data: { comments: comments.map((c) => serializeComment(c)) },
            pagination: {
                total_pages: Math.ceil(total / limit),
                current_page: page,
                next_page: page < Math.ceil(total / limit) ? page + 1 : null,
                prev_page: page > 1 ? page - 1 : null
            }
        })
    }
]