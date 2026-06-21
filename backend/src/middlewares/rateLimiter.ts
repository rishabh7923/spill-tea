import type { Request, Response, NextFunction, RequestHandler } from "express";
import { resourceLimiters } from "../ratelimit/limiters.js";
import { ApiError } from "../common/utils/ApiError.js";
import { RATE_LIMITED } from "../common/errors.js";

type Resource = "read" | "write" | "search" | "upload";

export const rateLimiter = ({ resource, cost = 1 }: { resource: Resource, cost: number }): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const key = req.user?.id || req.ip;
            await resourceLimiters[resource].consume(key, cost);

            next();
        } catch {
            throw new ApiError(429, RATE_LIMITED);
        }
    }
}