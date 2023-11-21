import app, { init } from "app";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import { cleanDb } from "../helpers";
import { disconnectDB, prisma } from "./../../src/config/database";
import { createParticipant, getParticipantById } from "../factories/participant-factory";
import { createFinishedGame, createGame } from "../factories/game-factory";

beforeAll(async () => {
    await init();
    await cleanDb();
});

afterAll(async () => {
    await disconnectDB();
});


const server = supertest(app);

describe('POST /bet', () => {

    it('should respond with status 400 when body is not given', async () => {
        const response = await server.post('/bets');

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });


    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post('/bets').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
    
        it('should respond with status 400 when the data is different of number', async () => {
            const body = {
                homeTeamScore: faker.lorem.word(),
                awayTeamScore: faker.lorem.word(),
                amountBet: faker.lorem.word(),
                gameId: faker.lorem.word(),
                participantId: faker.lorem.word(),
            }
            const response = await server.post('/bets').send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 401 when bet value is <= 0', async () => {
            const participant = await createParticipant()
            const game = await createGame()

            const body = {
                homeTeamScore: faker.number.int({min: 0, max: 10}),
                awayTeamScore: faker.number.int({min: 0, max: 10}),
                amountBet: faker.number.int({max: 0}),
                gameId: game.id,
                participantId: participant.id,
            }
            const response = await server.post('/bets').send(body);
    
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond status 401 when amountBet is less than balance", async() => {

            const participant = await createParticipant()
            const game = await createGame()
    
            const invalidBody = {
                gameId: game.id,
                participantId: participant.id,
                homeTeamScore: faker.number.int({min: 1, max: 10}),
                awayTeamScore: faker.number.int({min: 1, max: 10}),
                amountBet: participant.balance + 1,
            }
    
            const {status} = await server.post('/bets').send(invalidBody);
            expect(status).toBe(httpStatus.UNAUTHORIZED)
            
        });

        it("Should return status 401 when finishing an already finished game", async() => {

            const participant = await createParticipant()
            const game = await createFinishedGame()
    
            const invalidBody = {
                gameId: game.id,
                participantId: participant.id,
                homeTeamScore: faker.number.int({min: 1, max: 10}),
                awayTeamScore: faker.number.int({min: 1, max: 10}),
                amountBet: participant.balance - 1,
            }
    
            const {status, text} = await server.post('/bets').send(invalidBody);
            expect(status).toBe(httpStatus.UNAUTHORIZED)
            expect(text).toBe("{\"message\":\"Access not auhorized: This game is finished\"}");
            
        });

        it("should respond balance participant with value subtracted after bet made", async() => {

            const participant = await createParticipant()
            const game = await createGame()
            const balanceParticipant = participant.balance;
            const body = {
                gameId: game.id,
                participantId: participant.id,
                homeTeamScore: faker.number.int({min: 1, max: 10}),
                awayTeamScore: faker.number.int({min: 1, max: 10}),
                amountBet: participant.balance - 1,
            }    
            const {status} = await server.post('/bets').send(body);

            const participantAtt = await getParticipantById(participant.id);

            expect(status).toBe(httpStatus.CREATED)
            expect(true).toBe(participantAtt.balance < balanceParticipant);
            
        });

    });
});
