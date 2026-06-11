import { z } from "zod";
import { errorResponseSchema } from "../schemas/error.js";
import { updateUserRequestSchema, updateUserResponseSchema, userSchema } from "../schemas/user.js";
import { usernameParam } from "./registry.js";

export const registerUserDocs = (registry) => {
  registry.registerPath({
    method: "get",
    path: "/users/me",
    summary: "Get Current User",
    description: "Retrieve the authenticated user's profile.",
    tags: ["Users"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Current user profile",
        content: {
          "application/json": {
            schema: z.object({ success: z.literal(true) }).extend({ data: z.object({ user: userSchema }) })
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
    path: "/users/me",
    summary: "Delete Current User",
    description: "Delete the authenticated user's account.",
    tags: ["Users"],
    security: [{ bearerAuth: [] }],
    responses: {
      204: {
        description: "User deleted successfully"
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
    path: "/users/{username}",
    summary: "Get User by Username",
    description: "Retrieve a user profile by username.",
    tags: ["Users"],
    request: {
      params: usernameParam
    },
    responses: {
      200: {
        description: "User profile",
        content: {
          "application/json": {
            schema: z.object({ success: z.literal(true) }).extend({ data: z.object({ user: userSchema }) })
          }
        }
      }
    }
  });


  registry.registerPath({
    method: "patch",
    path: "/users/me",
    tags: ["Users"],
    summary: "Update Current User",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: updateUserRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "User updated successfully",
        content: {
          "application/json": {
            schema: updateUserResponseSchema,
          },
        },
      }
    },
  });
}
