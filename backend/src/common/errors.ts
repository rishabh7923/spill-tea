export type ApiErrorCode = {
  code: string;
  message: string;
};

export enum ErrorCode {
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  INVALID_INPUT = 'INVALID_INPUT',
  EMAIL_EXIST = 'EMAIL_EXIST',
  USERNAME_EXISTS = 'USERNAME_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  OTP_SEND_FAILED = 'OTP_SEND_FAILED',
  OTP_ALREADY_SENT = 'OTP_ALREADY_SENT',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR'
}

export const INVALID_PARAMETERS: ApiErrorCode = {
  code: ErrorCode.INVALID_PARAMETERS,
  message: 'Required parameters are missing',
};

export const INVALID_INPUT: ApiErrorCode = {
  code: ErrorCode.INVALID_INPUT,
  message: 'All fields are required',
};

export const EMAIL_EXIST: ApiErrorCode = {
  code: ErrorCode.EMAIL_EXIST,
  message: 'Email already exists',
};

export const USERNAME_EXISTS: ApiErrorCode = {
  code: ErrorCode.USERNAME_EXISTS,
  message: 'Username already exists',
};

export const INVALID_CREDENTIALS: ApiErrorCode = {
  code: ErrorCode.INVALID_CREDENTIALS,
  message: 'User with given credentials does not exist',
};

export const UNAUTHORIZED: ApiErrorCode = {
  code: ErrorCode.UNAUTHORIZED,
  message: 'Unauthorized access',
};

export const OTP_SEND_FAILED: ApiErrorCode = {
  code: ErrorCode.OTP_SEND_FAILED,
  message: 'Failed to send OTP email',
};

export const OTP_ALREADY_SENT: ApiErrorCode = {
  code: ErrorCode.OTP_ALREADY_SENT,
  message: 'An OTP has already been sent. Please wait until it expires.',
};

export const NOT_FOUND: ApiErrorCode = {
  code: ErrorCode.NOT_FOUND,
  message: 'Requested resource is not found'
}

export const SERVER_ERROR: ApiErrorCode = {
  code: ErrorCode.SERVER_ERROR,
  message: "Something went wrong at server side."
}