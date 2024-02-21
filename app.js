const express = require("express");
const app = express();
const { handleCustomErrors, handlePSQLErrors} = require("./controllers/errors.controllers.js");
const { getHealthCheck, getAllApis } = require("./controllers/app.controllers");
const { getAllTopics }  = require("./controllers/topics.controllers.js");
const { getArticlesById, getAllArticles } = require("./controllers/articles.controllers.js");

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck)

app.get("/api/topics", getAllTopics)

app.get("/api", getAllApis)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles", getAllArticles)



app.use(handleCustomErrors)

app.use(handlePSQLErrors)

module.exports = app;