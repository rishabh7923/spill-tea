import { z } from 'zod';
import { userSchema, serializedUserSchema } from './user.js';

export const signUpRequestBodySchema = userSchema.pick({ email: true, username: true, password: true })

export const signUpResponseBodySchema = z.object({
    success: z.literal(true),
    message: z.string(),
    data: z.object({ user: serializedUserSchema, token: z.jwt() })
})

export type SignUpRequestBody = z.infer<typeof signUpRequestBodySchema>;
export type SignUpResponseBody = z.infer<typeof signUpResponseBodySchema>;