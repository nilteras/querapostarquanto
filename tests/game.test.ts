import app from "app";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from '@faker-js/faker';

const server = supertest(app);

// describe('POST /games', () => {

//     it('should respond with status 400 when body is not given', async () => {
//         const response = await server.post('/games');

//         expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });


//     it('should respond with status 400 when body is not valid', async () => {
//         const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

//         const response = await server.post('/games').send(invalidBody);

//         expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     describe('when body is valid', () => {

//         it('should respond with status 400 when the name is different of string', async () => {
//             const body = {
//                 homeTeamName: faker.number.int(),
//                 balaawayTeamNamence: faker.number.int()
//             }
//             const response = await server.post('/games').send(body);

//             expect(response.status).toBe(httpStatus.BAD_REQUEST);
//         });

//     });
// });
