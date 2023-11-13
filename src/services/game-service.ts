import { CreateGame, Score } from "protocols";
import { gamesRepository } from "./../repositories/game-repository";
import { notFoundError } from "./../errors/not-found-error";

import calculateEarnings from "./../utils/bet-utils";
import { UnauthorizedError } from "./../errors/unauthorization-error";

async function postGame({ homeTeamName, awayTeamName }: CreateGame) {
    return await gamesRepository.createGameDB({ homeTeamName, awayTeamName });
}

async function getGames() {
    return await gamesRepository.getGamesDB();
};

async function getGameWithBets(gameId: number) {
    return await gamesRepository.getGameWithBetsDB(gameId);
}

async function finishGame(gameId: number, { homeTeamScore, awayTeamScore }: Score) {

    const game = await gamesRepository.getGamesByIdDB(gameId);
    if (!game) {
        throw notFoundError();
    }

    if (game.isFinished === true) {
        throw UnauthorizedError('This game is finished');
    }

    const gameIsFinished = await gamesRepository.getGameWithBetsDB(gameId);

    const result = await gamesRepository.finishGameDB(gameId, { homeTeamScore, awayTeamScore });

    await calculateEarnings(gameIsFinished, homeTeamScore, awayTeamScore);

    return result;

}

export const gamesService = {
    postGame,
    getGames,
    getGameWithBets,
    finishGame
}