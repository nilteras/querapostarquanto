import { betRepository } from "./../repositories/bet-repository";
import { participantRepository } from "./../repositories/participant-repository";
import { Bet } from "@prisma/client";


export default async function calculateEarnings(game: any, homeTeamScore: number, awayTeamScore: number){
    const wins = []; //cria um array só para apostas vencedoras

    let totalBets = 0;
    let totalBetsWon = 0;
    
    game.bets.forEach(async (b: Bet) => {
        totalBets += b.amountBet
        //verificar se placar foi acertivo
        if(b.homeTeamScore === homeTeamScore && b.awayTeamScore === awayTeamScore) {
                wins.push(b)

                totalBetsWon += b.amountBet //soma das apostas vencedoras
            }else {
                await betRepository.updateBetDB(b.id, 'LOST', 0); //caso não for ja atualiza aposta para LOST
            };
    });

    wins.forEach(async (b) => {
        const valueWon = (b.amountBet/(totalBetsWon)) * (totalBets) * (0.7); //calculo

        await betRepository.updateBetDB(b.id, 'WON', valueWon); //atualiza aposta para vencedora WON

        const participant = await participantRepository.getParticipantByIdDB(b.participantId); //busca participante da aposta

        const newBalance = Math.floor(participant.balance + valueWon);

        await participantRepository.updateParticipantDB(participant.id, newBalance); //atualiza o saldo do participante
    })
};