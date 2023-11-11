import { prisma } from "./../config";
import { CreateGame } from "./../protocols";

async function createGameDB(data: CreateGame){
    return prisma.game.create({
        data,
    });
};

async function getGamesDB(){
    return prisma.game.findMany();
};

async function getGameWithBetsDB(gameId: number) {
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });
  
    if (!game) {
      throw new Error(`Game with id ${gameId} not found`);
    }
  
    const bets = await prisma.bet.findMany({
      where: { gameId: game.id },
    });
  
    return {
      id: game.id,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      isFinished: game.isFinished,
      bets: bets.map((bet) => ({
        id: bet.id,
        createdAt: bet.createdAt.toISOString(),
        updatedAt: bet.updatedAt.toISOString(),
        homeTeamScore: bet.homeTeamScore,
        awayTeamScore: bet.awayTeamScore,
        amountBet: bet.amountBet,
        gameId: bet.gameId,
        participantId: bet.participantId,
        status: bet.status,
        amountWon: bet.amountWon,
      })),
    };
  };

export const gamesRepository = {
    createGameDB,
    getGamesDB,
    getGameWithBetsDB
}