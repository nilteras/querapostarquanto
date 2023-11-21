import joi from 'joi';
import { CreateBet } from 'protocols';


export const createBetSchema = joi.object<CreateBet>({
    homeTeamScore: joi.number().min(0).required(),
    awayTeamScore: joi.number().min(0).required(),
    amountBet: joi.number().min(0).required(),
    gameId: joi.number().min(0).required(),
    participantId: joi.number().min(0).required(),
});