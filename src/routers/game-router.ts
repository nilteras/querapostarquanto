import { createGame, getGames } from "./../controllers/game-controller";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
    .post('/', createGame)
    .get('/', getGames)
    .post('/:id/finish')
    .get('/:id');

export default gamesRouter;