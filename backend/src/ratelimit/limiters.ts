import { RateLimiterMemory } from "rate-limiter-flexible";

export const resourceLimiters = {
    read: new RateLimiterMemory({
        keyPrefix: "read",
        points: 100,
        duration: 60,
    }),
    write: new RateLimiterMemory({
        keyPrefix: "write",
        points: 100,
        duration: 60
    })
};