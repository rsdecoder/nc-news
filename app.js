const express = require("express");
const app = express()
const { getHealthCheck, getAllTopics } = require("./controllers/app.controllers")



app.get("/api/healthcheck", getHealthCheck)

app.get("/api/topics", getAllTopics)


app.use((err, request, response, next) => {
    console.log('err in error handling middleware', err)

    response.status(500).send({msg: 'Internal server error'})
    next(err)
})

module.exports = app;