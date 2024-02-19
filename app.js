const express = require("express");
const app = express()
const { getHealthCheck } = require("./controllers/app.controllers")

app.get("/api/healthcheck", getHealthCheck)



module.exports = app;