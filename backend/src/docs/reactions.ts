import { z } from "zod";
import { errorResponseSchema } from "../schemas/error.js";
import { postIdParam } from "./registry.js";

export const registerReactionDocs = (registry) => {
  registry.registerPath({
    method: "post",
    path: "/posts/{postId}/likes",
    summary: "Like Post",
    description: "Add a like to the specified post for the authenticated user.",
    tags: ["Reactions"],
    security: [{ bearerAuth: [] }],
    request: { params: postIdParam },
    responses: {
      201: {
        description: "Post liked successfully",
        content: {
          "application/json": {
            schema: z.object({ success: z.literal(true) })
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
    path: "/posts/{postId}/likes",
    summary: "Unlike Post",
    description: "Remove the authenticated user's like from the specified post.",
    tags: ["Reactions"],
    security: [{ bearerAuth: [] }],
    request: { params: postIdParam },
    responses: {
      200: {
        description: "Post unliked successfully",
        content: {
          "application/json": {
            schema: z.object({ success: z.literal(true) })
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
}
