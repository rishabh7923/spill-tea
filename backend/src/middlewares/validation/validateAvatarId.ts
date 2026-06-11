import { z } from "zod";
import { INVALID_PARAMETERS } from "../../common/errors.js";
import type { Request, Response, NextFunction } from "express";
import { avatarSchema } from "../../schemas/avatar.js";

export const validateAvatarId = (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = z
        .object({ avatarId: avatarSchema.shape.id })
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
    
    req.params.avatarId = data.avatarId as any;
    next();
}