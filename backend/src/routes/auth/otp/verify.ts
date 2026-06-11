import type { Handler } from 'express';
import { isAuthenticated } from '../../../middlewares/auth/isAuthenticated.js';
import { verifyOtpRequestBodySchema } from '../../../schemas/otp.js';
import { MoreThan } from 'typeorm';

import DataSource from '../../../database/connection.js'
import { Otp } from '../../../database/entities/Otp.js';
import { User } from '../../../database/entities/User.js';

export const post: Handler[] = [isAuthenticated, async (req, res) => {
    const parsed = verifyOtpRequestBodySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).end();
    
    const { otp } = parsed.data;

    if (
        !await Otp.findOneBy({
            user_id: req.user.id,
            otp,
            expires_at: MoreThan(new Date())
        })
    ) return res.status(401).end();

    await DataSource.manager.transaction(async (manager) => {
        await manager.update(User, { id: req.user.id }, { verified: true });
        await manager.delete(Otp, { user_id: req.user.id })
    })

    return res.status(204).end();
}];