const express = require("express");
const app = express()
const { getHealthCheck, getAllApis } = require("./controllers/app.controllers")
const { getAllTopics }  = require("./controllers/topics.controllers.js")


app.get("/api/healthcheck", getHealthCheck)

app.get("/api/topics", getAllTopics)

app.get("/api", getAllApis)


module.exports = app;