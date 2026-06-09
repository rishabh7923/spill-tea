import z from "zod";
import { INVALID_PARAMETERS } from "../../errors.js";
import { postSchema } from "../../schemas/post.js";
import type { NextFunction, Request, Response } from "express";

export const validatePostId = (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = z.object({ postId: postSchema.shape.id }).safeParse(req.params)

    if (!success) {
        return res.status(400).json({
            success: false,
            error: {
                ...INVALID_PARAMETERS,
                message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
            },
        });
    }

    req.params.postId = data.postId as any;
    next();
}