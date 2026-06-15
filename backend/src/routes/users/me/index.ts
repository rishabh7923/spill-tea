import type { Handler } from "express"
import { isAuthenticated } from "../../../middlewares/auth/isAuthenticated.js"
import { User } from '../../../database/entities/User.js';
import { updateUserRequestSchema } from "../../../schemas/user.js";
import { INVALID_PARAMETERS, NOT_FOUND } from "../../../common/errors.js";
import { Avatar } from "../../../database/entities/Avatar.js";

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findOne({ where: { id: req.user.id } })

        return res.status(200)
            .json({ success: true, data: { user } })
    }
]

export const patch: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const parsed = updateUserRequestSchema.safeParse(req.body);
        if (!parsed.success)
            return res
                .status(400)
                .json({ success: false, code: Object.assign(INVALID_PARAMETERS, { message: parsed.error.issues[0]?.message }) })

        const { avatar_id, bio, display_name } = parsed.data;
        const user = await User.findOne({ where: { id: req.user.id } });

        if (avatar_id !== undefined) {
            if (avatar_id === null) user.avatar = null
            else {
                const avatar = await Avatar.findOne({ where: { id: avatar_id } });
                if (!avatar) return res.status(400).json({ success: false, code: NOT_FOUND });
                user.avatar = avatar;
            }
        }

        if (bio != undefined) user.bio = bio;
        if (display_name) user.display_name = display_name;

        await user.save();

        return res.status(200).json({ success: true, data: { user } });
    }
]


export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        await User.delete({ id: req.user.id });
        return res.status(204).end();
    }
]