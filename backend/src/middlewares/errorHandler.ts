import { type Request, type Response, type NextFunction } from "express";
import { SERVER_ERROR } from "../common/errors.js";

export const errorHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    return res.status(500).json({
        success: false,
        error: SERVER_ERROR
    })
}