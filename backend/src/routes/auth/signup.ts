import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { INVALID_PARAMETERS, EMAIL_EXIST, USERNAME_EXISTS } from '../../common/errors.js';
import { User } from '../../database/entities/User.js';
import { signUpRequestBodySchema } from '../../schemas/signup.js';
import { serializeUser } from '../../common/serialize.js';

export const post: Handler = async (req, res) => {
    const body = signUpRequestBodySchema.safeParse(req.body);

    if (!body.success) {
        return res.status(400).json({
            success: false,
            error: Object.assign(INVALID_PARAMETERS, { message: body.error.issues[0]?.message }),
        });
    }

    const { password, email, username } = req.body;

    /* Check if the email is unique */
    if (await User.findOneBy({ email })) {
        return res.status(400).json({
            success: false,
            error: EMAIL_EXIST
        });
    }

    /* Check if the username is unique */
    if (await User.findOneBy({ username })) {
        return res.status(400).json({
            success: false,
            error: USERNAME_EXISTS
        });
    }

    const user = await User.insert({
        username,
        password: await bcrypt.hash(password, 10),
        email,
        verified: false
    })

    const payload = {
        id: user.identifiers[0].id,
        username,
        email,
        verified: false
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' })

    return res.status(201).json({
        success: true,
        message: 'User signed up successfully',
        data: { user: payload, token }
    });
};