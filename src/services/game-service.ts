import { CreateGame, Score } from "protocols";
import { gamesRepository } from "./../repositories/game-repository";
import { notFoundError } from "./../errors/not-found-error";
import { unauthorizedErrorGame } from "./../errors/unauthorized-error-game";
import calculateEarnings from "./../utils/bet-utils";

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

    const gameIsFinished = await gamesRepository.getGameWithBetsDB(gameId);
   
    if (gameIsFinished.isFinished === true) throw unauthorizedErrorGame();

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