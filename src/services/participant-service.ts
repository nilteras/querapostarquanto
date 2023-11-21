import { CreateParticipant } from "protocols";
import { participantRepository } from "./../repositories/participant-repository";
import { UnauthorizedError } from "./../errors/unauthorization-error";

async function postParticipant({name,balance}: CreateParticipant){
    if(balance < 1000){
        throw UnauthorizedError('Minimum balance 1000');
    }
    const result = await participantRepository.createParticipantDB({name, balance});
    return result;
};

async function getParticipants(){
    const participants = await participantRepository.getAllParticipantsDB();

    return participants;
}

export const participantService = {
    postParticipant,
    getParticipants
}