import { z } from 'zod';
import { userSchema } from './user.js';

const loginRequestBodySchema = userSchema.pick({ username: true, password: true });

const loginResponseBodySchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({ user: userSchema, token: z.jwt() }),
});

export { loginRequestBodySchema, loginResponseBodySchema };