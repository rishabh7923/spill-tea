import express from "express"
import jwt from "jsonwebtoken"

import { UNAUTHORIZED } from "../../common/errors.js";
import type { TokenPayload } from "../../common/types.js";

export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, error: UNAUTHORIZED });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (!decoded) {
        return res.status(401).json({ success: false, error: UNAUTHORIZED });
    }

    req.user = decoded as TokenPayload;

    next();
}