import type { Handler } from "express";
import { isAuthenticated } from "../../../../middlewares/auth/isAuthenticated.js";
import { NOT_FOUND } from "../../../../common/errors.js";
import { Comment } from "../../../../database/entities/Comment.js";

export const del: Handler[] = [
    isAuthenticated,
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