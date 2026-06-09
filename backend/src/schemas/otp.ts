import { z } from 'zod';

export const verifyOtpRequestBodySchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit numeric string'),
});

export type VerifyOtpRequestBody = z.infer<typeof verifyOtpRequestBodySchema>;
