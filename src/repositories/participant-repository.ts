import { prisma } from "@/config";
import { CreateParticipant } from "@/protocols";

async function createParticipantDB(data: CreateParticipant){
    return prisma.participant.create({
        data,
    });
};

async function getAllParticipantsDB(){
    return prisma.participant.findMany();
}

export const participantRepository = {
    createParticipantDB,
    getAllParticipantsDB
}