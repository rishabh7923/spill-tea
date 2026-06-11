import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const avatarSchema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string(),
    url: z.url(),
    publicId: z.string()
})

/** Request */
export const createAvatarRequestSchema = z.object({
    name: avatarSchema.shape.name,
    avatar: z
        .any()
        .optional()
        .openapi({
            type: "string",
            format: "binary",
            description:
                "Avatar image file (JPEG, PNG, or WebP)",
        }),
});

/** Response */
export const listAvatarResponseSchema = z.object({
    success: z.literal(true),
    data: z.object({ avatars: z.array(avatarSchema) })
})

export const createAvatarResponseSchema = z.object({
    success: z.literal(true),
    data: z.object({ avatar: avatarSchema })
})