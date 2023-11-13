import { CreateBet } from "protocols";
import { betRepository } from "./../repositories/bet-repository";
import { participantRepository } from "./../repositories/participant-repository";
import { notFoundError } from "./../errors/not-found-error";

import { gamesRepository } from "./../repositories/game-repository";
import { UnauthorizedError } from "./../errors/unauthorization-error";


async function postBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: CreateBet) {
    let newBalance = 0;
    const participant = await participantRepository.getParticipantByIdDB(participantId);
    if (!participant) {
        throw notFoundError();
    }

    const game = await gamesRepository.getGamesByIdDB(gameId);
    if (!game) {
        throw notFoundError();
    }

    if (game.isFinished === true) {
        throw UnauthorizedError('This game is finished');
    }

    if (amountBet > participant.balance) {
        throw UnauthorizedError(`Insufficient funds => ${participant.balance}`);
    } else {
        newBalance = (participant.balance - amountBet);
    }

    await participantRepository.updateParticipantDB(participantId, newBalance);

    return await betRepository.createBetDB({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
}


export const betService = {
    postBet
}