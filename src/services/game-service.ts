import { CreateGame } from "protocols";
import { gamesRepository } from "./../repositories/game-repository";

async function postGame({homeTeamName, awayTeamName}: CreateGame){
    return await gamesRepository.createGameDB({homeTeamName, awayTeamName});
}

async function getGames(){
    return await gamesRepository.getGamesDB();
};

export const gamesService = {
    postGame,
    getGames
}