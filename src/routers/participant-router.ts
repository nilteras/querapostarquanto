
import { validateSchema } from "./../middlewares/validation-middleware";
import { createParticipant, getParticipants } from "./../controllers/participant-controller";
import { Router } from "express";
import { createParticipantSchema } from "./../schemas/participant-schema";

const participantRouter = Router();

participantRouter
    .post('/', validateSchema(createParticipantSchema), createParticipant)
    .get('/', getParticipants);

export default participantRouter;