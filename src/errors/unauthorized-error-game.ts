import { ApplicationError } from './../protocols';

export function unauthorizedErrorGame(): ApplicationError {
  return {
    name: 'UnauthorizedErrorGame',
    message: 'The game was previously closed',
  };
}

