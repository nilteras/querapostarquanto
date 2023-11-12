import { betRepository } from "./../repositories/bet-repository";
import { participantRepository } from "./../repositories/participant-repository";

export default async function calculateEarnings(game: any, homeTeamScore: number, awayTeamScore: number){
    const wins = [];

    let totalBets = 0;
    let totalBetsWon = 0;
  
    game.bets.forEach(async (b) => {
        totalBets += b.amountBet

        if(b.homeTeamScore === homeTeamScore && b.awayTeamScore === awayTeamScore) {
                wins.push(b)

                totalBetsWon += b.amountBet
            }else {
                await betRepository.updateBetDB(b.id, 'LOST', 0);
            };
    });

    wins.forEach(async (b) => {
        const valueWon = (b.amountBet/(totalBetsWon)) * (totalBets) * (0.7);

        const updatedBet = await betRepository.updateBetDB(b.id, 'WON', valueWon);

        const participant = await participantRepository.getParticipantByIdDB(b.participantId);

        const newBalance = Math.floor(participant.balance + valueWon);

        const updateBalance = await participantRepository.updateParticipantDB(participant.id, newBalance);
    })
};