const express = require("express");
const app = express();

app.use((err, request, response, next) => {
    console.log('err in error handling middleware', err)
    if(err) {
        response.status(500).send({msg: 'Internal server error'})
    }
    next(err)
})
