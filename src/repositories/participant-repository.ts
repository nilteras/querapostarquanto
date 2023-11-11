import { prisma } from "./../config";
import { CreateParticipant } from "./../protocols";


async function createParticipantDB(data: CreateParticipant){
    return await prisma.participant.create({
        data,
    });
};

async function getAllParticipantsDB(){
    return await prisma.participant.findMany();
}

export const participantRepository = {
    createParticipantDB,
    getAllParticipantsDB
}