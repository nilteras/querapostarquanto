import { CreateParticipant } from "protocols";
import { participantRepository } from "./../repositories/participant-repository";
import { UnauthorizedError } from "./../errors/unauthorization-error";

async function postParticipant({name,balance}: CreateParticipant){
    //verificar se o saldo é um número negativo, 0 e menor que 1000
    if(balance < 1000){
        throw UnauthorizedError('Minimum balance 1000');
    }    
    const result = await participantRepository.createParticipantDB({name, balance});
    return result;
};

async function getParticipants(){
    //buscar todos os participantes
    const participants = await participantRepository.getAllParticipantsDB();

    return participants;
}

export const participantService = {
    postParticipant,
    getParticipants
}