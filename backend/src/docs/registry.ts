import {
  OpenAPIRegistry,
  OpenApiGeneratorV3
} from "@asteasolutions/zod-to-openapi"
import { signUpRequestBodySchema, signUpResponseBodySchema } from "../schemas/signup.js"
import { errorResponseSchema } from "../schemas/error.js"
import { loginRequestBodySchema, loginResponseBodySchema } from "../schemas/login.js"
import { verifyOtpRequestBodySchema } from "../schemas/otp.js"
import {  postSchema } from "../schemas/post.js"
import { z } from "zod"
import { hashtagSchema } from "../schemas/hashtag.js"
import { registerAuthDocs } from "./auth.js"
import { registerHashtagDocs } from "./hashtags.js"
import { registerStatusDocs } from "./status.js"
import { registerPostDocs } from "./posts.js"
import { registerCommentDocs } from "./comments.js"
import { registerReactionDocs } from "./reactions.js"
import { registerAvatarDocs } from "./avatars.js"
import { registerUserDocs } from "./users.js"
import { userSchema } from "../schemas/user.js"
import { avatarSchema } from "../schemas/avatar.js"

const registry = new OpenAPIRegistry()

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

/**
 * Parameters
 */

export const postIdParam = z.object({
  postId: postSchema.shape.id
})

export const postCommentParam = z.object({
  postId: postSchema.shape.id,
  commentId: z.string()
})

export const usernameParam = z.object({
  username: userSchema.shape.username
})

export const avatarIdParam = z.object({
  avatarId: avatarSchema.shape.id
})

const statusResponseSchema = z.object({
  status: z.literal("OK")
})


/**
 * Paths
 */

registerPostDocs(registry);
registerCommentDocs(registry);
registerReactionDocs(registry);
registerAvatarDocs(registry);
registerUserDocs(registry);
registerAuthDocs(registry);
registerStatusDocs(registry);
registerHashtagDocs(registry);


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
