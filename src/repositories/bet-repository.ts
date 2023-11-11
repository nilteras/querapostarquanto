import { CreateBet } from "protocols";
import { prisma } from "./../config";


async function createBetDB(data: CreateBet){
    return prisma.bet.create({
        data,
    });
};

export const betRepository = {
    createBetDB
}