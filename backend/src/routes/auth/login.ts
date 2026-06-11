import type { Handler } from 'express';
import { User } from '../../database/entities/User.js';
import { INVALID_PARAMETERS, INVALID_CREDENTIALS } from '../../common/errors.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginRequestBodySchema } from '../../schemas/login.js';

export const post: Handler = async (req, res) => {
  const body = loginRequestBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      success: false,
      error: Object.assign(INVALID_PARAMETERS, { message: body.error.issues[0]?.message })
    })
  }

  const { username, password } = body.data;

  const user = await User.findOne({
    select: ['email', 'id', 'password', 'username', 'verified'],
    where: { username }
  })

  if (!user) {
    return res.status(401).json({
      success: false,
      error: INVALID_CREDENTIALS
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: INVALID_CREDENTIALS
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    verified: user.verified
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY!,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user: payload, token }
  });
};