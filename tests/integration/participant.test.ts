import app, { init } from "app";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import { disconnectDB, prisma } from "./../../src/config/database";
import { cleanDb } from "../helpers";

beforeAll(async () => {
    await init();
    await cleanDb();
});

afterAll(async () => {
    await disconnectDB();
});

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


        it('should respond with status 400 when the name is different of string', async () => {
            const body = {
                name: faker.number.int(),
                balance: faker.number.int({ min: 1000 })
            }
            const response = await server.post('/participants').send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 400 when the balance is less than 1000', async () => {
            const body = {
                name: faker.person.firstName(),
                balance: faker.number.int({ max: 1000 })
            }
            const response = await server.post('/participants').send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 201 when the data is accept', async () => {
            const body = {
                name: faker.person.firstName(),
                balance: faker.number.int({min: 1000,max: 100000})
            }
            const response = await server.post('/participants').send(body);

            expect(response.status).toBe(httpStatus.CREATED);
        });

        it("should return all participants", async () => {
            await prisma.participant.create({
                data: {
                    name: faker.person.firstName(),
                    balance: faker.number.int({ min: 1000, max: 100000 })
                }
            });
            await prisma.participant.create({
                data: {
                    name: faker.person.firstName(),
                    balance: faker.number.int({ min: 1000, max: 100000 })
                }
            });
            const { body, status } = await server.get("/participants");

            expect(status).toBe(httpStatus.OK);
            expect(body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(Number),
                })
            ]))
        });
    });
});
