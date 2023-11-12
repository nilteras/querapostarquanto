import { ApplicationError } from './../protocols';

export function unauthorizedErrorGame(): ApplicationError {
  return {
    name: 'UnauthorizedErrorGame',
    message: 'The game was previously closed',
  };
}

export function UnauthorizedError(details: string): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: `Access not auhorized: ${details}`
  }
}