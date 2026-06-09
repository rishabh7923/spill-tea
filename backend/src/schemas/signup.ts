import { z } from 'zod';
import { userSchema } from './user.js';

const signUpRequestBodySchema =  userSchema.pick({ email: true, username: true, password: true })

const signUpResponseBodySchema = z.object({
    success: z.literal(true),
    message: z.string(),
    data: z.object({ user: userSchema, token: z.jwt() })
})

export { signUpResponseBodySchema, signUpRequestBodySchema };