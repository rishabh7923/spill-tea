import type { Handler } from 'express';
import { Otp } from '../../../database/entities/Otp.js';

import { OTP_ALREADY_SENT, OTP_SEND_FAILED } from '../../../common/errors.js';
import { isAuthenticated } from '../../../middlewares/auth/isAuthenticated.js';
import { generateOTP, sendOTPMail } from '../../../common/utils.js';
import { MoreThan } from 'typeorm';

export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const user = req.user!;

        if (
            await Otp.findOneBy({
                user_id: user.id,
                expires_at: MoreThan(new Date())
            })
        ) return res.status(429).json({ success: false, error: OTP_ALREADY_SENT })

        const otp = generateOTP(6);
        const success = await sendOTPMail(user.email, otp);

        if (!success) {
            return res.status(500).json({ success: false, error: OTP_SEND_FAILED })
        }

        await Otp.upsert({
            user_id: user.id,
            otp: otp,
            expires_at: new Date(Date.now() + (3 * 60 * 1000)),
            created_at: new Date()
        }, ['user_id'])

        return res.status(204).end();
    }];