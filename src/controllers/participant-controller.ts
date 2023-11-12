
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { participantService } from "./../services/participant-service";


export async function createParticipant(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, balance } = req.body;

        const result = await participantService.postParticipant({ name, balance });

        return res.status(httpStatus.CREATED).send(result);
    } catch (error) {
        next(error);
    }

};

export async function getParticipants(req: Request, res: Response) {
    const participants = await participantService.getParticipants();

    return res.status(httpStatus.OK).send(participants);
}