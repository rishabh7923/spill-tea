import {
  OpenAPIRegistry,
  OpenApiGeneratorV3
} from "@asteasolutions/zod-to-openapi"
import { signUpRequestBodySchema, signUpResponseBodySchema } from "../schemas/signup.js"
import { errorResponseSchema } from "../schemas/error.js"
import { loginRequestBodySchema, loginResponseBodySchema } from "../schemas/login.js"
import { verifyOtpRequestBodySchema } from "../schemas/otp.js"
import { editPostRequestSchema, editPostResponseSchema, postSchema } from "../schemas/post.js"
import { z } from "zod"
import { hashtagSchema } from "../schemas/hashtag.js"
import { userSchema } from "../schemas/user.js"

import { createPostResponseSchema, createPostRequestSchema } from "../schemas/post.js"
import { listPostRequestSchema, listPostResponseSchema } from "../schemas/post.js"
import { getPostByIdResponseSchema } from "../schemas/post.js";
import { commentSchema} from "../schemas/comment.js";

const successResponseSchema = z.object({
  success: z.literal(true)
})

const statusResponseSchema = z.object({
  status: z.literal("OK")
})

const registry = new OpenAPIRegistry()

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

/**
 * Parameters
 */

const postIdParam = z.object({
  postId: postSchema.shape.id
})

const postCommentParam = z.object({
  postId: postSchema.shape.id,
  commentId: commentSchema.shape.id
})

const usernameParam = z.object({
  username: userSchema.shape.username
})


/**
 * Paths
 */

registry.registerPath({
  method: "post",
  path: "/auth/signup",
  summary: "User Registration",
  description: "Create a new user account using the provided registration details.",
  tags: ["Authorization"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: signUpRequestBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Account created successfully",
      content: {
        "application/json": {
          schema: signUpResponseBodySchema
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
    }
  }
});

registry.registerPath({
  method: "post",
  path: "/auth/login",
  summary: "User Login",
  description: "Authenticate a user using their credentials and return an access token or session details.",
  tags: ["Authorization"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginRequestBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: loginResponseBodySchema
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
      description: "Invalid credentials",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
})

registry.registerPath({
  method: "post",
  path: "/auth/otp/send",
  summary: "Send OTP",
  description: "Send a one-time password (OTP) to the authenticated user's email.",
  tags: ["Authorization"],
  security: [{ bearerAuth: [] }],
  responses: {
    204: {
      description: "OTP sent successfully"
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    },
    429: {
      description: "OTP already sent",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    },
    500: {
      description: "Failed to send OTP",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
});

registry.registerPath({
  method: "post",
  path: "/auth/otp/verify",
  summary: "Verify OTP",
  description: "Verify a previously sent one-time password (OTP) for the authenticated user.",
  tags: ["Authorization"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: verifyOtpRequestBodySchema
        }
      }
    }
  },
  responses: {
    204: {
      description: "OTP verified successfully"
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
      description: "Invalid or expired OTP",
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
  path: "/status",
  summary: "Service Status",
  description: "Check whether the API is running.",
  tags: ["System"],
  responses: {
    200: {
      description: "Service is healthy",
      content: {
        "application/json": {
          schema: statusResponseSchema
        }
      }
    }
  }
});

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
  path: "/hashtags",
  summary: "List Hashtags",
  description: "Retrieve all available hashtags.",
  tags: ["Hashtags"],
  responses: {
    200: {
      description: "List of hashtags",
      content: {
        "application/json": {
          schema: successResponseSchema.extend({
            data: z.object({
              hashtags: z.array(hashtagSchema)
            })
          })
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
          schema: successResponseSchema.extend({
            data: z.object({
              user: userSchema
            })
          })
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
          schema: successResponseSchema.extend({
            data: z.object({
              user: userSchema
            })
          })
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
  summary: "Edit Post Content",
  description: "",
  security: [{ bearerAuth: [] }],
  tags: ["Posts"],
  request: {
    params: postIdParam,
    body: { content: { "application/json": { schema: editPostRequestSchema }} }
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

registry.registerPath({
  method: "post",
  path: "/posts/{postId}/comments",
  summary: "Create Comment",
  description: "Add a new comment to the specified post for the authenticated user.",
  tags: ["Posts"],
  security: [{ bearerAuth: [] }],
  request: {
    params: postIdParam,
    body: {
      content: {
        "application/json": {
          schema: commentSchema.pick({ content: true })
        }
      }
    }
  },
  responses: {
    201: {
      description: "Comment created successfully",
      content: {
        "application/json": {
          schema: successResponseSchema.extend({ data: z.object({ comment: commentSchema })})
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
  path: "/posts/{postId}/comments",
  summary: "List Comments",
  description: "Retrieve all comments for the specified post.",
  tags: ["Posts"],
  security: [{ bearerAuth: [] }],
  request: { params: postIdParam },
  responses: {
    200: {
      description: "List of comments",
      content: {
        "application/json": {
          schema: successResponseSchema.extend({ data: z.object({ comments: z.array(commentSchema) })})
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
  method: "post",
  path: "/posts/{postId}/likes",
  summary: "Like Post",
  description: "Add a like to the specified post for the authenticated user.",
  tags: ["Posts"],
  security: [{ bearerAuth: [] }],
  request: { params: postIdParam },
  responses: {
    201: {
      description: "Post liked successfully",
      content: {
        "application/json": {
          schema: successResponseSchema
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
  tags: ["Posts"],
  security: [{ bearerAuth: [] }],
  request: { params: postIdParam },
  responses: {
    200: {
      description: "Post unliked successfully",
      content: {
        "application/json": {
          schema: successResponseSchema
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
  description:
    "Deletes a comment from the specified post.",
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



const generator = new OpenApiGeneratorV3(
  registry.definitions
)

export const openApiDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "SpillTea API",
    version: "1.0.0"
  }
})