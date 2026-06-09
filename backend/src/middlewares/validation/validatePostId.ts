import { INVALID_PARAMETERS } from "../../errors.js";
import { postSchema } from "../../schemas/post.js";

export const validatePostId = (req, res, next) => {
    const { success, data, error } = postSchema.pick({ id: true }).safeParse(req.params);

    if (!success) {
        return res.status(400).json({
            success: false,
            error: {
                ...INVALID_PARAMETERS,
                message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
            },
        });
    }

    req.params.postId = data.id;
    next();
}