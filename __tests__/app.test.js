const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json")

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/healthcheck ", () => {
  test("STATUS -200 respons with a status of 200", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe("GET", () => {
  describe("GET /api/topics", () => {
    test("STATUS - 200 responds with a status of 200 and array of objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics).toHaveLength(3);
          response.body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
    test("STATUS - 400 respond with a message bad request when people request with an invalid endpoint", () => {
        return request(app)
        .get("/api/topicafjajfh")
        .expect(404);
    })
  });
  describe('/api', () => {
    test('STATUS - 200, should respond with all the list of endpoints available ', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
          console.log(body)
          const bodyLength = Object.keys(body).length
          expect(bodyLength).toBe(3)
          expect(body).toEqual(endpoints)
        });
    });
  });
});
