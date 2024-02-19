const db = require("../db/connection")
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/index")

beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    return db.end();
})

describe("GET /api/healthcheck ", () => {
    test("STATUS -200 respons with a status of 200", () => {
        return request(app).get("/api/healthcheck")
        .expect(200);
    })
})