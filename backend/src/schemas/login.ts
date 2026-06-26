import { z } from 'zod';
import { userSchema, serializedUserSchema } from './user.js';

const loginRequestBodySchema = userSchema.pick({ username: true, password: true });

const loginResponseBodySchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({ user: serializedUserSchema, token: z.jwt() }),
});

export type LoginRequestBody = z.infer<typeof loginRequestBodySchema>;
export type LoginResponseBody = z.infer<typeof loginResponseBodySchema>;

export { loginRequestBodySchema, loginResponseBodySchema };