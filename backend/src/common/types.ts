export interface TokenPayload {
    id: number,
    email: string,
    username: string,
    verified: boolean
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}