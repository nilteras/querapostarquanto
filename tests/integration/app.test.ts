import supertest from "supertest";
import app from "app";
import httpStatus from "http-status";

const server = supertest(app);

describe("Test Health", () => {
    it("should return status 200 and message 'OK'", async () => {
        const{text, status} = await server.get("/health");

        expect(status).toBe(httpStatus.OK);
        expect(text).toBe('OK');
    });
});