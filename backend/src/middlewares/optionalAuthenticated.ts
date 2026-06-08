import express from "express"
import jwt from "jsonwebtoken"

import type { TokenPayload } from "../types.js";

export const optionalAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

        if (decoded) req.user = decoded as TokenPayload;
    } catch {}

    next();
}