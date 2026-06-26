import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { success, z } from "zod";
import { avatarSchema } from "./avatar.js";

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

  display_name: z.string(),

  avatar: avatarSchema.nullable(),

  bio: z.string().nullable().openapi({
    description: "User's bio",
    example: "Software engineer and tech enthusiast"
  }),

  verified: z.boolean().openapi({
    description: "Whether the user's email has been verified",
    example: true
  })
}).openapi("User");


export const serializedUserSchema = z.object({
  id: userSchema.shape.id,
  username: userSchema.shape.username,
  email: userSchema.shape.email,
  display_name: userSchema.shape.display_name,
  verified: userSchema.shape.verified,
  bio: userSchema.shape.bio.optional(),
  avatar: z.object({
    id: avatarSchema.shape.id,
    url: avatarSchema.shape.url
  }).optional().nullable()
}).openapi("UserResponse");


/** Request */
export const updateUserRequestSchema = z.object({
  avatar_id: avatarSchema.shape.id.optional().nullable(),
  display_name: userSchema.shape.display_name.optional(),
  bio: userSchema.shape.bio.optional()
})

/** Response */
export const updateUserResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ user: serializedUserSchema })
})