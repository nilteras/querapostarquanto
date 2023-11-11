import { CreateBet } from "protocols";
import { betRepository } from "./../repositories/bet-repository";


async function postBet({homeTeamScore, awayTeamScore,amountBet, gameId, participantId }: CreateBet){
    return await betRepository.createBetDB({homeTeamScore, awayTeamScore,amountBet, gameId, participantId});
}


export const betService = {
   postBet
}