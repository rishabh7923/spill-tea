import type { ZodType } from "zod";
import { INVALID_PARAMETERS } from "../errors.js";
import type { Response } from "express";

export function validateSchema<T>(
    schema: ZodType<T>,
    body: unknown,
    res: Response
): T | null {
    const { success, error, data } = schema.safeParse(body);
    
    if (!success) {
        res.status(400).json({
            success: false,
            error: {
                ...INVALID_PARAMETERS,
                message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
            },
        });

        return null;
    }

    return data;
}