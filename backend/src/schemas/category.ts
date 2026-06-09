import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const categorySchema = z.object({
  id: z.number().int().positive().openapi({
    description: "Unique identifier of the category",
    example: 1
  }),

  name: z.string().openapi({
    description: "Name of the category",
    example: "Technology"
  })
}).openapi("Category", {
  description: "Represents a post category."
});
