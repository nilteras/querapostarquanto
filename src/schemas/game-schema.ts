import joi from 'joi';
import { CreateGame, Score } from 'protocols';


export const createGameSchema = joi.object<CreateGame>({
    homeTeamName: joi.string().required(),
    awayTeamName: joi.string().required(),
});

export const finishGameSchema = joi.object<Score>({
    homeTeamScore: joi.number().min(0).required(),
    awayTeamScore: joi.number().min(0).required(),
});