import { createParticipant } from "@/controllers/participant-controller";
import { Router } from "express";

const participantRouter = Router();

participantRouter
    .post('/', createParticipant)
    .get('/');

export default participantRouter;