const express = require("express");
const app = express();
const { handleCustomErrors, handlePSQLErrors} = require("./controllers/errors.controllers.js");
const { getHealthCheck, getAllApis } = require("./controllers/app.controllers");
const { getAllTopics }  = require("./controllers/topics.controllers.js");
const { getArticlesById, getAllArticles, patchArticleById } = require("./controllers/articles.controllers.js");
const { getCommentsByArticleId , postComment, deleteCommentById} = require("./controllers/comments.controllers.js")
const { getAllUsers } = require("./controllers/users.controllers.js")
app.use(express.json());

app.get("/api/healthcheck", getHealthCheck)

app.get("/api/topics", getAllTopics)

app.get("/api", getAllApis)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticleById)

app.delete("/api/comments/:comment_id", deleteCommentById)

app.get("/api/users", getAllUsers)

app.use(handleCustomErrors)

app.use(handlePSQLErrors)


module.exports = app;