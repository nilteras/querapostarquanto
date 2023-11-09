import { participantService } from "@/services/participant-service";
import { Request, Response } from "express";
import httpStatus from "http-status";


export async function createParticipant(req: Request, res: Response){
    const { name, balance } = req.body;

    const result = await participantService.postParticipant({ name, balance });

    return res.status(httpStatus.CREATED).send(result);

};