import { participant } from "@prisma/client";

export type CreateParticipant = Omit<participant, 'id' | 'createdAt' | 'updatedAt'>;

export type ApplicationError = {
    name: string;
    message: string;
  };