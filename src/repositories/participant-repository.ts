import { prisma } from "./../config";
import { CreateParticipant } from "./../protocols";


async function createParticipantDB(data: CreateParticipant){
    return await prisma.participant.create({
        data,
    });
};

async function getAllParticipantsDB(){
    return await prisma.participant.findMany();
};

async function getParticipantByIdDB(id: number){
    return await prisma.participant.findUnique({
        where: {
            id
        },
    });
};

async function updateParticipantDB(participantId: number, newBalance: number){
    return await prisma.participant.update({
        where: {
            id: participantId
        },
        data: {
            balance: newBalance,
            updatedAt: new Date(),
        },
    });
};

export const participantRepository = {
    createParticipantDB,
    getAllParticipantsDB,
    updateParticipantDB,
    getParticipantByIdDB
}