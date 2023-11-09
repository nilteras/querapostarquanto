import { CreateParticipant } from "@/protocols";
import { participantRepository } from "@/repositories/participant-repository";

async function postParticipant({name,balance}: CreateParticipant){
    const result = await participantRepository.createParticipantDB({name, balance});
    return result;
};

export const participantService = {
    postParticipant
}