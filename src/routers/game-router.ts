import { createGameSchema, finishGameSchema } from "./../schemas/game-schema";
import { createGame, finishGame, getGameWithBets, getGames } from "./../controllers/game-controller";
import { Router } from "express";
import { validateSchema } from "./../middlewares/validation-middleware";

const gamesRouter = Router();

gamesRouter
    .post('/',validateSchema(createGameSchema),createGame)
    .get('/', getGames)
    .post('/:id/finish',validateSchema(finishGameSchema) ,finishGame)
    .get('/:id', getGameWithBets);

export default gamesRouter;