import type { ZodType } from "zod";
import { INVALID_PARAMETERS } from "../errors.js";
import { ApiError } from "./ApiError.js";

export function validateSchema<T>(
    schema: ZodType<T>,
    body: unknown
): T | null {
    const { success, error, data } = schema.safeParse(body);    
    if (!success) throw new ApiError(400, INVALID_PARAMETERS, `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,)
    return data;
}