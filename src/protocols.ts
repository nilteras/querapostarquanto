import { Prisma, bet, game, participant } from "@prisma/client";

export type CreateParticipant = Omit<participant, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateGame = Omit<game, 'id' | 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>;

export type CreateBet = Omit<bet, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>;

export type Score = {
  homeTeamScore: number,
  awayTeamScore: number,
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type GameWithBets = Prisma.gameGetPayload<{
  include: { bet: true };
}> & { bets: bet[] };

export type bets = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
  status: string;
  amountWon: number;
};