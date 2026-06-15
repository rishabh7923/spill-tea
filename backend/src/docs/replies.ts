import { createReplyRequestSchema, createReplyResponseSchema, listRepliesRequestSchema, listRepliesResponseSchema } from "../schemas/comment.js";
import { errorResponseSchema } from "../schemas/error.js";
import { postCommentParam } from "./registry.js";

export const registerRepliesDocs = (registry) => {
  registry.registerPath({
    method: "get",
    path: "/posts/{postId}/comments/{commentId}/replies",
    summary: "List Replies",
    description: "Retrieve all replies for the specified comment.",
    tags: ["Replies"],
    security: [{ bearerAuth: [] }],
    request: { params: postCommentParam, query: listRepliesRequestSchema },
    responses: {
      200: {
        description: "List of comments",
        content: {
          "application/json": {
            schema: listRepliesResponseSchema
          }
        }
      }
    }
  });


  registry.registerPath({
    method: "post",
    path: "/posts/{postId}/comments/{commentId}/replies",
    summary: "Reply To Comment",
    description: "Create a reply for the specified comment.",
    tags: ["Replies"],
    security: [{ bearerAuth: [] }],
    request: {
      params: postCommentParam,
      body: {
        content: { "application/json": { schema: createReplyRequestSchema } }
      }
    },
    responses: {
      201: {
        description: "Reply created",
        content: {
          "application/json": {
            schema: createReplyResponseSchema
          }
        }
      }
    }
  });
}