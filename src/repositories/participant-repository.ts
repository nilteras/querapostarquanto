import { prisma } from "./../config";
import { CreateParticipant } from "./../protocols";

//criar participante
async function createParticipantDB(data: CreateParticipant){
    return await prisma.participant.create({
        data,
    });
};

//buscar todos os participantes
async function getAllParticipantsDB(){
    return await prisma.participant.findMany();
};

//buscar participante por ID
async function getParticipantByIdDB(id: number){
    return await prisma.participant.findUnique({
        where: {
            id
        },
    });
};

//Atualizar saldo do participante
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