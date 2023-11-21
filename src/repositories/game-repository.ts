import { prisma } from "./../config";
import { CreateGame, Score } from "./../protocols";

//criar jogo
async function createGameDB(data: CreateGame) {
    return prisma.game.create({
        data,
    });
};
//buscar todos os jogos
async function getGamesDB() {
    return prisma.game.findMany();
};
//buscar jogo com apostas atreladas
async function getGameWithBetsDB(gameId: number) {
    const game = await getGamesByIdDB(gameId);
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
//buscar jogo pelo ID
async function getGamesByIdDB(gameId: number) {
    return await prisma.game.findUnique({
        where: {
            id: gameId
        },
    });
};
//finalizar jogo
async function finishGameDB(gameId: number, data: Score) {
    const updatedGame = await prisma.game.update({
        where: {
            id: gameId
        },
        data: {
            homeTeamScore: data.homeTeamScore,
            awayTeamScore: data.awayTeamScore,
            isFinished: true,
            updatedAt: new Date(),
        },

    });


    return updatedGame
}

export const gamesRepository = {
    createGameDB,
    getGamesDB,
    getGameWithBetsDB,
    finishGameDB,
    getGamesByIdDB
}