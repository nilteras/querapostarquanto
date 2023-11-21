import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { gamesService } from "./../services/game-service";
import { CreateGame, Score } from "protocols";

export async function createGame(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body as CreateGame;

    const result = await gamesService.postGame({ homeTeamName, awayTeamName });

    return res.status(httpStatus.CREATED).send(result);

};

export async function getGames(req: Request, res: Response) {
    const games = await gamesService.getGames();

    return res.status(httpStatus.OK).send(games);
};

export async function getGameWithBets(req: Request, res: Response) {
    const gamerId = req.params;
    const game = await gamesService.getGameWithBets(Number(gamerId.id))

    return res.status(httpStatus.OK).send(game);
};

export async function finishGame(req: Request, res: Response, next: NextFunction) {
    try {
        const gameId = req.params.id;
        const { homeTeamScore, awayTeamScore } = req.body as Score;

        const result = await gamesService.finishGame(Number(gameId), { homeTeamScore, awayTeamScore });


        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        next(error)
    }
}