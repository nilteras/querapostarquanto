import app from "app";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from '@faker-js/faker';

const server = supertest(app);

// describe('POST /bet', () => {

//     it('should respond with status 400 when body is not given', async () => {
//         const response = await server.post('/bets');

//         expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });


//     it('should respond with status 400 when body is not valid', async () => {
//         const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

//         const response = await server.post('/bets').send(invalidBody);

//         expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     describe('when body is valid', () => {
    
//         it('should respond with status 400 when the data is different of number', async () => {
//             const body = {
//                 homeTeamScore: faker.lorem.word(),
//                 awayTeamScore: faker.lorem.word(),
//                 amountBet: faker.lorem.word(),
//                 gameId: faker.lorem.word(),
//                 participantId: faker.lorem.word(),
//             }
//             const response = await server.post('/bets').send(body);

//             expect(response.status).toBe(httpStatus.BAD_REQUEST);
//         });

//     });
// });
