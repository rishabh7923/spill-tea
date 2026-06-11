import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/auth/isAuthenticated.js";

import DataSource from '../../../database/connection.js'
import { Reaction } from "../../../database/entities/Reaction.js";
import { Post } from "../../../database/entities/Post.js";

export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId } = req.params;

        await DataSource.manager.transaction(async (manager) => {
            const result = await manager
                .createQueryBuilder()
                .insert()
                .into(Reaction)
                .values({
                    post: { id: Number(postId) },
                    user: { id: req.user.id }
                })
                .orIgnore()
                .updateEntity(false) // throws error if you dont include this due to use of orIgnore()
                .execute();

            if (result.raw.affectedRows > 0) {
                await manager.increment(Post, { id: postId }, 'likes_count', 1);
            }
        });

        return res.status(201).json({ success: true });
    }
]

export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId } = req.params;

        await DataSource.manager.transaction(async (manager) => {
            const result = await manager
                .delete(Reaction, { post: { id: Number(postId) }, user: { id: req.user.id }})

            if (result.affected > 0) {
                await manager.decrement(Post, { id: postId }, 'likes_count', 1);
            }
        });

        return res.status(200).json({ success: true })
    }
]