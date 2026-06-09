import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

export const hashtagSchema = z.object({
  id: z.number().int().positive().openapi({
    description: "Unique identifier of the hashtag",
    example: 1
  }),

  name: z.string().openapi({
    description: "Name of the hashtag without the leading '#' character",
    example: "typescript"
  })
}).openapi("Hashtag", {
  description: "Represents a hashtag associated with a post."
});