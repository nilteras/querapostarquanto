import { faker } from '@faker-js/faker';
import { prisma } from './../../src/config/database';

export async function createParticipant() {
    return await prisma.participant.create({
        data: {
            name: faker.person.firstName(),
            balance: faker.number.int({min: 1000, max: 5000})
        }
    })
}

export async function getParticipantById(id: number) {
    return await prisma.participant.findUnique({
        where: {
           id,
        }
    })
}