import { prisma } from './../../src/config/database';
import { faker } from '@faker-js/faker';

export async function createGame() {
    const game = await prisma.game.create({
        data: {
            homeTeamName: faker.location.city(),
	        awayTeamName: faker.location.city(),
        }
    })

    return game
}

export async function createFinishedGame() {
    return await prisma.game.create({
        data: {
            homeTeamName: faker.location.city(),
	        awayTeamName: faker.location.city(),
            isFinished: true
        }
    })
}