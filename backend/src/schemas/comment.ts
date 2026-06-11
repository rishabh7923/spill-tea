import { z } from "zod";
import { userSchema } from "./user.js";
import { postSchema } from "./post.js";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

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

