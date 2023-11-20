import { Prisma, Bet, Game, Participant } from "@prisma/client";

export type CreateParticipant = Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateGame = Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>;

export type CreateBet = Omit<Bet, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>;

export type Score = {
  homeTeamScore: number,
  awayTeamScore: number,
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type GameWithBets = Prisma.GameGetPayload<{
  include: { bet: true };
}> & { bets: Bet[] };

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