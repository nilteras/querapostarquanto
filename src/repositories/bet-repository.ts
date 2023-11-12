import { CreateBet } from "protocols";
import { prisma } from "./../config";


async function createBetDB(data: CreateBet) {
    return prisma.bet.create({
        data,
    });
};

async function getBetsById(gameId: number) {
    return await prisma.bet.findMany({
        where: {
            gameId,
            status: 'PENDING',
        },
    });
};

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