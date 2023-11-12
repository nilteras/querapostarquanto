import { createGame, finishGame, getGameWithBets, getGames } from "./../controllers/game-controller";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
    .post('/', createGame)
    .get('/', getGames)
    .post('/:id/finish', finishGame)
    .get('/:id', getGameWithBets);

export default gamesRouter;