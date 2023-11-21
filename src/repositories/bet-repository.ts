import { CreateBet } from "protocols";
import { prisma } from "./../config";

//cria aposta
async function createBetDB(data: CreateBet) {
    return prisma.bet.create({
        data,
    });
};
//buscar aposta por ID
async function getBetsById(gameId: number) {
    return await prisma.bet.findMany({
        where: {
            gameId,
            status: 'PENDING',
        },
    });
};
//atualizar aposta
async function updateBetDB(betId: number, result: string, amountWon: number) {
    return await prisma.bet.update({
        where: {
            id: betId,
        },
        data: {
            status: result,
            amountWon: amountWon,
            updatedAt: new Date(),
        },
    });


}

export const betRepository = {
    createBetDB,
    getBetsById,
    updateBetDB
}