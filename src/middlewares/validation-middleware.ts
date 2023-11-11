import { invalidDataError } from "./../errors/invalid-data-error";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (!error) {
            next();
        } else {
            let errorMessage = '';
            error.details.forEach((d) => (errorMessage += d.message + ' '));
            throw invalidDataError(errorMessage);
        }
    };
}