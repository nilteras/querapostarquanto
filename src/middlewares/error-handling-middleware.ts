import httpStatus from "http-status";
import { ApplicationError } from "protocols";
import { Request, Response, NextFunction } from 'express';

export function handleApplicationErrors(
    err:  ApplicationError | Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
 
  
    if (err.name === 'InvalidDataError') {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message,
      });
    }
  
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }

    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'InternalServerError',
      message: 'Internal Server Error',
    });
  }
  