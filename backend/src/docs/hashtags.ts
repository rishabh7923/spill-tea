import { z } from "zod"
import { hashtagSchema } from "../schemas/hashtag.js"

export const registerHashtagDocs = (registry) => {
  const successResponseSchema = z.object({ success: z.literal(true) })

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
  })
}
