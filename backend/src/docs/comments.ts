import { z } from "zod";
import { errorResponseSchema } from "../schemas/error.js";
import {createCommentRequestSchema, createCommentResponseSchema, editCommentRequestSchema, editCommentResponseSchema, listCommentRequestSchema, listCommentResponseSchema } from "../schemas/comment.js";
import { postIdParam, postCommentParam } from "./registry.js";

export const registerCommentDocs = (registry) => {
  registry.registerPath({
    method: "post",
    path: "/posts/{postId}/comments",
    summary: "Create Comment",
    description: "Add a new comment to the specified post for the authenticated user.",
    tags: ["Comments"],
    security: [{ bearerAuth: [] }],
    request: {
      params: postIdParam,
      body: {
        content: {
          "application/json": {
            schema: createCommentRequestSchema
          }
        }
      }
    },
    responses: {
      201: {
        description: "Comment created successfully",
        content: {
          "application/json": { schema: createCommentResponseSchema }
        }
      },
      400: {
        description: "Missing or invalid request parameters",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      }
    }
  });


  registry.registerPath({
    method: "get",
    path: "/posts/{postId}/comments",
    summary: "List Comments",
    description: "Retrieve all comments for the specified post.",
    tags: ["Comments"],
    security: [{ bearerAuth: [] }],
    request: { params: postIdParam, query: listCommentRequestSchema },
    responses: {
      200: {
        description: "List of comments",
        content: {
          "application/json": {
            schema: listCommentResponseSchema
          }
        }
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      }
    }
  });

  registry.registerPath({
    method: "delete",
    path: "/posts/{postId}/comments/{commentId}",
    summary: "Delete Comment",
    description: "Deletes a comment from the specified post.",
    tags: ["Comments"],
    security: [{ bearerAuth: [] }],
    request: {
      params: postCommentParam
    },
    responses: {
      204: {
        description: "Comment deleted successfully."
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
      404: {
        description: "Comment Not Found",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
    }
  });

  registry.registerPath({
    method: "patch",
    path: "/posts/{postId}/comments/{commentId}",
    summary: "Edit Comment",
    description: "Edit a comment on a post",
    tags: ["Comments"],
    security: [{ bearerAuth: [] }],
    request: {
      params: postCommentParam,
      body: { content: { 'application/json': { schema: editCommentRequestSchema } } }
    },
    responses: {
      200: {
        description: "Comment edited successfully.",
        content: {
          "application/json": { schema: editCommentResponseSchema }
        }
      },
      404: {
        description: "Comment Not Found",
        content: {
          "application/json": { schema: errorResponseSchema }
        }
      },
    }
  });
}
