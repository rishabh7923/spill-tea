import { errorResponseSchema } from "../schemas/error.js"
import { signUpRequestBodySchema, signUpResponseBodySchema } from "../schemas/signup.js"
import { loginRequestBodySchema, loginResponseBodySchema } from "../schemas/login.js"
import { verifyOtpRequestBodySchema } from "../schemas/otp.js"

export const registerAuthDocs = (registry) => {
  registry.registerPath({
    method: "post",
    path: "/auth/signup",
    summary: "User Registration",
    description: "Create a new user account using the provided registration details.",
    tags: ["Authorization"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: signUpRequestBodySchema
          }
        }
      }
    },
    responses: {
      200: {
        description: "Account created successfully",
        content: {
          "application/json": {
            schema: signUpResponseBodySchema
          }
        }
      },
      400: {
        description: "Missing or invalid request parameters",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      }
    }
  });

  registry.registerPath({
    method: "post",
    path: "/auth/login",
    summary: "User Login",
    description: "Authenticate a user using their credentials and return an access token or session details.",
    tags: ["Authorization"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: loginRequestBodySchema
          }
        }
      }
    },
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: loginResponseBodySchema
          }
        }
      },
      400: {
        description: "Missing or invalid request parameters",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
      401: {
        description: "Invalid credentials",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      }
    }
  })

  registry.registerPath({
    method: "post",
    path: "/auth/otp/send",
    summary: "Send OTP",
    description: "Send a one-time password (OTP) to the authenticated user's email.",
    tags: ["Authorization"],
    security: [{ bearerAuth: [] }],
    responses: {
      204: {
        description: "OTP sent successfully"
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
      429: {
        description: "OTP already sent",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
      500: {
        description: "Failed to send OTP",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      }
    }
  });

  registry.registerPath({
    method: "post",
    path: "/auth/otp/verify",
    summary: "Verify OTP",
    description: "Verify a previously sent one-time password (OTP) for the authenticated user.",
    tags: ["Authorization"],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: verifyOtpRequestBodySchema
          }
        }
      }
    },
    responses: {
      204: {
        description: "OTP verified successfully"
      },
      400: {
        description: "Missing or invalid request parameters",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      },
      401: {
        description: "Invalid or expired OTP",
        content: {
          "application/json": {
            schema: errorResponseSchema
          }
        }
      }
    }
  });
}
