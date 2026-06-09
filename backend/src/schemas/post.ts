import { number, success, z } from "zod";
import { userSchema } from "./user.js";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { attachmentSchema } from "./attachment.js";
import { categorySchema } from "./category.js";
import { hashtagSchema } from "./hashtag.js";

extendZodWithOpenApi(z)

export const postSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    description: "Unique identifier of the post",
    example: 123
  }),

  content: z.string().min(1).openapi({
    description: "Content of the post",
    example: "Hello, world!"
  }),

  user: userSchema,

  attachments: z.array(attachmentSchema).optional().openapi({
    description: "List of attachments associated with the post"
  }),

  category: categorySchema.optional().openapi({
    description: "Category assigned to the post"
  }),

  hashtags: z.array(hashtagSchema).optional().openapi({
    description: "Hashtags associated with the post"
  }),

  created_at: z.string().openapi({
    description: "Timestamp when the post was created",
    example: "2026-06-09T12:34:56Z"
  })
}).openapi("Post");


/** Request */
export const createPostRequestSchema = z.object({
  content: postSchema.shape.content,
  category_id: categorySchema.shape.id,
  attachments: z.any().optional()
});

export const listPostRequestSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce
    .number()
    .min(1)
    .default(10)
    .transform(limit => Math.min(limit, 50))
})

export const editPostRequestSchema = z.object({
  content: postSchema.shape.content.optional().openapi({
    description: "Updated post content"
  }),

  categoryId: categorySchema.shape.id.optional().openapi({
    description: "Updated Category ID"
  }),

  attachmentsToRemove: z.preprocess(
    (value) => {
      if (value === undefined) return value;
      return Array.isArray(value) ? value : [value];
    },
    z.array(attachmentSchema.shape.id)
  )
  .optional()
  .openapi({ description: "Id of attachments to remove"}),

  attachmentsToAdd: z
    .array(z.any())
    .optional()
    .openapi({
      description: "New files to attach to the post",
    }),
});

/** Response */
export const createPostResponseSchema = z.object({ success: z.boolean(), data: z.object({ post: postSchema }) })

export const listPostResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ posts: z.array(postSchema) }),
  pagination: z.object({ next_cursor: z.string().nullable() })
})

export const getPostByIdResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    post: postSchema.nullable()
  })
});

export const editPostResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ post: postSchema })
})
