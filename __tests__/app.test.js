const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");

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

//===============GET ============================

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
    test("STATUS - 404", () => {
      return request(app).get("/api/topicafjajfh").expect(404);
    });
  });
  describe("/api", () => {
    test("STATUS - 200, should respond with all the list of endpoints available ", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(endpoints);
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    test("STATUS - 200, should respond with array of article objects", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((response) => {
          const { article } = response.body
          expect(article).toHaveLength(1);
          expect(article[0]["article_id"]).toBe(2);
          expect(article[0]).toHaveProperty('title');
          expect(article[0]).toHaveProperty('author');
          expect(article[0]).toHaveProperty('body');
          expect(article[0]).toHaveProperty('topic');
          expect(article[0]).toHaveProperty('created_at');
          expect(article[0]).toHaveProperty('votes');
          expect(article[0]).toHaveProperty('article_img_url');
        });
    });
    test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("article does not exist");
        });
    });
    test("STATUS 400 should respond with a error message of Bad request when given a valid endpoint but invalid id", () => {
      return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad Request");
        });
    });
  });
  describe('/api/articles', () => {
    test('STATUS 200, should return an array of article objects', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          const {articles} = response.body;
          articles.map((article) => {
            expect(typeof article).toBe('object')
            expect(article).toHaveProperty('article_id');
            expect(article).toHaveProperty('title')
            expect(article).toHaveProperty('author');
            expect(article).toHaveProperty('topic');
            expect(article).toHaveProperty('created_at');
            expect(article).toHaveProperty('votes');
            expect(article).toHaveProperty('article_img_url');
            expect(article).toHaveProperty('comment_count');
            expect(article).not.toHaveProperty('body')
          })
          
        })
    });
  });
  describe("/api/invalidEndpoint", () => {
    test('STATUS - 404, should respond with a 404',() => {
      return request(app)
      .get("/api/invalidEndpoint")
      .expect(404)
    })
  })
  describe('/api/articles/:article_id/comments', () => {
    test('STATUS 200, should return an array of comments for given article_id', () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((response) => {
        console.log(response.body.comments)
        const { comments } = response.body
        comments.forEach((comment) => {
          expect(comment).toHaveProperty('comment_id')
          expect(comment).toHaveProperty('body')
          expect(comment).toHaveProperty('article_id')
          expect(comment).toHaveProperty('author')
          expect(comment).toHaveProperty('votes')
          expect(comment).toHaveProperty('created_at')
        })
      })
    });
    test("STATUS 200, should return an array of comments with the most recent comment first", () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments[0]['body']).toBe("This morning, I showered for nine minutes.")
      })
    });

    test("STATUS 404 and should respond with a message when given an valid parametric endpoint but does not exist", () => {
      return request(app)
      .get('/api/articles/999/comments')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('article does not exist')
      })
    })
    test("STATUS 400 and should respond with a message when given an in-valid parametric endpoint", () => {
      return request(app)
      .get('/api/articles/not-an-id/comments')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad Request')
      })
    })
  });
  
});


