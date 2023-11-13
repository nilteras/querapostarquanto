import { ApplicationError } from "protocols";

export function UnauthorizedError(details: string): ApplicationError {
    return {
      name: "UnauthorizedError",
      message: `Access not auhorized: ${details}`
    }
  }