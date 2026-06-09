import { z } from "zod";
import { INVALID_PARAMETERS } from "../../errors.js";
import { commentSchema } from "../../schemas/comment.js";
import type { Request, Response, NextFunction } from "express";

export const validateCommentId = (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = z
        .object({ commentId: commentSchema.shape.id })
        .safeParse(req.params);

    if (!success) {
        return res.status(400).json({
            success: false,
            error: {
                ...INVALID_PARAMETERS,
                message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
            },
        });
    }
    
    req.params.commentId = data.commentId as any;
    next();
}