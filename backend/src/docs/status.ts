import { z } from "zod"

export const registerStatusDocs = (registry) => {
  const statusResponseSchema = z.object({ status: z.literal("OK") })

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
  })
}
