import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { INVALID_PARAMETERS, EMAIL_EXIST, USERNAME_EXISTS } from '../../common/errors.js';
import { User } from '../../database/entities/User.js';
import { signUpRequestBodySchema } from '../../schemas/signup.js';
import { validateSchema } from '../../common/utils/validateSchema.js';
import { ApiError } from '../../common/utils/ApiError.js';

export const post: Handler = async (req, res) => {
    const { password, email, username } = validateSchema(signUpRequestBodySchema, req.body);

    /* Check if the email is unique */
    if (await User.findOneBy({ email })) throw new ApiError(409, EMAIL_EXIST);

    /* Check if the username is unique */
    if (await User.findOneBy({ username })) throw new ApiError(409, USERNAME_EXISTS);

    let payload = {
        id: null,
        username,
        display_name: username,
        email,
        verified: false
    }

    const user = await User.insert({
        ...payload,
        password: await bcrypt.hash(password, 10)
    })

    payload.id = user.identifiers[0].id;

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' })

    return res.status(201).json({
        success: true,
        message: 'User signed up successfully',
        data: { user: payload, token }
    });
};