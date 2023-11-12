import { CreateBet } from "protocols";
import { betRepository } from "./../repositories/bet-repository";
import { participantRepository } from "./../repositories/participant-repository";
import { notFoundError } from "./../errors/not-found-error";
import { UnauthorizedError } from "./../errors/unauthorized-error-game";
import { gamesRepository } from "./../repositories/game-repository";


async function postBet({homeTeamScore, awayTeamScore,amountBet, gameId, participantId }: CreateBet){
    let newBalance = 0;
    const participant = await participantRepository.getParticipantByIdDB(participantId);
    if(!participant) {
        throw notFoundError();
    }

    const game = await gamesRepository.getGamesByIdDB(gameId);
    if(!game) {
        throw notFoundError();
    }

    if(game.isFinished === true) {
        throw UnauthorizedError('This game is finished');
    }

    if(amountBet > participant.balance) {
        throw UnauthorizedError('Insufficient funds');
    }else {
        newBalance = (participant.balance - amountBet);
    }

    const updateBalance = await participantRepository.updateParticipantDB(participantId, newBalance);

    return await betRepository.createBetDB({homeTeamScore, awayTeamScore,amountBet, gameId, participantId});
}


export const betService = {
   postBet
}