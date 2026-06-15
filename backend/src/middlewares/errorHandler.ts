import { type Request, type Response, type NextFunction } from "express";
import { SERVER_ERROR } from "../common/errors.js";
import { ApiError } from "../common/utils/ApiError.js";

export const errorHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                ...error.code,
                ...(error.message ? { message: error.message } : {})
            }
        });
    }

    console.error(error);

    return res.status(500).json({
        success: false,
        error: SERVER_ERROR
    })
}