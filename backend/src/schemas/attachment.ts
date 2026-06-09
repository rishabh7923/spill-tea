import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const attachmentSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    description: "Unique identifier of the attachment",
    example: 1
  }),

  url: z.url().openapi({
    description: "Public URL of the attachment",
    example: "https://cdn.example.com/uploads/image.jpg"
  }),

  type: z.string().openapi({
    description: "Type of the attachment",
    example: "image/jpeg"
  }),

  created_at: z.iso.datetime().openapi({
    description: "ISO 8601 timestamp indicating when the attachment was created",
    example: "2026-06-09T12:34:56.000Z"
  })
}).openapi("Attachment", {
  description: "Represents a file attached to a post, such as an image, video, or document."
});