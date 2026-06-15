import type { ApiErrorCode } from "../errors.js";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: ApiErrorCode,
    message?: string
  ) {
    super(message);
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}