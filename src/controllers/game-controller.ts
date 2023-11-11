import { Request, Response } from "express";
import httpStatus from "http-status";
import { gamesService } from "./../services/game-service";

export async function createGame(req: Request, res: Response){
    const { homeTeamName, awayTeamName } = req.body;

    const result = await gamesService.postGame({ homeTeamName, awayTeamName });

    return res.status(httpStatus.CREATED).send(result);

};

export async function getGames(req: Request, res: Response) {
    const games = await gamesService.getGames();

    return res.status(httpStatus.OK).send(games);
};