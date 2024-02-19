const selectAllTopics = require("../models/app.models")

function getHealthCheck (request, response) {

    response.status(200).send();
}

function getAllTopics (request, response, next) {

    selectAllTopics().then((topics) => {
        response.status(200).send({topics});

    })
    .catch((err) => {
        next(err)
    })

}


module.exports = { getHealthCheck, getAllTopics };