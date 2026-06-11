import { errorResponseSchema } from "../schemas/error.js";
import { createPostRequestSchema, createPostResponseSchema, editPostRequestSchema, editPostResponseSchema, getPostByIdResponseSchema, listPostRequestSchema, listPostResponseSchema } from "../schemas/post.js";
import { postIdParam } from "./registry.js";


export const registerPostDocs = (registry) => {
    registry.registerPath({
        method: "post",
        path: "/posts",
        summary: "Create Post",
        description: "Create a new post with optional attachments and hashtags.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    "multipart/form-data": {
                        schema: createPostRequestSchema
                    }
                }
            }
        },
        responses: {
            201: {
                description: "Post created successfully",
                content: {
                    "application/json": {
                        schema: createPostResponseSchema
                    }
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
        path: "/posts",
        summary: "List Posts",
        description: "Retrieve paginated posts. Supports optional `cursor` and `limit` query parameters.",
        tags: ["Posts"],
        request: { query: listPostRequestSchema },
        responses: {
            200: {
                description: "List of posts",
                content: {
                    "application/json": {
                        schema: listPostResponseSchema
                    }
                }
            }
        }
    });


    registry.registerPath({
        method: "get",
        path: "/posts/{postId}",
        summary: "Get Post Details",
        description: "Retrieve a single post by its identifier, including related user, category, attachments, and hashtags.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        request: { params: postIdParam },
        responses: {
            200: {
                description: "Post details",
                content: {
                    "application/json": {
                        schema: getPostByIdResponseSchema
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
        method: "patch",
        path: "/posts/{postId}",
        summary: "Edit Post",
        description: "",
        security: [{ bearerAuth: [] }],
        tags: ["Posts"],
        request: {
            params: postIdParam,
            body: { content: { "multipart/form-data": { schema: editPostRequestSchema } } }
        },
        responses: {
            200: {
                description: "Updated the content successfully",
                content: {
                    "application/json": {
                        schema: editPostResponseSchema
                    }
                }
            }
        }
    })


    registry.registerPath({
        method: "delete",
        path: "/posts/{postId}",
        summary: "Delete Post",
        description: "Delete one of the authenticated user's posts.",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        request: { params: postIdParam },
        responses: {
            204: {
                description: "Post deleted successfully"
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
                description: "Post not found",
                content: {
                    "application/json": {
                        schema: errorResponseSchema
                    }
                }
            }
        }
    });

}