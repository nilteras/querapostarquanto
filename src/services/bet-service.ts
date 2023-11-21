import { CreateBet } from "protocols";
import { betRepository } from "./../repositories/bet-repository";
import { participantRepository } from "./../repositories/participant-repository";
import { notFoundError } from "./../errors/not-found-error";
import { gamesRepository } from "./../repositories/game-repository";
import { UnauthorizedError } from "./../errors/unauthorization-error";


async function postBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: CreateBet) {
    if(amountBet <= 0){
        throw UnauthorizedError('Bet value must be greater than 0'); //verifica se aposta é menor ou igual a zero
    }
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
        throw UnauthorizedError('This game is finished'); //erro para tentar finalizar jogo já finalizado
    }
    if (amountBet > participant.balance) {
        throw UnauthorizedError(`Insufficient funds => ${participant.balance}`); //verifica saldo insuficiente para aposta
    } else {
        newBalance = (participant.balance - amountBet);//ja desconta do saldo do participante
    }

    await participantRepository.updateParticipantDB(participantId, newBalance); //atualiza o saldo

    return await betRepository.createBetDB({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }); //cria aposta
}


export const betService = {
    postBet
}