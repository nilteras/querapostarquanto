import { CreateGame, Score } from "protocols";
import { gamesRepository } from "./../repositories/game-repository";
import { notFoundError } from "./../errors/not-found-error";
import calculateEarnings from "./../utils/bet-utils";
import { UnauthorizedError } from "./../errors/unauthorization-error";

//criar jogo
async function postGame({ homeTeamName, awayTeamName }: CreateGame) {
    return await gamesRepository.createGameDB({ homeTeamName, awayTeamName });
}
//buscar todos os jogos
async function getGames() {
    return await gamesRepository.getGamesDB();
};

//buscar jogo com apostas
async function getGameWithBets(gameId: number) {
    return await gamesRepository.getGameWithBetsDB(gameId);
}
//finalizar
async function finishGame(gameId: number, { homeTeamScore, awayTeamScore }: Score) {
    //verificar se id de game é existente
    const game = await gamesRepository.getGamesByIdDB(gameId);
    if (!game) {
        throw notFoundError();
    }

    if (game.isFinished === true) {
        throw UnauthorizedError('This game is finished');
    }

    //retornar o jogo com todas as apostas atreladas
    const gameIsFinished = await gamesRepository.getGameWithBetsDB(gameId);
    //finaliza o jogo
    const result = await gamesRepository.finishGameDB(gameId, { homeTeamScore, awayTeamScore });
    //função para calcular ganhos e perdas
    await calculateEarnings(gameIsFinished, homeTeamScore, awayTeamScore);

    return result;

}

export const gamesService = {
    postGame,
    getGames,
    getGameWithBets,
    finishGame
}