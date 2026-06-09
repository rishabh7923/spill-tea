import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const userSchema = z.object({
  id: z.number().int().positive().openapi({
    description: "Unique identifier of the user",
    example: 1
  }),

  username: z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .transform(val => val.toLowerCase())
    .openapi({
      description: "Unique username",
      example: "johndoe"
    }),

  email: z
    .email()
    .toLowerCase()
    .openapi({
      description: "User email address",
      example: "john@example.com"
    }),

  password: z
    .string()
    .min(6)
    .max(100)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .openapi({
      description: "User password",
      example: "Password123"
    }),

  verified: z.boolean().openapi({
    description: "Whether the user's email has been verified",
    example: true
  })
}).openapi("User");
