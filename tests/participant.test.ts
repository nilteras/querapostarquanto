import app from "app";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from '@faker-js/faker';

const server = supertest(app);

describe('POST /participant', () => {

    it('should respond with status 400 when body is not given', async () => {
        const response = await server.post('/participants');

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });


    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post('/participants').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
    
        // it('should respond with status 200 when the data is accept', async () => {
        //     const body = {
        //         name: faker.person.firstName(),
        //         balance: faker.number.int({min: 1000})
        //     }
        //     const response = await server.post('/participants').send(body);

        //     expect(response.status).toBe(httpStatus.CREATED);
        // });

        it('should respond with status 400 when the name is different of string', async () => {
            const body = {
                name: faker.number.int(),
                balance: faker.number.int({min: 1000})
            }
            const response = await server.post('/participants').send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 400 when the balance is less than 1000', async () => {
            const body = {
                name: faker.person.firstName(),
                balance: faker.number.int({max: 1000})
            }
            const response = await server.post('/participants').send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    });
});
