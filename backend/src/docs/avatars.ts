import { listAvatarResponseSchema, createAvatarRequestSchema, createAvatarResponseSchema } from "../schemas/avatar.js";
import { avatarIdParam } from "./registry.js";

export const registerAvatarDocs = (registry) => {
  registry.registerPath({
    method: "get",
    path: "/avatars/",
    summary: "List Available Avatars",
    description: "Retrieve all available avatars that users can choose for their profile.",
    tags: ["Avatars"],
    security: [{ bearerAuth: [] }],
    request: {},
    responses: {
      200: {
        description: "Avatars retrieved successfully",
        content: {
          "application/json": {
            schema: listAvatarResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: "post",
    path: "/avatars/",
    summary: "Create Avatar",
    description: "Upload a new avatar and add it to the list of available profile avatars.",
    tags: ["Avatars"],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "multipart/form-data": {
            schema: createAvatarRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Avatar created successfully",
        content: {
          "application/json": {
            schema: createAvatarResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: "delete",
    path: "/avatars/{avatarId}",
    summary: "Delete Avatar",
    description: "Deletes a avatar by its unique identifier.",
    tags: ["Avatars"],
    security: [{ bearerAuth: [] }],
    request: {
      params: avatarIdParam,
    },
    responses: {
      204: {
        description: "Avatar deleted successfully.",
      }
    },
  });

}
