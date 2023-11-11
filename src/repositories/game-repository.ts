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

export const gamesRepository = {
    createGameDB,
    getGamesDB
}