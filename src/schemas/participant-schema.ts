import joi from 'joi';
import { CreateParticipant } from 'protocols';

export const createParticipantSchema = joi.object<CreateParticipant>({
    name: joi.string().required(),
    balance: joi.number().min(1000).required(),
})