import { success, z } from "zod";
import { userSchema } from "./user.js";
import { postSchema } from "./post.js";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { avatarSchema } from "./avatar.js";

extendZodWithOpenApi(z);

export const commentSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    description: "Unique identifier of the comment",
    example: 1
  }),

  content: z.string().min(1).openapi({
    description: "Content of the comment",
    example: "This is a great post!"
  }),

  created_at: z.iso.datetime().openapi({
    description: "ISO 8601 timestamp indicating when the comment was created",
    example: "2026-06-09T12:34:56.000Z"
  }),

  user: userSchema.openapi({
    description: "User who created the comment"
  }),

  post: postSchema.openapi({
    description: "Post associated with the comment"
  })
}).openapi("Comment", {
  description: "Represents a comment made by a user on a post."
});

export const serializedComment = z.object({
  id: commentSchema.shape.id,
  content: commentSchema.shape.content,
  created_at: commentSchema.shape.created_at,
  parent_id: z.number().nullable(),
  user: z.object({
    id: userSchema.shape.id,
    username: userSchema.shape.username,
    display_name: userSchema.shape.displayName,
    avatar_url: avatarSchema.shape.url.nullable(),
  })
})


/** Request */
export const editCommentRequestSchema = commentSchema.pick({ content: true })

export const createCommentRequestSchema = z.object({
  content: commentSchema.shape.content
})

export const createReplyRequestSchema = z.object({
  content: commentSchema.shape.content
})

export const listCommentRequestSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).max(20).default(10),
})

export const listRepliesRequestSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).max(20).default(10),
})

/** Response */
export const editCommentResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ comment: commentSchema })
})

export const createCommentResponseSchema = z.object({
  success: z.literal(true),
  data: serializedComment
})

export const createReplyResponseSchema = z.object({
  success: z.literal(true),
  data: serializedComment
})

export const listCommentResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ comments: z.array(serializedComment) }),
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    next_page: z.number().nullable(),
    prev_page: z.number().nullable()
  })
})

export const listRepliesResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ replies: z.array(serializedComment) }),
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    next_page: z.number().nullable(),
    prev_page: z.number().nullable()
  })
})