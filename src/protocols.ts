import { game, participant } from "@prisma/client";

export type CreateParticipant = Omit<participant, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateGame = Omit<game, 'id' | 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>;

export type ApplicationError = {
    name: string;
    message: string;
  };