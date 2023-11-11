
import { createParticipant, getParticipants } from "./../controllers/participant-controller";
import { Router } from "express";

const participantRouter = Router();

participantRouter
    .post('/', createParticipant)
    .get('/', getParticipants);

export default participantRouter;